import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //craete a varifyToken
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);


    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 });
    } else {

    }

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "8c72517c51b7a3", // ❌
        pass: "1d2b11a2194c48" //  ❌
      }
    });

    const mailOptions = {
      from: "piyush@piyush.ai", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Varify your email" : "Reset your Password", // Subject line
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>` // html body
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
