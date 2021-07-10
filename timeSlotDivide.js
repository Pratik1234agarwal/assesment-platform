const User = require('./models/User');
const TimeSlot = require('./models/timeSlot');
require('./config/db')();
const xl = require('excel4node');
const { format } = require('morgan');
const wb = new xl.Workbook();
const ws = wb.addWorksheet('Slot Mailing');

const DATE = [20, 21];
const slotFrom = 10;
const slotTo = 20;

async function slotDivider() {
  let count = 88;
  for (let k = 0; k < DATE.length; k++) {
    let date = DATE[k];
    for (let i = slotFrom; i < slotTo; i++) {
      try {
        console.log(`Adding slots ${i}`);
        const slot1 = new TimeSlot({
          startTime: new Date(2021, 6, date, i, 0),
          endTime: new Date(2021, 6, date, i, 30),
          slotNumber: count,
        });
        count++;
        await slot1.save();
        const slot2 = new TimeSlot({
          startTime: new Date(2021, 6, date, i, 30),
          endTime: new Date(2021, 6, date, i + 1, 0),
          slotNumber: count,
        });
        count++;
        await slot2.save();
      } catch (err) {
        console.log(err);
        console.log('Error creating slots');
      }
    }
  }
}

const NUMBER_OF_STUDENTS_TO_BE_ALLOTED = 2500;
const startFrom = 5000;
let NUMBER_PER_SLOT = 62;

async function divideStudent() {
  try {
    let users = await User.find();
    console.log(users.length);
    users = users.slice(
      startFrom,
      NUMBER_OF_STUDENTS_TO_BE_ALLOTED + startFrom
    );
    console.log(users.length);
    const slots = await TimeSlot.find({ slotNumber: { $gte: 88, $lte: 500 } });
    console.log(slots.length);
    let count = 0;
    for (let i = 0; i < slots.length; i++) {
      const slot = slots[i];
      if (i == 20) {
        NUMBER_PER_SLOT = 63;
      }
      for (let j = 0; j < NUMBER_PER_SLOT; j++) {
        // users[count].timeSlot = slot._id;
        // users[count].slotAlloted = true;
        await User.updateOne(
          { _id: users[count]._id },
          { slotAlloted: true, timeSlot: slot._id }
        );
        //await users[count].save();
        count++;
      }
      //await slot.save();
    }
    console.log('Slot Divison Done');
  } catch (err) {
    console.log(err);
  }
}

function formatTime(slot) {
  return `${slot.startTime.getHours()}:${slot.startTime.getMinutes()} - ${slot.endTime.getHours()}:${slot.endTime.getMinutes()}`;
}

async function generateExcel() {
  try {
    const users = await User.find({ slotAlloted: true });

    // Writing the heading column
    const headingColumnNames = [
      'Name',
      'Mobile',
      'Email',
      'Slot Date',
      'Slot Time',
    ];
    //Write Column Title in Excel file
    let headingColumnIndex = 1;
    headingColumnNames.forEach((heading) => {
      ws.cell(1, headingColumnIndex++).string(heading);
    });

    // Writing the main data
    const data = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const slot = await TimeSlot.findById(user.timeSlot);
      //console.log(slot);
      if (!slot) continue;
      data.push({
        name: user.name,
        mobile: user.phone,
        email: user.email,
        slotDate: `${slot.startTime.getDate()}th July, 2021`,
        slotTime: formatTime(slot),
      });
    }

    // console.log(data);

    // Writing data in Excel.
    let rowIndex = 2;
    data.forEach((record) => {
      let columnIndex = 1;
      Object.keys(record).forEach((columnName) => {
        ws.cell(rowIndex, columnIndex++).string(record[columnName]);
      });
      rowIndex++;
    });
    wb.write('SlotDivision20th21st.xlsx');

    console.log('Excel Generated');
  } catch (err) {
    console.log(err);
  }
}

async function checkSlot() {
  try {
    const timeSlot = await TimeSlot.findOne();
    console.log(timeSlot);
    const startTime = timeSlot.startTime;
    const endTime = timeSlot.endTime;
    console.log(startTime.getHours());
    console.log(startTime.getMinutes());
    console.log(endTime.getHours());
    console.log(endTime.getMinutes());
    console.log(startTime.getDate());
    console.log(startTime.getMonth());
  } catch (err) {
    console.log(err);
  }
}

async function reset() {
  await User.updateMany({ slotAlloted: true }, { slotAlloted: false });
  console.log('Reset done');
}

async function everything() {
  await slotDivider();
  await divideStudent();
  await generateExcel();
}

setTimeout(everything, 1000);
