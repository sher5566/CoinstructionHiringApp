// // controllers/adminController.js
// import jwt from "jsonwebtoken";
// import InvitationToken from "../models/InvitationToken.js";
// import nodemailer from "nodemailer";

// export const generateAdminInvitation = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const token = jwt.sign({ email }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     const invitationToken = new InvitationToken({
//       token,
//       email,
//       expiresAt: new Date(Date.now() + 3600000),
//     });

//     await invitationToken.save();

//     const verificationLink = `${process.env.FRONTEND_URL}/admin-signup?token=${token}`;

//     // Send email with the token
//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL,
//       to: email,
//       subject: "Admin Signup Invitation",
//       text: `You have been invited to sign up as an admin. Use the following link to complete your signup: ${verificationLink}`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         return res.status(500).json({ message: "Error sending email" });
//       }
//       res.status(200).json({ message: "Invitation sent" });
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
