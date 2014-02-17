var should = require('should');
var examen = process.env.APP_COV ? require(__dirname + '/../cov/examen.js') : require(__dirname + '/../witken/examen.js');
var eventbrite = process.env.APP_COV ? require(__dirname + '/../cov/eventbrite.js') : require(__dirname + '/../witken/eventbrite.js');
var utils = process.env.APP_COV ? require(__dirname + '/../cov/utils.js') : require(__dirname + '/../witken/utils.js');
var user = process.env.APP_COV ? require(__dirname + '/../cov/user.js') : require(__dirname + '/../witken/user.js');

var EXAMEN_DB_TEST = 'mongodb://test:test@10.0.0.133:27017/witken';
var NB_EXPORTS_OBJECTS = 4;

describe('Examen', function() {
    it('should have a valid init function', function() {
        examen.should.have.property('init');
    });
    it('should have an updateExamensList function', function() {
        examen.should.have.property('updateExamensList');
    });
    it('should have a getValidExamensList function', function() {
        examen.should.have.property('getValidExamensList');
    });
    it('should have an examen model', function() {
        examen.should.have.property('Examen');
    });
    it('should cover all exports functions', function() {
        var counter = 0;
        for (var key in examen) {
            counter++;
        }
        counter.should.be.equal(NB_EXPORTS_OBJECTS);
    });

    describe('init', function() {
        examen.Examen.remove({});
        it('should run with error if arguments are wrong', function() {
            var exception = 'No Exception';
            try {
                examen.init();
            } catch (e) {
                exception = e;
            }
            should.exist(exception);
            exception.should.be.equal('Wrong arguments exception!');

            exception = 'No Exception';
            try {
                examen.init(eventbrite, utils);
            } catch (e) {
                exception = e;
            }
            should.exist(exception);
            exception.should.be.equal('Wrong arguments exception!');

            exception = 'No Exception';
            try {
                examen.init(eventbrite, utils, user, EXAMEN_DB_TEST);
            } catch (e) {
                exception = e;
            }
            should.exist(exception);
            exception.should.be.equal('Wrong arguments exception!');
        });
        it('should callback with error if can not connect to DB', function(done) {
            var finished;
            examen.init(eventbrite, utils, user, 'bad_url', function error(err) {
                should.exist(err);
                err.should.be.equal('Failed to connect to Examen DB');
                finished = true;
            }, function success() {
                'Success called'.should.be.equal('');
                done();
            });

            var testFunction = function() {
                if (finished) done();
                else setTimeout(testFunction, 200);
            }
            testFunction();
        });
        it('should run without any issues', function(done) {
            examen.init(eventbrite, utils, user, EXAMEN_DB_TEST, function error(err) {
                throw err;
            }, function success() {
                done();
            });
        });
    });
    describe('model', function() {
        var examDate = new Date();
        examDate.setMonth(5);

        var examenData = {
            date: examDate,
            location: {
                address: 'Geneve, lalala',
                eb_id: 111
            },
            eb_id: 1
        };
        if (examen.Examen) {
            var ex = new examen.Examen(examenData);
            it('should have all required fields', function() {
                ex.should.have.property('date');
                ex.should.have.property('location');
                ex.should.have.property('attendees');
                ex.should.have.property('supervisors');
                ex.should.have.property('eb_id');

                ex.should.have.property('addAttendee');
                ex.should.have.property('addSuperviser');
            });

            describe('addAttendee', function() {
                it('should not add a non-existing user', function(done) {
                    var falseUser = new user.User({
                        email: 'not_existing_email@test.com'
                    });
                    ex.addAttendee(falseUser, function(err, examen) {
                        should.exist(err);
                        should.not.exist(examen);
                        err.should.have.property('id');
                        err.id.should.be.equal(40);
                        //TODO Test if attendee was added to the database
                        done();
                    });
                });
                it('should not add an existing user that is already registered for this examen', function(done) {

                });
                it('should add an existing user to this examen', function(done) {

                });
            });
            describe('addSuperviser', function() {
                it('should work, kind of =)', function(done) {
                    ex.addSuperviser('Nikita Grishin', function(err) {
                        should.not.exist(err);
                        done();
                    })
                })
            });
        } else {
            console.log('No examen model found');
        }
    });
    describe('updateExamensList', function() {
        it('should return a valid examens list', function(done) {
            var validExams = []
            examen.updateExamensList(function(err, examens) {
                should.not.exist(err);
                should.exist(examens);

            });
        })
    });
    describe('get valid examens list', function() {
        it('should return a subset of all examens list', function() {
            examen.updateExamensList(function(err, examens) {
                should.not.exist(err);
                should.exist(examen);
                examen.getValidExamensList(function(err, validExams) {
                    should.not.exist(err);
                    should.exist(validExams);

                });
            });
        });
    });
});