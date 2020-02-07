# VavaSMS NODE JS
[![Build Status](https://travis-ci.com/adisaf/vavasms-nodejs.svg?branch=master)](https://travis-ci.com/adisaf/vavasms-nodejs)

Node JS client module to send SMS messages using VavaSMS SMS Gateway.

To use this library, you must have a valid account on https://www.vavasms.com.

**Please note** SMS messages sent with this library will be deducted by your VavaSMS account credits.

For any questions, please contact us at infos@vavasms.com

# Installation

with NPM
```bash
$ npm install vavasms-nodejs
```
# Send a message
Function send

| Props        | Type           | Description  |
| :------------- |:-------------| :-----|
| `phoneNumbers`      | string or array | phone number that will receive message |
| `text`      | string | SMS Message |
| `senderString`      | string | SenderID that will use |
```js
const SMS = require('vavasms-nodejs');

const sms = new SMS('username', 'password');
sms.send('+22507070101', 'Hello !', 'VavaSMS')
  .then(response => console.log(response.data)) // returns {code:0,message:string,data:[{lot_id:string,message_id:string,status:string}]}
  .catch(err => console.log(err.message))
```

# More info

You can check out our website https://www.vavasms.com
