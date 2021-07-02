const router = require("express").Router();
const Admin = require("../../models/Admin");
const { check, validationResult } = require("express-validator");
const {
  serverErrorResponse,
  failErrorResponse,
} = require("../../helpers/responseHandles");
const jwt = require("jsonwebtoken");
const config = require("config");

router.use("/questions", require("./addQuestion"));
router.use("/timeslots", require("./timeSlots"));
router.use("/result", require("./results"));
router.use("/test", require("./createNewTest"));
router.use("/registrationStats", require("./registrationStats"));

router.post(
  "/login",
  [
    check("username", "Please Provide a username").not().isEmpty(),
    check("password", "Please Enter your password").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json(failErrorResponse("Please Specify all the field"));
      }
      let user = await Admin.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json(failErrorResponse("User Not found "));
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) throw err;
        if (!isMatch) {
          res
            .status(400)
            .json(failErrorResponse("Credentials Provided are not correct"));
        }
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
      res.status(500).json(serverErrorResponse());
    }
  }
);

// TODO: This is development route and needs to be removed before pusing the code to prodution
router.post("/admin/create/new", async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = new Admin({
      username,
      password,
    });
    await user.save();
    const payload = {
      user: {
        id: user._id,
      },
    };
    jwt.sign(payload, config.get("JSONTokenSecret"), (err, token) => {
      if (err) throw err;
      return res.json({
        status: "success",
        data: {
          token,
        },
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

module.exports = router;
