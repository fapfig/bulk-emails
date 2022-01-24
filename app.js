// Copyright (c) 2022 Fabio P. Figueiredo
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const { promisify } = require("util");
const sleep = promisify(setTimeout);
var email = require("./email");

//---------------------------------------------------------------
// Parameters
//---------------------------------------------------------------
// Sleep time (in min) before send another set of emails (batch).
time = 5;
// Total of users in the mailing list.
listSize = 10244;
// How many emails will be sent per batch? Maximum is 100.
batchSize = 100;
// Restart sending emails from number.
restart = 0;

// for testing purposes
// time = 0.5;
// listSize = 2;
// batchSize = 2;

//---------------------------------------------------------------

const getDate = () => {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return date + " " + time;
};

const doTheJob = async () => {
  var start = 0;

  if (restart == 0) {
    var count = 0;
    var end = 0;
  } else {
    var count = restart;
    var end = restart;
  }

  let totalTime = ((listSize / batchSize) * time) / 60.0;
  console.log("=========================================");
  console.log("*** Started at " + getDate());
  console.log(
    "*** Terminate in approximately " +
      Number.parseFloat(totalTime).toPrecision(2) +
      "h"
  );
  console.log("=========================================");

  while (count < listSize) {
    start = end;
    end += batchSize;
    count += batchSize;

    // Check if the next bach is greater than the list size.
    if (count + batchSize > listSize) {
      end = listSize;
      count = listSize;
    }

    email.send(start, end);

    // Converts to milliseconds.
    await sleep(time * 60 * 1000);
  }
};

doTheJob();
