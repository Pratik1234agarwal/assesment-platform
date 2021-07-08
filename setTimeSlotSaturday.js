const User = require('./models/User');
const TimeSlot = require('./models/timeSlot');
const Results = require('./models/Result');
require('./config/db')();
const xl = require('excel4node');
const wb = new xl.Workbook();
const ws = wb.addWorksheet('Slot Mailing');
const { timeSlotMailGeneral } = require('./Nodemailer/mailer');

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

async function createNewSlot() {
  const slot = new TimeSlot({
    startTime: new Date(2021, 6, 10, 10, 00),
    endTime: new Date(2021, 6, 10, 20, 00),
    slotNumber: 101,
  });
  await slot.save();
  return slot;
}

let data = [];

async function getStudentList() {
  const slots = await TimeSlot.find({ slotNumber: { $lt: 48 } });
  console.log(slots.length);
  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];

    const users = await User.find({ timeSlot: slot._id });
    console.log(users.length);

    for (let j = 0; j < users.length; j++) {
      const result = await Results.findOne({ user: users[j]._id }).select(
        'marks'
      );
      if (!result) {
        data.push({
          name: users[j].name,
          email: users[j].email,
        });
      }
    }
  }
}

async function sendMail(slot) {
  console.log('Starting sending mail to, ', data.length);
  for (let i = 0; i < data.length; i++) {
    const user = data[i];
    try {
      timeSlotMailGeneral(
        user.name,
        user.email,
        '10th of July',
        formatSlot(slot.startTime, slot.endTime),
        '10th of July'
      );
    } catch (err) {
      console.log(`[Err in sending mail to email : ${user.email}]`);
    }
  }
  console.log('All mails have been sent');
}

async function generateExcel() {
  const headingColumnNames = ['Name', 'Email'];
  //Write Column Title in Excel file
  let headingColumnIndex = 1;
  headingColumnNames.forEach((heading) => {
    ws.cell(1, headingColumnIndex++).string(heading);
  });

  // Writing data in Excel.
  let rowIndex = 2;
  data.forEach((record) => {
    let columnIndex = 1;
    Object.keys(record).forEach((columnName) => {
      ws.cell(rowIndex, columnIndex++).string(record[columnName]);
    });
    rowIndex++;
  });
  wb.write('SlotForSaturday.xlsx');
}

async function doeveything() {
  try {
    slot = createNewSlot();
    getStudentList();
    sendMail(slot);
    generateExcel();
  } catch (err) {
    console.log(err);
  }
}

setTimeout(doeveything, 1000);
