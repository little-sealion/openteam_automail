require('dotenv').config();
const nodemailer = require('nodemailer');
// i use sendgrid SMTP server here
const poolConfig = `${process.env.SMTP_SERVER}?pool=true`;

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(poolConfig);
const CronJob = require('cron').CronJob;

// new Date(year, month, day, hours, minutes, seconds, milliseconds)
//Note: JavaScript counts months from 0 to 11:January = 0.December = 11.

let scheduledDate = new Date(2021, 11, 01, 16, 25);
let timezone = 'Australia/Brisbane';

let job = new CronJob(scheduledDate, sendMail, null, false, timezone);
// Use this if the 4th param is default value(false)
job.start();

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(from) {
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.FROM, // sender address
    to: 'tess.zheng@outlook.com', // list of receivers
    subject: 'Join us', // Subject line
    text: 'Hi, Tess ,Join us to make something great happen!', // plain text body
    html: '<b>Hi, Tess ,Join us to make something great happen!</b>', // html body
  });
  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}
