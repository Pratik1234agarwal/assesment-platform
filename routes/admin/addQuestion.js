const router = require("express").Router();
const Admin = require("../../models/Admin");
const Question = require("../../models/Questions");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const {
  serverErrorResponse,
  failErrorResponse,
} = require("../../helpers/responseHandles");
const uploadFile = require("../../Aws/s3");
const multer = require("multer");

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

// Route to add the question, required admin user sign In
router.post(
  "/add",
  [
    auth,
    [
      check("questionText", "Please Provide a Question Text").not().isEmpty(),
      check("options", "Please Provide Option for the question")
        .not()
        .isEmpty(),
      check("answer", "Please Enter the answer for the question")
        .not()
        .isEmpty(),
      check("category", "Please provide the category of the question")
        .not()
        .isEmpty(),
      check("difficulty", "Please provide the diffivulty level of the question")
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      const user = await Admin.findById(req.user.id);
      if (!user) {
        console.log("Admin User not found");
        return res.status(401).json(failErrorResponse("UnAuthorised"));
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Some field missing");
        return res.status(400).json(failErrorResponse(errors.errors[0].msg));
      }
      let question = await Question.findOne({ text: req.body.questionText });
      if (question) {
        return res
          .status(400)
          .json(failErrorResponse("The question already exists"));
      }
      question = new Question({
        text: req.body.questionText,
        A: {
          ...req.body.options[0],
        },
        B: { ...req.body.options[1] },
        C: { ...req.body.options[2] },
        D: { ...req.body.options[3] },
        category: req.body.category,
        answer: req.body.answer,
        difficulty: req.body.difficulty,
      });
      if (req.body.questionImage) {
        question.questionImage = req.body.questionImage;
      }
      await question.save();
      return res.json({
        status: "success",
        data: {
          question,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(serverErrorResponse());
    }
  }
);

router.post("/image/add", [auth, upload.single("file")], async (req, res) => {
  try {
    console.log("file", req.file);
    if (!req.file) {
      res.status(404).json(failErrorResponse("No File Specified"));
    }

    // Uploading file to aws
    const url = await uploadFile(req.file);
    res.json({
      status: "success",
      data: {
        imageUrl: url,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

module.exports = router;
