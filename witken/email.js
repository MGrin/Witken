var nodemailer = require('nodemailer');

var emailSettings = {
    service: "Gmail",
    auth: {
        user: "user@gmail.com",
        pass: "password"
    }
}

exports.sendInscriptionConfirmation = function (user) {
    var mailOptions = {
        from: "Witken - Inscription <inscritpion@witken.org>",
        to: user.email,
        subject: "Welcome to Witken",
        text: "Inscription stuff",
        html: generateMail(user)
    }
    
    sendMail(mailOptions);
}

var sendMail = function (mail) {
    var smtpTransport = nodemailer.createTransport("SMTP", emailSettings);

    smtpTransport.sendMail(mail, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }

        smtpTransport.close(); // shut down the connection pool, no more messages
    });
}

var addAtachment = function(mail, file){
    
}

var generateMail = function(user){
    return '<p>Hello</p>'
}