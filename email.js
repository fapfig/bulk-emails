// Copyright (c) 2022 Fabio P. Figueiredo
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const readXlsxFile = require("read-excel-file/node");
const nodemailer = require("nodemailer");
const fs = require("fs");
const { Console } = require("console");

var config = require("./config.json");

var transport = nodemailer.createTransport({
  host: config.transport.host,
  port: config.transport.port,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: config.transport.user,
    pass: config.transport.pass,
  },
});

const getLogFileName = () => {
  subject = config.mail.subject;
  str = subject.replace(/\s/g, "_");
  str = str.replace(/[/]/g, "_");

  var d = new Date();
  date =
    d.getUTCFullYear() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCDate();
  return `${str}_${date}.log`;
};

const printDate = () => {
  let date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);
  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  // current year
  let year = date_ob.getFullYear();
  // current hours
  let hours = date_ob.getHours();
  // current minutes
  let minutes = date_ob.getMinutes();
  // current seconds
  let seconds = date_ob.getSeconds();

  // prints date & time in YYYY-MM-DD HH:MM:SS format
  console.log(
    year +
      "-" +
      month +
      "-" +
      date +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds
  );
  logger.log(
    year +
      "-" +
      month +
      "-" +
      date +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds
  );
};

// Output console to file.
const output = fs.createWriteStream(`./logs/stdout_${getLogFileName()}`);
const errorOutput = fs.createWriteStream(`./logs/stderr_${getLogFileName()}`);
// custom simple logger
const logger = new Console(output, errorOutput);

console.log(`Email`);
logger.log(`Subject: ${config.mail.subject}`);
logger.log(`Message: ${config.mail.message}`);
logger.log("----------------------------------------------------\n");

module.exports = {
  send: function (start, end) {
    printDate();
    console.log(`\nSending emails from ${start} to ${end}`);
    console.log("----------------------------------------------------");
    logger.log(`\nSending emails from ${start} to ${end}`);
    logger.log("----------------------------------------------------\n");

    // Reading excel list and sending emails.
    //---------------------------------
    r = readXlsxFile(config.users.list).then((rows) => {
      for (let i = start; i < end; i++) {
        let email = rows[i][0];

        const mailOptions = {
          from: config.mail.email,
          to: email,
          bcc: config.mail.bcc,
          subject: config.mail.subject,
          //text: message,
          html: config.mail.message,
          // attachments: [
          //   {
          //     filename: config.mail.filename,
          //     path: config.mail.path,
          //     //cid: `uniq-${id}2017131340_copyright-form-book-2017.docx`,
          //   },
          // ],
        };

        console.log(email);
        logger.log(email);

        // Sending email...
        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(`***** ERROR sending message to ${email}`);
            logger.log(`***** ERROR sending message to ${email}`);
            return console.log(error);
          }
          console.log(`Message sent to ${email}: %s`, info.messageId);
          logger.log(`Message sent to ${email}: %s`, info.messageId);
        });
      }
    });
  },
};
