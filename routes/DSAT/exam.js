const router = require("express").Router();
const {
  failErrorResponse,
  serverErrorResponse,
} = require("../../helpers/responseHandles");
const Questions = require("../../models/Questions");
const Paper = require("../../models/Paper");
const auth = require("../../middleware/auth");
const config = require("config");
const { check, validationResult } = require("express-validator");

//TODO: Add checks for test finish

const fetchQuestionAndPopulate = async (category) => {
  let totalQuestions = [];
  for (let i = 0; i < category.length; i++) {
    console.log(category[i]);
    const questions = await Questions.aggregate([
      { $match: { category: category[i] } },
      { $sample: { size: 5 } },
    ]);
    console.log("questions", questions);
    totalQuestions.push(...questions);
  }
  return totalQuestions;
};

router.get("/questionPaper", auth, async (req, res) => {
  try {
    let paper = await Paper.findOne({ user: req.user.id });
    if (paper) {
      return res.json({
        status: "success",
        data: { paper },
      });
    }
    const questions = await fetchQuestionAndPopulate([
      "Integrated Reasoning",
      "Statistics and Probability",
      "Quantitative Aptitude",
      "Data Interpretation",
      "Business Understanding",
    ]);

    console.log(questions);
    paper = new Paper({
      questions: questions.map((que) => ({
        questionId: que._id,
        questionText: que.text,
        questionImage: que.questionImage,
        A: que.A,
        B: que.B,
        C: que.C,
        D: que.D,
        category: que.category,
      })),
      user: req.user.id,
    });
    await paper.save();
    res.json({
      status: "success",
      data: {
        paper,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

// TODO: Add checks for the body parameters
router.post("/answer", auth, async (req, res) => {
  try {
    const questionPaper = await Paper.findOne({ user: req.user.id });
    if (!questionPaper) {
      return res
        .status(401)
        .json(failErrorResponse("The user has not yet started a attempt"));
    }
    const testStartedAt = new Date(questionPaper.startedAt).getTime();
    const timeElapsed = Date.now() - testStartedAt;
    if (timeElapsed > config.get("DsatTimeinMinutes") * 60 * 1000) {
      return res
        .status(401)
        .json(failErrorResponse("Time Limit for the test has elapsed"));
    }

    await Paper.updateOne(
      { user: req.user.id },
      {
        $set: {
          "questions.$[updateQuestion].answer": req.body.answer,
          "questions.$[updateQuestion].status": "answered",
        },
      },
      {
        arrayFilters: [{ "updateQuestion.questionId": req.body.questionId }],
      }
    );

    res.json({ status: "success", message: "Answer marked" });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

// TODO: Add various checks like if the test time has been already over
router.get("/submit/test", auth, async (req, res) => {
  try {
    const questionPaper = await Paper.findOne({ user: req.user.id });
    if (!questionPaper) {
      return res
        .status(401)
        .json(failErrorResponse("The user has not started any attempt"));
    }
    questionPaper.finished = true;
    questionPaper.finishedAt = Date.now();
    await questionPaper.save();
    return res.json({
      status: "success",
      data: { message: "Test Successfully saved" },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

router.get("/test", auth, async (req, res) => {
  const questionPaper = await Paper.findOne({ user: req.user.id });
  res.json(questionPaper);
  const date = new Date(questionPaper.startedAt);
  console.log(date.getTime());
  const diff = Date.now() - date.getTime();
  console.log(diff);
  console.log(diff / 1000);
  const minutes = diff / 60000;
  console.log(minutes);
  console.log(date);
  //res.send("hefad");
});

module.exports = router;
