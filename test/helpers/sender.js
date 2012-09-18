// Email Sender

/**
 * Module dependencies.
 */

var nodemailer = require('nodemailer'),
    noop = function() {};

/**
 * Module exports.
 */

exports = module.exports = function Sender (options) {

  var that = {};

  var smtpTransport = nodemailer.createTransport('SMTP', options);

  that.send = function (to, callback) {

    callback = callback || noop;

    var mailOptions = {
      from: options.from,
      to: to,
      subject: 'Example Email',
      generateTextFromHTML: true, // let nodemailer generate plain text from html
      html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html><head><title>Example Email</title><style>h1{color:#fe57a1}</style></head><body><h1>Heading 1</h1><ul><li>List Item</li><li>List Item</li><li>List Item</li></ul></body></html>'
    };

    smtpTransport.sendMail(mailOptions, callback);

  };

  return that;

};