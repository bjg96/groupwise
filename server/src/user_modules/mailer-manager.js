const nodemailer = require('nodemailer');
const config = require('../config');
const fs = require('fs');
const path = require('path');

class MailerManager {

  constructor() {
    this.context = null;
    this.templates = {};
  }

  init() {
    return new Promise((resolve, reject) => {
      // Generate a nodemailer transporter object that we can use to send emails
      this.context = nodemailer.createTransport(config.mailer.accounts[config.mailer.default].connectionString);

      if (config.mailer.disabled) {
        console.warn("[MAILER] Email sending disabled, to enable set mailer.disabled = false");
      }

      // pre-load all templates
      this.loadTemplate("welcome", "templates/welcome.html", "templates/welcome.text", "Welcome to FlagFriends!")
        .then(() => this.loadTemplate("validateEmail", "templates/validateEmail.html", "templates/validateEmail.text", "FlagFriends - Confirm Account Creation"))
        .then(() => this.loadTemplate("resetPasswordEmail", "templates/resetPasswordEmail.html", "templates/resetPasswordEmail.text", "FlagFriends - Password Reset"))
        .then(() => this.loadTemplate("proposeMatch", "templates/proposeMatch.html", "templates/proposeMatch.text", "FlagFriends - New Match Request"))
        .then(() => this.loadTemplate("acceptMatch", "templates/acceptMatch.html", "templates/acceptMatch.text", "FlagFriends - Match Accepted"))
        .then(() => this.loadTemplate("rejectMatch", "templates/rejectMatch.html", "templates/rejectMatch.text", "FlagFriends - Match Rejected"))
        .then(() => this.loadTemplate("contact", "templates/contact.html", "templates/contact.text", "FlagFriends - Contact Inquery"))
        .then(() => this.loadTemplate("newUserPending", "templates/newUserPending.html", "templates/newUserPending.text", "FlagFriends - New User Pending Review"))
        .then(() => this.loadTemplate("userApproved", "templates/userApproved.html", "templates/userApproved.text", "FlagFriends - Account Activated"))
        .then(() => this.loadTemplate("userRejected", "templates/userRejected.html", "templates/userRejected.text", "FlagFriends - Account Rejected"))
        .then(resolve)
        .catch((err) => {
          console.error("[MAILER] Could not load template " + err);
          reject(err);
        });
    });
  }

  loadTemplate(name, htmlName, textName, subject) {
    return new Promise((resolve, reject) => {
      console.log(`[MAILER] Loading template ${htmlName}, ${textName}`);
      fs.readFile(path.resolve(__dirname, '..', '..', htmlName), (err, html) => {
        if (err)
          return reject(err);
        fs.readFile(path.resolve(__dirname, '..', '..', textName), (err, text) => {
          if (err)
            return reject(err);
          this.templates[name] = this.generateTemplate(subject, text, html);
          return resolve();
        })
      })
    });
  }

  getContactMailAddress() {
    return config.mailer.contact;
  }

  /**
   * Generates a nodemailer template object that can be used to send an email
   * @param subject - The text to have in the subject field of the email
   * @param text - The text contents of the email
   * @param html - The HTML contents of the email
   * @returns {*}
   */
  generateTemplate(subject, text, html) {
    return this.context.templateSender({
      subject: subject,
      text: text,
      html: html
    }, config.mailer.accounts[config.mailer.default].defaults);
  }

  /**
   * Sends a mail message generated from generateTemplate
   * @param mail - The mail item to send
   * @param header - Header information
   * @param params - Parameters to the mail template
   */
  sendMail(mail, header, params) {
    return new Promise((resolve, reject) => {
      if (config.mailer.disabled === false) {
        console.log("[MAILER] Sending email to " + header.to);

        mail(header, params, (error) => {
          if (error) {
            console.error("[MAILER] Could not dispatch email message, error: " + error);
            reject(error);
          }
          else
            resolve();
        })
      }
      else {
        console.warn("[MAILER] Would send email to " + header.to);
        resolve();
      }
    })
  }
}

module.exports = new MailerManager();
