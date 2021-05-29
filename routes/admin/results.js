const router = require("express").Router();
const User = require("../../models/User");
const Questions = require("../../models/Questions");
const Admin = require("../../models/Admin");
const Paper = require("../../models/Paper");
const Result = require("../../models/Result");
const auth = require("../../middleware/auth");
const mailer = require("../../Nodemailer/mailer");
const configureMessage = require("../../Nodemailer/configureMessage");

const { serverErrorResponse } = require("../../helpers/responseHandles");

router.get("/dsat", auth, async (req, res) => {
  try {
    const results = await Result.find().populate("user", ["name", "email"]);
    res.json({
      status: "success",
      data: {
        results,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

router.get("/dsat/generateResult", auth, async (req, res) => {
  try {
    let results = [];
    const papers = await Paper.find();
    console.log(papers.length);
    // await papers.forEach(async (paper) => {
    //   let result = await Result.findOne({ user: paper.user });
    //   if (result) {
    //     results.push(result);
    //   } else {
    //     result = await calculate(paper);
    //     await result.save();
    //     results.push(result);
    //   }
    // });
    for (let i = 0; i < papers.length; i++) {
      const paper = papers[i];
      let result = await Result.findOne({ user: paper.user }).populate("user", [
        "name",
        "email",
        "phone",
      ]);
      if (result) {
        results.push(result);
      } else {
        result = await calculate(paper);
        await result.save();
        results.push(result);
      }
    }
    res.json({
      status: "success",
      data: {
        results,
        length: results.length,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

async function calculate(paper) {
  let attempted = 0,
    notAttempted = 0,
    correct = 0,
    incorrect = 0,
    marks = 0;
  let category = {};
  for (let i = 0; i < paper.questions.length; i++) {
    let question = paper.questions[i];
    let questionFromDatabase = await Questions.findById(question.questionId);
    if (!questionFromDatabase) continue;
    resultCategoryWise(category, question.category, "totalQuestion");
    if (question.status === "answered") {
      attempted++;
      resultCategoryWise(category, question.category, "questionAttempted");
      if (questionFromDatabase.answer === question.answer) {
        correct++;
        resultCategoryWise(category, question.category, "correct");
      } else {
        incorrect++;
      }
    } else if (question.status === "not answered") {
      notAttempted++;
    }
  }

  let categoryWise = Object.values(category);

  console.log(categoryWise);

  report = new Result({
    paperId: paper._id,
    user: paper.user,
    marks: correct * 1.0,
    totalMarks: paper.questions.length * 1.0,
    attempted,
    correct,
    incorrect,
    notAttempted,
    totalQuestion: paper.questions.length,
    categoryWise,
  });

  return report;
}

function resultCategoryWise(category, categoryName = "other", field) {
  if (category[categoryName]) {
    if (!category[categoryName][field]) {
      category[categoryName][field] = 1;
    } else {
      category[categoryName][field] += 1;
    }
  } else {
    category[categoryName] = {};
    category[categoryName].categoryName = categoryName;
    category[categoryName][field] = 1;
  }
}

// Mail the result of the student with result pdf attached
// TODO: Make it general for all test
router.get("/sendMail", auth, async (req, res) => {
  try {
    const results = await Result.find().populate("user", ["name", "email"]);
    handleEmailSent(results);
    return res.json({
      status: "success",
      message: "Mail have been sent to the students.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

async function handleEmailSent(results) {
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const data = {
      email: result.user.email,
      subject: "Result for the DSAT",
      text:
        result.marks >= 2
          ? "Congrats you have cleared DSAT"
          : "You could not clear DSAT, do try again",
    };
    // if (i % 2 == 0) {
    //   await new Promise(async (resolve) => setTimeout(resolve, 1000));
    // }
    await mailer(configureMessage(data));
  }
}

module.exports = router;
