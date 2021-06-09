const router = require("express").Router();
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const {
  serverErrorResponse,
  failErrorResponse,
} = require("../../helpers/responseHandles");

router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find().select("-password -authenticationProvider");
    res.json({
      status: "success",
      data: {
        users: users,
        numberOfUserRegistered: users.length,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

module.exports = router;
