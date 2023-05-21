const { Router } = require("express");
const { MailModel } = require("../model/mail.model");
const mailRoutes = Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

mailRoutes.post("/send", (req, res) => {
  const {
    name,
    email,
    phone_number,
    location,
    organization,
    website,
    budget,
    services,
    summary,
  } = req.body;

  // Create a new mail using the provided data
  const newMail = new MailModel({
    name,
    email,
    phone_number,
    location,
    organization,
    website,
    budget,
    services,
    summary,
    agent: null,
    feedback: null,
  });

  // Save the new mail to the database
  newMail
    .save()
    .then(() => {
      // Send email
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_ID, //your email
          pass: process.env.EMAIL_PASSWORD, // get the app specific 12 or 16 digit password from app password in gmail secuirity
        },
      });

      const mailTemplate = `Dear ${name},

      Thank you for your interest in our company. We appreciate you taking the time to reach out to us and providing the following information:
  
      Email: ${email}
      Phone Number: ${phone_number}
      Location: ${location}
      Organization: ${organization}
      Website: ${website}
      Budget: ${budget}
      Services: ${services}
      Summary: ${summary}
      
      We have received your inquiry and will review it promptly. Our team will assess your requirements and get back to you with further details.
      
      Should you have any additional questions or concerns, please feel free to reach out to us. We are here to assist you in any way we can.
      
      Thank you once again for considering our company. We look forward to the opportunity to work with you.
      
      Best regards,
      
      Summaiya
      Full Stack Developer
      Pixelotech`;

      const mailOptions = {
        from: process.env.EMAIL_ID, // your email
        to: email,
        subject: "Welcome Note",
        text: mailTemplate,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error(error);
        } else {
          console.log("Email sent: " + info.response);

          // Send email to your own email address
          const mailOption = {
            from: process.env.EMAIL_ID, // your email
            to: process.env.EMAIL_ID, // your email
            subject: "New client",
            text: `
            Dear Summaiya,
            
            Here is a summary of your client query:
            
            Email: ${email}
            Phone Number: ${phone_number}
            Location: ${location}
            Organization: ${organization}
            Website: ${website}
            Budget: ${budget}
            Services: ${services}
            Summary: ${summary}
            
            Please let us know if the above information is accurate and if there are any additional details we should consider. We value your feedback and want to ensure that you fully understand client's requirements.
                        
            Best regards,
            Pixelotech
            `,
          };

          transporter.sendMail(mailOption, function (error, info) {
            if (error) {
              console.error(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        }
      });

      res.send("Mail received. We will contact you shortly.");
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).send("Failed to send mail.");
    });
});

module.exports = mailRoutes;
