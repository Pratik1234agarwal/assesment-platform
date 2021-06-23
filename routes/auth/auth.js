const express = require("express");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const router = express.Router();
const config = require("config");
const passport = require("passport");
const auth = require("../../middleware/auth");
const GoogleStrategy = require("../../helpers/Stratergies/googleStartergy");
const FacebookStrategy = require("../../helpers/Stratergies/facebookStartergy");
const {
  serverErrorResponse,
  failErrorResponse,
} = require("../../helpers/responseHandles");
const resetPassword = require("./resetPassword");
const sendMailAfterRegistration = require("../../Nodemailer/mailTemplates/mailSendOnRegistration");

// Routes for reset password
router.use("/reset", resetPassword);

// Authentication Routes
router.get("/", auth, async (req, res) => {
  try {
    console.log(req.user);
    const user = await User.findById(req.user.id).select("-googleId");
    if (!user) {
      return res.status(400).json(failErrorResponse("No such user found"));
    }
    res.json({ status: "success", data: { user } });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

router.post(
  "/signup",
  [
    check("email", "Please Provide a valid email address"),
    check("name", "Please provide user name").not().isEmpty(),
    check("phone", "Please provide a valid Phone number").not().isEmpty(),
    check("category", "Please provide user category").not().isEmpty(),
    check("university", "Please provide Designation/University details")
      .not()
      .isEmpty(),
    check("branch", "Please provide user category").not().isEmpty(),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json(failErrorResponse(errors.errors[0].msg));
      }
      let user = await User.findOne({
        email: req.body.email,
      });
      if (user) {
        return res
          .status(400)
          .json(failErrorResponse("A user Already Exists with this email"));
      }
      user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        category: req.body.category,
        university: req.body.university,
        phone: req.body.phone,
        branch: req.body.branch,
        registeredAt: Date.now(),
      });
      user.registrationMailSent = true;

      await user.save();

      const payload = {
        user: {
          id: user._id,
        },
      };

      // Send Registration mail
      sendMailAfterRegistration(req.body.email, req.body.name);

      // Return JWT Token
      jwt.sign(
        payload,
        config.get("JSONTokenSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          return res.status(201).json({
            status: "success",
            data: {
              token,
            },
          });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json(serverErrorResponse());
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Please Provide a valid emial id").not().isEmpty(),
    check("password", "Please provide a valid password").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: "fail",
          data: {
            message: errors.errors[0].msg,
          },
        });
      }
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({
          status: "fail",
          data: {
            message: "No Such User Found, Check the email and password again",
          },
        });
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) throw err;
        if (!isMatch) {
          return res.status(401).json({
            status: "fail",
            data: { message: "Password Provided is incorrect" },
          });
        }
        // Return jwt token
        const payload = {
          user: {
            id: user._id,
          },
        };
        jwt.sign(
          payload,
          config.get("JSONTokenSecret"),
          { expiresIn: 36000 },
          (err, token) => {
            if (err) throw err;
            return res.json({
              status: "success",
              data: {
                token,
              },
            });
          }
        );
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  }
);

// Google Authentication routes
router.get(
  "/google/login",
  passport.authenticate("google", { scope: ["email", "profile"] }),
  (req, res) => {
    //console.log(req);
    console.log("1. Request sent");
    return res.send("Congrats");
  }
);

router.get(
  "/google/success",
  passport.authenticate("google", { scope: ["email", "profile"] }),
  async (req, res) => {
    try {
      let user = await User.findOne({ email: req.user.email });
      console.log("database", user);
      if (!user) {
        console.log("Creating the new user");
        user = new User({
          email: req.user.email,
          name: req.user.displayName,
          authenticationProvider: "google",
          googleId: req.user.id,
        });
        await user.save();
        const payload = {
          user: {
            id: user._id,
          },
        };
        // Return JWT Token
        jwt.sign(
          payload,
          config.get("JSONTokenSecret"),
          { expiresIn: 36000 },
          (err, token) => {
            if (err) {
              throw err;
            }
            return res.redirect(`/?token=${token}&status=success`);
          }
        );
      } else {
        if (user.googleId) {
          const payload = {
            user: {
              id: user._id,
            },
          };
          jwt.sign(
            payload,
            config.get("JSONTokenSecret"),
            { expiresIn: 36000 },
            (err, token) => {
              if (err) {
                throw err;
              }
              return res.redirect(`/?token=${token}&status=success`);
            }
          );
        } else {
          return res.redirect("/?status=fail&reason=email");
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(serverErrorResponse());
    }
  }
);

// Facebook Authentication routes
router.get(
  "/facebook/login",
  passport.authenticate("facebook", { scope: "email" }),
  (req, res) => {
    //console.log(req);
    console.log("1. Request sent");
    return res.send("Congrats");
  }
);

router.get(
  "/facebook/success",
  passport.authenticate("facebook", { scope: "email" }),
  async (req, res) => {
    console.log("user", req.user);
    try {
      const email = req.user.email || req.user.id;
      let user = await User.findOne({ email });
      console.log("database", user);
      if (!user) {
        console.log("Creating the new user");
        user = new User({
          email,
          name: req.user.displayName,
          authenticationProvider: "facebook",
          googleId: req.user.id,
        });
        await user.save();
        const payload = {
          user: {
            id: user._id,
          },
        };
        // Return JWT Token
        jwt.sign(
          payload,
          config.get("JSONTokenSecret"),
          { expiresIn: 36000 },
          (err, token) => {
            if (err) {
              throw err;
            }
            return res.redirect(`/?token=${token}&status=success`);
          }
        );
      } else {
        if (user.googleId) {
          const payload = {
            user: {
              id: user._id,
            },
          };
          jwt.sign(
            payload,
            config.get("JSONTokenSecret"),
            { expiresIn: 36000 },
            (err, token) => {
              if (err) {
                throw err;
              }
              return res.redirect(`/?token=${token}&status=success`);
            }
          );
        } else {
          return res.redirect("/?status=fail&reason=email");
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(serverErrorResponse());
    }
  }
);

module.exports = router;
