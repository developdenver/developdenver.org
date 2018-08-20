const nodemailer = require("nodemailer");
const showdown = require("showdown");

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.FROM_EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
});
const fromEmailAddress = process.env.FROM_EMAIL_ADDRESS;
const converter = new showdown.Converter();

function send(address, subject, content){
    return transport.sendMail({
        from: fromEmailAddress,
        to: address,
        subject,
        text: content,
        html: converter.makeHtml(content),
    });
}

module.exports = {
    send,
};
