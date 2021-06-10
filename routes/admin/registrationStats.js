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

// Option to delete the user from the database
router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json(failErrorResponse("No such user found"));
    }
    await user.remove();
    return res.json({
      status: "success",
      message: "User Record Removed succesfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

module.exports = router;
