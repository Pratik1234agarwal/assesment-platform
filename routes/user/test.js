const router = require('express').Router();
const config = require('config');
const auth = require('../../middleware/auth');
const {
  serverErrorResponse,
  failErrorResponse,
} = require('../../helpers/responseHandles');
const User = require('../../models/User');
const Question = require('../../models/Questions');
const Test = require('../../models/Test');
const Paper = require('../../models/Paper');
const { check, validationResult } = require('express-validator');

router.get('/', auth, async (req, res) => {
  try {
    let tests = await Test.find().select('-displayable -createdBy');
    tests = tests.filter(
      (test) => test.questionBank.length === test.numberOfQuestions
    );

    return res.json({
      status: 'success',
      data: {
        tests,
        length: tests.length,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

// TODO: Make sure that the event has the time limit in it.

router.get('/:testId', auth, async (req, res) => {
  try {
    const test = await Test.findById(req.params.testId).populate(
      'questionBank'
    );
    if (!test) {
      return res.status(400).json(failErrorResponse('Invalid Test Id'));
    }

    // Check if already started an attempt
    let paper = await Paper.findOne({ user: req.user.id });
    if (!paper) {
      // Create a paper to mark attempt start
      paper = new Paper({
        test: req.params.testId,
        user: req.user.id,
      });

      await paper.save();
    }

    paper.test = test;

    return res.json({
      status: 'success',
      data: {
        paper,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

module.exports = router;
