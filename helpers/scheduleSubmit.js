const Paper = require("../models/Paper");

function scheduleSubmit(id, time) {
  setTimeout(async () => {
    await Paper.updateOne({ id }, { finished: true, finishedAt: new Date() });
  }, time);
}

module.exports = scheduleSubmit;
