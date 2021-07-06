const Questions = require("./models/Questions");
require("./config/db")();
const xl = require("excel4node");
const { format } = require("morgan");
const wb = new xl.Workbook();
const ws = wb.addWorksheet("Slot Mailing");

async function generate() {
  try {
    const headingColumnNames = [
      "Question Text",
      "questionImage",
      "Answer",
      "A text",
      "A image",
      "B text",
      "B image",
      "C text",
      "C image",
      "D text",
      "D image",
      "category",
    ];
    //Write Column Title in Excel file
    let headingColumnIndex = 1;
    headingColumnNames.forEach((heading) => {
      ws.cell(1, headingColumnIndex++).string(heading);
    });

    const questions = await Questions.find();
    const data = questions.map((q) => ({
      question: q.text,
      questionImage: q.questionImage,
      answer: q.answer,
      a: q.A.text,
      aimage: q.A.imageUrl ? q.A.imageUrl : "",
      b: q.B.text,
      bimage: q.B.imageUrl ? q.B.imageUrl : "",
      c: q.C.text,
      cimage: q.C.imageUrl ? q.C.imageUrl : "",
      d: q.D.text,
      bimage: q.D.imageUrl ? q.D.imageUrl : "",
      category: q.category,
    }));

    // Writing data in Excel.
    let rowIndex = 2;
    data.forEach((record) => {
      let columnIndex = 1;
      Object.keys(record).forEach((columnName) => {
        ws.cell(rowIndex, columnIndex++).string(record[columnName]);
      });
      rowIndex++;
    });
    wb.write("Questions.xlsx");

    console.log("Excel Generated");
  } catch (err) {
    console.log(err);
  }
}

setTimeout(generate, 1000);
