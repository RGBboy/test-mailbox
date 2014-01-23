# Test Mailbox

  Mailbox for testing sent mail in your node apps.

  [![Build Status](https://secure.travis-ci.org/RGBboy/test-mailbox.png)](http://travis-ci.org/RGBboy/test-mailbox)

## Installation

    $ npm install test-mailbox

## Usage

  Simply create a `new TestMailbox()` with the appropriate options and start listening:

```javascript
var TestMailbox = require('test-mailbox');

var mailbox = new TestMailbox({
  address: 'MyAddress@Me.com',
  auth: {
    user: 'MailboxUsername',
    pass: 'MailboxPassword'
  },
  timeout: 200 // optional, defaults to 200 ms.
})

mailbox.listen(8465, function(err) {
  if (err) {
    console.log('I\'m not listening :(');
    return;
  }
  console.log('I\'m listening for mail on port 8465 :)');
})
```

When the mailbox receives mail it will emit a 'newMail' event and pass through the new mail:

```javascript
mailbox.on('newMail', function(mail) {
  console.log('You\'ve got mail!');
  // Test your mail here!
});
```

## To Do

  * Add .listen and .close tests.
  * Add .close documentation

## License 

(The MIT License)

Copyright (c) 2012 RGBboy &lt;me@rgbboy.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.