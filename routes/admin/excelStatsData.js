const router = require('express').Router();
const auth = require('../../middleware/authAdmin');

const {
  failErrorResponse,
  serverErrorResponse,
} = require('../../helpers/responseHandles');

const Paper = require('../../models/Paper');
const User = require('../../models/User');
const Event = require('../../models/Event');
const Subtopic = require('../../models/SubTopic');

const users = require('../../helpers/emailArray');

router.get('/testNotGiven/:testId', auth, async (req, res) => {
  try {
    let data = [];
    const id = req.params.testId;
    for (let i = 0; i < users.length; i++) {
      const user = await User.findOne({ email: users[i] });
      if (!user) {
        continue;
      }
      const paper = await Paper.findOne({ test: id, user: user._id });
      if (!paper) {
        data.push({
          name: user.name,
          email: user.email,
          phone: user.phone,
        });
      }
    }

    return res.json({
      status: 'success',
      data: {
        data,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(serverErrorResponse());
  }
});

module.exports = router;
