const Batch = require('../../models/Batch');
const Admin = require('../../models/Admin');
const EventModel = require('../../models/Event');
const { check, validationResult } = require('express-validator');
const router = require('express').Router();
const auth = require('../../middleware/authAdmin');
const {
  serverErrorResponse,
  failErrorResponse,
} = require('../../helpers/responseHandles');

router.post(
  '/batch',
  [
    [
      check(
        'maxStudent',
        'Please Specify Maximum number of students in the batch'
      )
        .not()
        .isEmpty(),
    ],
    auth,
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error('Please Specify all the fields');
      }

      const batch = new Batch({
        maxNumberOfStuden: req.body.maxStudent,
      });

      await batch.save();

      res.json({
        status: 'success',
        data: {
          batch,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get('/event/:bacthId', (req, res) => {});

router.post(
  '/event/:batchId',
  [
    [
      check('type', 'Please specify a type').not().isEmpty(),
      check('startTime', 'Please specify a Start Date').not().isEmpty(),
      check('endTime', 'Please specify a End Date').not().isEmpty(),
    ],
    auth,
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(failErrorResponse(errors.errors[0].msg));
    }
    try {
      if (type) {
        if (
          !(
            type === 'test' ||
            type === 'assignment' ||
            type === 'liveClass' ||
            type === 'readingMaterial'
          )
        ) {
          return res
            .status(400)
            .json(failErrorResponse('Please Specify the proper "Type" Field'));
        }
      }

      // Logic to add a Event
      const startDate = new Date(req.body.startTime);
      const endDate = new Date(req.body.endTime);

      const event = new Event({
        type,
        startTime: startDate,
        endTime: endDate,
      });

      await event.save();
      res.json({
        status: 'success',
        data: {
          event,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(serverErrorResponse());
    }
  }
);

module.exports = router;
