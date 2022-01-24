// Copyright (c) 2022 Fabio P. Figueiredo
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// Clean the mailing list
const { Console } = require("console");
const fs = require("fs");

// Stores the mailing list to array.
let mailing = fs
  .readFileSync("./resources/mailing_SC.csv")
  .toString()
  .split("\n");
let mailingSize = mailing.length;

// Stores stdout lines to array.
let errors = [];
let log = fs.readFileSync("./stdout.log").toString().split("\n");
// Finds emails that were not sent and stores them to errors.
log.forEach((e) => {
  if (e.search("ERROR") > 0) {
    email = e.replace("***** ERROR sending message to ", "");
    errors.push(email.trim());
  }
});

errors.forEach((element) => {
  // Adding an \r for comparison because the mailing array was stored
  // with this character.
  var index = mailing.indexOf(element + "\r");
  if (index > -1) {
    mailing.splice(index, 1);
  }
});

// Save new csv file.
fs.writeFile(
  "./resources/mailing_SC_cleaned.csv",
  mailing.join("\n"),
  { flag: "a+" },
  (err) => {}
);

console.log(`Mailing list size: ${mailingSize}`);
console.log(`Number of removed emails: ${errors.length}`);
console.log(`Final mailing list size: ${mailing.length}`);
