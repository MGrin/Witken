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
    sendServerInitMail()
}

var sendServerInitMail = function () {
    //TODO
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

exports.init = init;