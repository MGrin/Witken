var should = require('should');
var crypto = require('crypto');
var user = process.env.APP_COV ? require(__dirname + '/../cov/user.js') : require(__dirname + '/../witken/user.js');
var email = process.env.APP_COV ? require(__dirname + '/../cov/email.js') : require(__dirname + '/../witken/email.js');
var utils = process.env.APP_COV ? require(__dirname + '/../cov/utils.js') : require(__dirname + '/../witken/utils.js');

var USER_DB_TEST = 'mongodb://test:test@10.0.0.133:27017/witken';
var NB_EXPORTS_OBJECTS = 3;

email.init();

describe('User', function() {
    it('should have a valid init function', function() {
        user.should.have.property('init');
    });
    it('should have an User model', function() {
        user.should.have.property('User');
    });
    it('should have a userTools object', function() {
        user.should.have.property('tools');
    });
    it('should cover all exports functions', function() {
        var counter = 0;
        for (var key in user) {
            counter++;
        }
        counter.should.be.equal(NB_EXPORTS_OBJECTS);
    });

    describe('init', function() {
        user.User.remove({});
        it('should run with error if arguments are wrong', function() {
            var exception = 'No Exception';
            try {
                user.init();
            } catch (e) {
                exception = e;
            }
            should.exist(exception);
            exception.should.be.equal('Wrong arguments exception!');
        });
        it('should callback with an error if can not connect to DB', function(done) {
            user.init(utils, email, 'very_bad_db_url', function(err) {
                should.exist(err);
                err.should.be.equal('Failed to connect to User DB');
                done();
            }, function() {
                'Success called'.should.be.equal('');
                done();
            });

        })
        it('should run without any issues', function(done) {
            user.init(utils, email, USER_DB_TEST, function(err) {
                throw err;
            }, function() {
                done();
            });
        });
    });

    describe('model', function() {
        var user_data = {
            email: 'test@email.com',
            human_data: {
                prefix: 'M',
                first_name: 'Nikita',
                last_name: 'Grishin',
                gender: 'Male',
                birth_date: new Date()
            },
            contact: {
                home_phone: "022 111 11 11",
                cell_phone: "076 384 77 02",
                home_address: "32, promenade des artisans",
                home_postal_code: "1217",
                home_country_code: "CH",
                home_city: "Meyrin"
            },
            job: {
                job_title: "CTO",
                work_address: "Val d'Isere, Kilo"
            }
        };

        var u = new user.User(user_data);

        it('should have all required fields', function() {

            u.should.have.property('email');
            u.should.have.property('hasPassword');
            u.hasPassword.should.be.false;
            u.should.have.property('password');
            u.should.have.property('password_sel');
            u.should.have.property('validPassword');
            u.should.have.property('setPassword');
            u.should.have.property('changePassword');
            u.should.have.property('generatePublicObject');

            u.should.have.property('examen');
            u.should.have.property('next_exams');
            u.should.have.property('label');
            u.should.have.property('result');

        });
        describe('validPassword, changePassword, setPassword functions', function() {
            it('should not validate any password if no password has been set', function() {
                u.validPassword('lalala').should.be.false;
            });
            it('should not change the password if the password was not set and return an error with id 666', function() {
                u.changePassword('new lalala', 'lalala', function(err, us) {
                    should.not.exist(us);
                    should.exist(err);
                    err.should.have.property('id');
                    err.id.should.be.equal(666)
                });
            });
            it('should set a password if the password was not set before', function(done) {
                u.setPassword('cool password', function(err, us) {
                    should.not.exist(err);
                    should.exist(us);
                    u = us;
                    done();
                });;
            });
            it('should validate a new password', function() {
                u.validPassword('cool password').should.be.true;
            });
            it('should not set a password for the second time', function() {
                u.setPassword('new cool password', function(err, us) {
                    should.exist(err);
                    should.not.exist(us);
                    err.should.have.property('id');
                    err.id.should.be.equal(20);
                });
            });
            it('should not change the password if the old one is wrong', function() {
                u.changePassword('new cool password', 'wrong old password', function(err, us) {
                    should.exist(err);
                    should.not.exist(us);
                    err.should.have.property('id');
                    err.id.should.be.equal(2);
                });
            });
            it('should change the password if the old one is correct', function() {
                u.changePassword('new cool password', 'cool password', function(err, us) {
                    should.not.exist(err);
                    should.exist(us);
                    us.validPassword('new cool password').should.be.true;
                    us.validPassword('cool password').should.be.false;
                });
            });
        });
    });
});