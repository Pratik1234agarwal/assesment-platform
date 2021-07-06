const User = require("./models/User");
const Paper = require("./models/Paper");
const Results = require("./models/Result");
const TimeSlot = require("./models/timeSlot");

require("./config/db")();
const xl = require("excel4node");
const { format } = require("morgan");
const wb = new xl.Workbook();
const ws = wb.addWorksheet("Slot Mailing");

function formatSlot(startTime, endTime) {
  let t1 = startTime.getHours();
  t1 =
    t1 > 12
      ? `${t1 - 12}:${startTime.getMinutes()} PM `
      : `${t1}:${startTime.getMinutes()} AM`;
  let t2 = endTime.getHours();
  t2 =
    t2 > 12
      ? `${t2 - 12}:${endTime.getMinutes()} PM `
      : `${t2}:${endTime.getMinutes()} AM`;
  return `${t1} - ${t2}`;
}

async function generate() {
  const headingColumnNames = [
    "Date",
    "Slot",
    "Timing",
    "Registered",
    "Appeared",
    "Passed",
    "Passing %",
  ];
  //Write Column Title in Excel file
  let headingColumnIndex = 1;
  headingColumnNames.forEach((heading) => {
    ws.cell(1, headingColumnIndex++).string(heading);
  });
  let data = [];
  try {
    const slots = await TimeSlot.find();
    for (let i = 0; i < slots.length / 2; i++) {
      const slot = slots[i];

      const users = await User.find({ timeSlot: slot._id });
      let attempted = 0;
      let passed = 0;
      for (let j = 0; j < users.length; j++) {
        const result = await Results.findOne({ user: users[j]._id }).select(
          "marks"
        );
        if (result) {
          attempted++;
          if (result.marks > 50) {
            passed++;
          }
        }
      }
      data.push({
        date: slot.startTime.toDateString(),
        slot: `Slot ${slot.slotNumber + 1}`,
        timing: formatSlot(slot.startTime, slot.endTime),
        registered: i == slots.length - 1 ? 56 : 52,
        appeared: `${attempted}`,
        passed: `${passed}`,
        passingper: `${(passed / attempted) * 100}`,
      });
    }

    // Writing data in Excel.
    let rowIndex = 2;
    data.forEach((record) => {
      let columnIndex = 1;
      Object.keys(record).forEach((columnName) => {
        ws.cell(rowIndex, columnIndex++).string(record[columnName]);
      });
      rowIndex++;
    });
    wb.write("SlotExcelData6thJuly.xlsx");

    console.log("Excel Generated");
  } catch (err) {
    console.log(err);
  }
}

setTimeout(generate, 1000);
