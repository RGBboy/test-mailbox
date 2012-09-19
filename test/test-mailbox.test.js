/**
 * Module dependencies.
 */

var TestMailbox = require('../index'),
    Sender = require('./helpers/sender'), // Should we move this to the test dir?
    should = require('should');

describe('Test Mailbox', function () {

  var mailbox,
      sender,
      userAddress = 'TestUser@localhost',
      port = 8465, // test port for secure SMTP
      auth = {
        user: 'Test',
        pass: 'Test'
      };

  before(function (done) {
    done()
  });

  beforeEach(function (done) {
    sender = new Sender({
      from: 'TestApplication@localhost',
      host: 'localhost',
      secureConnection: true,
      port: port,
      auth: auth
    });
    mailbox = new TestMailbox({
      address: userAddress,
      auth: auth
    });
    mailbox.listen(port, done);
  });

  afterEach(function (done) {
    // close the mailbox server.
    mailbox.close(done);
  });

  describe('.options', function () {

    describe('.address', function () {

      it('should only accept emails addressed to options.address', function (done) {
        mailbox.once('newMail', function (mail) {
          mail.should.exist;
          done();
        })
        sender.send('NotTestUser@localhost', function(err, res) {
          err.should.exist;
          sender.send(userAddress, function (err, res) {
            should.not.exist(err);
            res.should.exist;
          });
        });

      });

    });

    describe('.auth', function () {

      it('should only recieve email when .user and .pass match the senders auth', function (done) {

        var badUser = new Sender({
          from: 'TestApplication@localhost',
          host: 'localhost',
          secureConnection: true,
          port: port,
          auth: {
            user: 'NotTestApplication',
            pass: auth.pass
          }
        });

        var badPass = new Sender({
          from: 'TestApplication@localhost',
          host: 'localhost',
          secureConnection: true,
          port: port,
          auth: {
            user: auth.user,
            pass: 'NotTestApplication'
          }
        });

        mailbox.once('newMail', function (mail) {
          mail.should.exist;
          done();
        });

        badUser.send(userAddress, function (err, res) {
          err.should.exist;
          badPass.send(userAddress, function (err, res) {
            err.should.exist;
            sender.send(userAddress, function (err, res) {
              should.not.exist(err);
            });
          })
        })

      });

    });

  });

  describe('event: \'newMail\'', function () {

    it('should emit a \'newMail\' event when sent an email', function (done) {
      mailbox.once('newMail', function (mail) {
        mail.should.exist;
        done();
      });
      sender.send(userAddress, function (err, res) {
        should.not.exist(err);
        res.should.exist;
      });
    });

    it('should callback with mail', function (done) {
      mailbox.once('newMail', function (mail) {
        mail.html.should.include('<title>Example Email</title>');
        done();
      })
      sender.send(userAddress, function (err, res) {
        should.not.exist(err);
        res.should.exist;
      });
    });

  });

  /*
  describe('.listen', function () {

    it('should listen listen to the specified port', function (done) {
      // How Do We Test Listen ???
      done();
    });

  });
  */

  /*
  describe('.close', function () {

    it('should call the callback when the mailbox server is closed', function (done) {
      // Test freeing of port when .close is called
      done();
    });

  });
  */

});