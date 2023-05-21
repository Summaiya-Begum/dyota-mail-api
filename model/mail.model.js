const mongoose = require("mongoose");

const mailSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    phone_number: String,
    location: String,
    organization: String,
    website:String,
    budget: String,
    services:String,
    summary: String,
    agent:String,
    feedback:String,
  },
  {
    versionKey: false,
  }
);

const MailModel = mongoose.model("mails", mailSchema);

module.exports = { MailModel };
