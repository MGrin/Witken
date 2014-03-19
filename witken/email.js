var nodemailer = require('nodemailer');

var emailSettings = {
    service: "Postmark",
    name: "Witken",
    auth: {
        user: "972d4413-a003-4700-a9d3-9a4b4f08ba10",
        pass: "972d4413-a003-4700-a9d3-9a4b4f08ba10"
    }
}

var init = function() {
    sendMail()
}

var sendInscriptionConfirmation = function(user, href) {
    var mailOptions = {
        from: "Witken - Inscription <inscription@witken.com>",
        to: user.email,
        subject: "Welcome to Witken",
        text: "Inscription stuff",
        html: generateInscriptionMail(user, href)
    }

    sendMail(mailOptions);
}

var sendInvitation = function(email){
    
}

var sendInvitationConfirmation = function (email, inv){

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
exports.sendInvitationConfirmation = sendInvitationConfirmation;
exports.addAttachement = addAttachement;