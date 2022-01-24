# Bulk Email Sender

Developed by Fabio P. Figueiredo

## Install

- Install the following packages:

  `npm install nodemailer` \
  `npm install read-excel-file` \
  `npm i -s csv-parser`

## Usage

1. Set the config.json file. Basically, change the "subject" and "message" variable. The message variable should be a string containing the html of the message.
1. The message string should also be a single line string. Go to https://lingojam.com/TexttoOneLine to convert from a multiline to single line string.
1. To send the emails run: node app.js

## Cleaning the email database

1. Convert the database file "mailing_SC_cleaned.xlsx" to csv file.
1. Run: node clean.js
1. The script will remove all emails with error code from the database and create a new database file called "mailing_SC_cleaned.csv"
1. Convert the new database "mailing_SC_cleaned.csv" to "mailing_SC.xlsx"

## To send attachements

1. add the lines "email" in the config.json file
   "filename": "ISISE_Stats_and_Highlights_2020_compressed.pdf",
   "path": "./resources/ISISE_Stats_and_Highlights_2020_compressed.pdf",
1. Uncomment the "attachments" in the email.js file
