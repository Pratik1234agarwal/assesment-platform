const router = require('express').Router();
const config = require('config');
const auth = require('../../middleware/auth');
const {
  serverErrorResponse,
  failErrorResponse,
} = require('../../helpers/responseHandles');
const User = require('../../models/User');
const Event = require('../../models/Event');
const Question = require('../../models/Questions');
const Test = require('../../models/Test');
const Paper = require('../../models/Paper');
const { check, validationResult } = require('express-validator');

const scheduleEvent = require('../../agenda/agenda');

router.get('/', auth, async (req, res) => {
  try {
    let events = await Event.find({ eventType: 'test' }).populate('testId');
    console.log(events);
    let tests = await Test.find().select('-displayable -createdBy');
    events = events.filter(
      (event) =>
        event.testId.questionBank.length === event.testId.numberOfQuestions
    );

    return res.json({
      status: 'success',
      data: {
        events,
        length: events.length,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

router.get('/info/:testId', auth, async (req, res) => {
  try {
    const test = await Test.findById(req.params.testId);

    if (!test) {
      return res.status(400).json(failErrorResponse('Invalid Test Id'));
    }

    return res.json({
      status: 'success',
      data: {
        test,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// TODO: Make sure that the event has the time limit in it.

router.get('/:testId', auth, async (req, res) => {
  try {
    const test = await Test.findById(req.params.testId).populate({
      path: 'questionBank',
      select: '-answer',
    });
    if (!test) {
      return res.status(400).json(failErrorResponse('Invalid Test Id'));
    }

    // Check if already started an attempt
    let paper = await Paper.findOne({ user: req.user.id, test: test._id });
    if (!paper) {
      // Create a paper to mark attempt start
      paper = new Paper({
        test: req.params.testId,
        user: req.user.id,
      });

      await paper.save();

      // Schedule automatic Paper Submit
      scheduleEvent(test.durationOfTest, paper);
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

router.get('/submit/:paperId', auth, async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.paperId);
    if (!paper) {
      return res.status(400).json(failErrorResponse('Invalid Paper Id'));
    }
    if (!paper.finished)
      Paper.updateOne(
        { _id: paper._id },
        { finished: true, finishedAt: Date.now() }
      );

    return res.json({
      status: 'sucess',
      message: 'Test Submitted Succesfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

// Asnwer a question
// TODO: Check for time Limit in the paper
router.post(
  '/:paperId/:questionId',
  [auth, [check('answer').isLength({ min: 1, max: 1 })]],
  async (req, res) => {
    try {
      const paper = await Paper.findById(req.params.paperId).populate({
        path: 'test',
        populate: {
          path: 'questionBank',
        },
      });
      if (!paper) {
        return res.status(400).json(failErrorResponse('Invalid Paper Id'));
      }

      if (paper.finished) {
        return res
          .status(400)
          .json(failErrorResponse('You have already submitted the test'));
      }

      const questionBank = paper.test.questionBank;
      let flag = 0;
      for (let i = 0; i < questionBank.length; i++) {
        console.log(questionBank[i]._id);
        console.log(req.params.questionId);
        console.log(questionBank[i]._id.toString() === req.params.questionId);
        if (questionBank[i]._id.toString() === req.params.questionId) {
          flag = 1;
          break;
        }
      }
      if (flag === 0) {
        return res.status(400).json(failErrorResponse('Invalid Question Id'));
      }

      await Paper.updateOne(
        { _id: paper._id },
        {
          $push: {
            responses: {
              questionId: req.params.questionId,
              status: 'answered',
              answer: req.body.answer,
            },
          },
        }
      );

      return res.json({
        status: 'success',
        message: 'Questions successfully answered',
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(serverErrorResponse());
    }
  }
);

module.exports = router;
