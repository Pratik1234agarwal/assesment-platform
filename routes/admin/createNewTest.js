const Question = require('../../models/Questions');
const Admin = require('../../models/Admin');
const Test = require('../../models/Test');
const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/authAdmin');
const {
  serverErrorResponse,
  failErrorResponse,
} = require('../../helpers/responseHandles');

router.get('/', auth, async (req, res) => {
  try {
    const tests = await Test.find();
    if (!tests) {
      return res.json({
        status: 'success',
        data: {
          length: 0,
          test: [],
        },
      });
    }
    res.json({
      status: 'success',
      data: {
        length: tests.length,
        test: tests,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) {
      return res.status(400).json(failErrorResponse('No such Test exist'));
    }
    return res.json({
      status: 'success',
      data: {
        test,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

router.post(
  '/create',
  [
    auth,
    [
      check('testName', 'Please Enter a valid Test Name').not().isEmpty(),
      check('numberOfQuestions', 'Please Enter Number of Questions')
        .not()
        .isEmpty(),
      check('marksPerQuestion', 'Marks Per Questio is required')
        .not()
        .isEmpty(),
      check(
        'negativeMarksPerQuestion',
        'Negative Marks Per Question is required'
      )
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json(failErrorResponse('Please Specify all the fields'));
      }
      let test = await Test.findOne({ testName: req.body.testName });
      console.log(test);
      if (test) {
        return res
          .status(400)
          .json(failErrorResponse('A Test with the same name already exists'));
      }
      test = new Test({ ...req.body, createdBy: req.user.id });
      await test.save();
      res.json({
        status: 'success',
        data: {
          test,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(serverErrorResponse());
    }
  }
);

router.delete('/delete/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    let test = await Test.findById(id);
    await test.remove();
    res.json({
      status: 'success',
      message: 'Test removed successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

// TODO: Add check test for the body of the request
router.post('/addQuestion/:testId', auth, async (req, res) => {
  try {
    const { questionId, marks, negativeMarks } = req.body;
    const question = await Question.findById(questionId);
    const test = await Test.findById(req.params.testId);
    if (!test || !question) {
      return res
        .status(400)
        .json(
          failErrorResponse(
            'Either the test or the quesiton with the specified id does not exist'
          )
        );
    }
    if (test.questionBank.length >= test.numberOfQuestions) {
      return res
        .status(400)
        .json(
          failErrorResponse('The Number of question for the test has exceeded')
        );
    }
    const find = test.questionBank.find((q) => q.questionId === questionId);
    if (find) {
      return res
        .status(400)
        .json(failErrorResponse('The Question has already been added'));
    }
    test.questionBank.push({
      questionId,
      marks,
      negativeMarks,
    });
    await test.save();
    res.json({
      status: 'success',
      data: {
        test,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

module.exports = router;
