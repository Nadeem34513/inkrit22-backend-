const nodeMailer = require("nodemailer");
import { getLocaleString } from "./getLocaleString";

export async function sendEmail(email, otp) {
  return new Promise((resolve, reject) => {
    console.log(email, otp);
    let transporter = nodeMailer.createTransport({
      host: "smtp.zoho.in",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAILER_EMAIL_ID,
        pass: process.env.MAILER_PASSWORD,
      },
    });

    transporter.sendMail(
      {
        from: "Burwing Co - Support <support@burwingco.ae>", // sender address
        to: email,
        subject: `Password reset request for your BurwingCo account.`,
        html: `<p>You can reset your Burwingco Password using this OTP, <b>${otp}</b></p>`, // TODO format this
      },
      function (err, info) {
        if (err) reject(getLocaleString("MAILER_ERROR"));
        resolve(info);
        console.log(err, info);
      },
    );
  });
}
