const router = require('express').Router();
const User = require('../../models/User');
const Attendance = require('../../models/Attendance');
const auth = require('../../middleware/auth');
const {
  failErrorResponse,
  serverErrorResponse,
} = require('../../helpers/responseHandles');

const meetLinks = [
  'https://meet.google.com/x1d',
  'https://google.com',
  'https://google.com',
  'https://google.com',
  'https://google.com',
];

router.get('/', auth, async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id).select('batch');
    if (!user) {
      return res.send('No User Found');
    }
    let attendance = await Attendance.findOne({ user: id });
    if (!attendance) {
      attendance = new Attendance({ user: id });
      await attendance.save();
    } else {
      let date = new Date(attendance.date);
      let currentDate = new Date();
      if (
        currentDate.getDate() === date.getDate() &&
        date.getMonth() === currentDate.getMonth()
      ) {
      } else {
        attendance = new Attendance({ user: id });
      }
    }

    return res.json({
      status: 'success',
      data: {
        meetLink: meetLinks[user.batch],
        message: 'Attendance Marked',
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(serverErrorResponse());
  }
});

module.exports = router;
