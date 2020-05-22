import {Service} from  'egg';
// import nodemailer from 'nodemailer'
const nodemailer = require('nodemailer')
const USER_EMAIL = '610241598@qq.com';
const AUTH_CODE = 'mzvcblllmuuwbfeg';

const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  secureConnection: true,
  port: 465,
  secure: true,
  auth: {
    user: USER_EMAIL,
    pass: AUTH_CODE
  }
});

class ToolService extends Service {
  async sendMail(email: string, subject: string, html: string) {
    return new Promise((resolve, reject) => {

      const mailOptions: mailOptions = {
        from: USER_EMAIL,
        to: email,
        subject,
        html,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
          reject(error);
          return console.log('邮箱出错了', error)
        }
        console.log('邮件发送成功', info);
        resolve(info);
      });
    })
  }
}

export default ToolService;

interface mailOptions {
  from: string,
  to: string,
  subject: string,
  html: string,
  text?: string
}
