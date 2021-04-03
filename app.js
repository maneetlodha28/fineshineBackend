const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();
const GMAIL_USER = "fineshineudr@gmail.com";

require("dotenv").config();
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req, res) => {
  return res.json({ name: "maneet" });
});
app.post("/contact", (req, res) => {
  // Instantiate the SMTP server
  const smtpTrans = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: GMAIL_USER,
      pass: "rajeshnisha20",
    },
  });

  // Specify what the email will look like
  const mailOpts = {
    from: "Your sender info here", // This is ignored by Gmail
    to: GMAIL_USER,
    subject: "New message from contact form at ",
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`,
  };

  // Attempt to send the email
  smtpTrans.sendMail(mailOpts, (error, response) => {
    if (error) {
      res.json(error); // Show a page indicating failure
    } else {
      res.redirect("https://www.wekare.co.in/");
    }
  });
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server started at ${port}`));
