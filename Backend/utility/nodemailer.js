// "use strict";
const nodemailer = require("nodemailer");
module.exports.sendMail = async function sendMail(str, data) {
  //in str we get signup and in data we get suer
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, //465  //587
    secure: false, //tre for 465 ans false for other ports
    //for unsercure we use 587 as port and select secure : false
    //for secure we use 465 as port and select secure : true
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "www.vvkg@gmail.com",
      pass: "dyrihlfsoxerbban"
    },
  });

  // async..await is not allowed in global scope, must use a wrapper

  var Osubject, Ohtml;
  if (str == "signup") {
    Osubject = `Thank you for signing up ${data.name}`;
    Ohtml = `
    <h1>Welcome to foodapp.com </h1>
    Hope you have a good time!
    Here are your details
    Name : ${data.name}
    Email : ${data.email}
    `;
  } else if (str == "resetpassword") {
    Osubject = "Reset Password";
    Ohtml = `
    <h1>foodapp.com</h1>
    Here is your link to reset password!
    ${data.resetPasswordLink}

    `;
  }

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Food App 👻" <www.vvkg@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: Osubject, // Subject line
    // text: "Hello world?", // plain text body
    html: Ohtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //

};
