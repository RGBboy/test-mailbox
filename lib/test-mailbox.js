/*!
 * test-mailbox
 * Copyright(c) 2012 RGBboy <me@rgbboy.com>
 * MIT Licensed
 */

/**
* Module dependencies.
*/

var EventEmitter = require('events').EventEmitter,
    simplesmtp = require('simplesmtp'),
    MailParser = require('mailparser').MailParser;

/**
 * Expose `TestMailbox`.
 */

exports = module.exports = TestMailbox;

function TestMailbox(options) {

  // Default connection timeout to 50ms. This allows us to close 
  // the server in an appropriate timeframe for testing.
  // The alternative is to setup the server in its own process
  //  and tear it down on close.
  options.timeout = options.timeout || 200;

  var self = new EventEmitter(),
      smtp = simplesmtp.createServer({
        timeout: options.timeout,
        name: 'localhost',
        secureConnection: true,
        requireAuthentication: true,
        disableDNSValidation: true,
        validateSender: false,
        validateRecipients: true
      });

  smtp.on('authorizeUser', function (envelope, username, password, callback) {
    if (username === options.auth.user && password === options.auth.pass) {
      callback(null, true);
    } else {
      callback(null, false);
    };
  });

  smtp.on('validateRecipient', function(envelope, email, callback) {
    if (options.address.length && options.address.indexOf(email) != -1) {
      callback();
    } else if (email === options.address) {
      callback();
    } else {
      callback(new Error('Recipient not found'));
    };
  })

  smtp.on('startData', function (envelope) {
    envelope.saveStream = new MailParser();
    envelope.saveStream.on('end', function (mail) {
      self.emit('newMail', mail);
    });
  });

  smtp.on('data', function (envelope, chunk) {
    envelope.saveStream.write(chunk);
  });

  smtp.on('dataReady', function (envelope, callback) {
    envelope.saveStream.end();
    callback(null, 'queueId'); // queueId is the queue id to be advertised to the client
  });

  // Start Listening
  self.listen = function (port, listener) {
    smtp.listen(port, listener);
  };

  self.close = function (callback) {
    smtp.end(callback);
  };

  return self;

}