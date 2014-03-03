var nodemailer = require('nodemailer');

var emailSettings = {
    service: "Gmail",
    auth: {
        user: "test",
        pass: "test"
    }
}

var init = function() {

}

var sendInscriptionConfirmation = function(user, href) {
    var mailOptions = {
        from: "Witken - Inscription <inscritpion@witken.org>",
        to: user.email,
        subject: "Welcome to Witken",
        text: "Inscription stuff",
        html: generateInscriptionMail(user, href)
    }

    sendMail(mailOptions);
}

var sendInvitation = function(mail){
    
}

var sendMail = function(mail) {
    var smtpTransport = nodemailer.createTransport("SMTP", emailSettings);

    smtpTransport.sendMail(mail, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }

        smtpTransport.close(); // shut down the connection pool, no more messages
    });
}

var addAttachement = function(mail, file) {
    throw 'Not implemented yet!';
}

var generateInscriptionMail = function(user, href) {
    return '<p>Hello</p>To set password, use this <a href=' + href + '>this</a> link.'
}
exports.init = init;
exports.sendInscriptionConfirmation = sendInscriptionConfirmation;
exports.sendInvitation = sendInvitation;
exports.addAttachement = addAttachement;