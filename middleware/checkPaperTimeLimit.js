const config = require("config");
const Paper = require("../models/Paper");

module.exports = async function (req, res, next) {
  try {
    const questionPaper = await Paper.findOne({ user: req.user.id });
  } catch (err) {
    next(err);
  }
};
