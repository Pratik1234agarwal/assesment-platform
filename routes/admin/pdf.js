const fs = require("fs");
const path = require("path");
const pdf = require("pdf-creator-node");

var html = fs.readFileSync(
  path.join(__dirname, "../../", "template", "reportcard.html"),
  "utf8"
);

var options = {
  format: "A3",
  orientation: "portrait",
  border: "10mm",
  header: {
    height: "45mm",
    contents: '<div style="text-align: center;">Author: Shyam Hajare</div>',
  },
  footer: {
    height: "28mm",
    contents: {
      first: "Cover page",
      2: "Second page", // Any page number is working. 1-based index
      default:
        '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
      last: "Last Page",
    },
  },
};

var document = {
  html: html,
  data: {
    user: {
      name: "Pratik",
      institution: "iit",
      phone: "5248759546",
    },
    paper: {
      correct: 5,
    },
  },
  path: "./output.pdf",
  type: "",
};

pdf
  .create(document, options)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });
