# Bulk Email Sender

This is a simple program to send bulk emails.

## Install

- Install the following packages:

  `npm install nodemailer` \
  `npm install read-excel-file` \
  `npm i -s csv-parser`

- Configure the file config.json:
  1. Add the host, user, password and port in "transport"
  2. Add the name of the mailing list file to "users"->"list". It should be an xlsx file containing one email per line.

## Usage

1. Set the config.json file. Basically, change the "subject" and "message" variables. The message variable should be a string containing the html (or plain text) of the message. DO NOT USE DOUBLE QUOTES IN THE TEXT. Replace all double quotes with single quotes in the text.
1. The message string should also be a single line string. Go to https://lingojam.com/TexttoOneLine to convert from a multiline to single line string.
1. To send the emails run: node app.js

## Cleaning the email database

1. Convert the database file "mailing_cleaned.xlsx" to csv file.
1. Run: node clean.js
1. The script will remove all emails with error code from the database and create a new database file called "mailing_cleaned.csv"
1. Convert the new database "mailing_cleaned.csv" to "mailing.xlsx"

## To send attachments

1. add the lines "email" in the config.json file
   "filename": "Stats_and_Highlights_2020_compressed.pdf",
   "path": "./resources/Stats_and_Highlights_2020_compressed.pdf",
1. Uncomment the "attachments" in the email.js file
