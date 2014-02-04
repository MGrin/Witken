var nodemailer = require('nodemailer');

var emailSettings = {
    service: "Gmail",
    auth: {
        user: "mr6r1n@gmail.com",
        pass: "1asd4ghj8QPP"
    }
}

exports.sendInscriptionConfirmation = function (user, href) {
    var mailOptions = {
        from: "Witken - Inscription <inscritpion@witken.org>",
        to: user.email,
        subject: "Welcome to Witken",
        text: "Inscription stuff",
        html: generateInscriptionMail(user, href)
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

var generateInscriptionMail = function(user, href){
    return '<p>Hello</p>To set password, use this <a href='+href+'>this</a> link.'
}