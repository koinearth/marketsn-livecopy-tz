const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const { config } = require("../../config");

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: config.supportEmailId,
      pass: config.supportEmailPassword,
    },
    tlsL: {
      rejectUnauthorized: false,
    },
  })
);

const sendEmail = async (
  groupId,
  groupAdminPublicKey,
  minSignaturesReqd,
  subject = "Request for Livecopy Group Creation",
  from = "Marketsn Tezos API Server",
  to = config.adminEmails
) => {
  await transporter.sendMail({
    from,
    to,
    subject,
    html: `
    Hi,<br>
    Livecopy Tezos API server received a new request for group creation with the following details:<br>
    <br>
      <li><b>groupId</b> - ${groupId}</li><br>
      <li><b>groupAdminPublicKey</b> - ${groupAdminPublicKey}</li><br>
      <li><b>minSignaturesReqd</b> - ${minSignaturesReqd}</li><br>
    <br>
    Please verify if the above details are valid.<br>
    If so, a signature confirming the authentication from LiveCopyAdmin should be sent back to API Server.<br>
    <br>
    Regards,<br>
    KoineArth<br>
    `,
  });
};

exports.sendEmail = sendEmail;
