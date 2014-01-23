var should = require('should');
var crypto = require('crypto');
var user = process.env.APP_COV ? require(__dirname + '/../cov/user.js') : require(__dirname + '/../witken/user.js');

describe('User', function () {
    it('should have an init function', function () {
        user.should.have.property('init');
    });
    it('should have an User model', function () {
        user.should.have.property('User');
    });
    it('should have an addUser function', function () {
        user.should.have.property('addUser');
    });
    it('should have an confirm order function', function () {
        user.should.have.property('confirmOrder');
    });
    it('should have a set password function', function () {
        user.should.have.property('setPassword');
    });
    it('should have an change password function', function () {
        user.should.have.property('changePassword');
    });
    it('should have a find one function', function () {
        user.should.have.property('findOne');
    });
    it('should have a setDB method', function () {
        user.should.have.property('setDB');
    });

    user.setDB('mongodb://witkenDB:usersDB2013WitKen@ds057538.mongolab.com:57538/witken_users');
    user.init();
    var realUser;

    describe('User.addUser', function () {
        user.User.remove({}, function () {});

        var u = new user.User({
            email: "test@user.com",
            human_data: {
                prefix: 'Mr',
                first_name: 'Test',
                last_name: 'User',
                gender: 'Male',
                birth_date: new Date(),
            },
            contact: {
                home_phone: '',
                cell_phone: '',
                home_address: '',
                home_postal_code: '',
                home_country_code: '',
                home_city: '',
            },
            job: {
                job_title: 'Witken',
                work_address: ''
            },
            eventbrite: [
                {
                    event_id: 1234,
                    ticket_id: 1234
            }
        ]
        });

        it('should add an inexisting user', function (done) {
            user.addUser(u, function (err, us) {
                should.not.exist(err);
                should.exist(us);
                u = us;
                done();
            });
        });

        it('should not add an existing user', function () {
            user.addUser(u, function (err, us) {
                should.exist(err);
                should.not.exist(us);
            });
        });

        it('should not validate password', function () {
            u.validPassword(u.password).should.be.equal(false);
        });

        realUser = u;
    });

    describe('User.setPassword', function () {
        it('should set a new password only for the first time', function (done) {
            realUser.hasPassword.should.be.equal(false);
            user.setPassword(realUser, "123qweQWE", function (err, u) {
                should.not.exist(err);
                u.hasPassword.should.be.equal(true);
                u.validPassword("123qweQWE").should.be.equal(true);
                realUser = u;
                done();
            });
        });

        it('should not set a new password for the second time', function (done) {
            realUser.hasPassword.should.be.equal(true);
            user.setPassword(realUser, "123qweQWE2", function (err, u) {
                should.exist(err);
                should.not.exist(u);
                realUser.validPassword("123qweQWE").should.be.equal(true);
                realUser.validPassword("123qweQWE2").should.be.equal(false);
                done();
            })
        });

    });

    describe('User.changePassword', function () {
        it('should change password if the old one is valid', function (done) {
            user.changePassword(realUser, "123qweZXC", "123qweQWE", function (err, u) {
                should.not.exist(err);
                should.exist(u);
                u.validPassword("123qweZXC").should.be.equal(true);
                realUser = u;
                done();
            });
        });

        it('should not change password if the old password is not valid', function (done) {
            user.changePassword(realUser, "123asdZXC", "123qweRTY", function (err, u) {
                should.exist(err);
                should.not.exist(u);
                realUser.validPassword("123qweZXC").should.be.equal(true);
                done();
            });
        });
    });

    describe('User.findOne', function () {
        it('should found a real user', function (done) {
            user.findOne({
                email: realUser.email
            }, function (err, us) {
                should.not.exist(err);
                should.exist(us);
                us._id.toString().should.be.equal(realUser._id.toString());
                done();
            });
        });
    });
});