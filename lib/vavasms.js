const axios = require('axios');
const qs = require('querystring');
const request = axios.create({
    baseURL: 'https://vavasms.com/api/v1',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});

class SMS {
    // Main class
    constructor(username, password) {
        if (!username) {
            throw new TypeError('Username is required')
        }
        if (typeof username !== 'string') {
            throw new TypeError('Username is required to be a string')
        }
        if (!password) {
            throw new TypeError('Password is required')
        }
        if (typeof password !== 'string') {
            throw new TypeError('Password is required to be a string')
        }
        // username and password need for authentication
        this.username = username;
        this.password = password;
    }

    // send sms message
    async send(phoneNumbers, text, messageType, senderString) {
        let phoneNumbersArray = [];
        if (phoneNumbers) {
            if (typeof phoneNumbers === 'string') {
                phoneNumbersArray.push(phoneNumbers)
            } else if (Array.isArray(phoneNumbers)) {
                phoneNumbersArray = phoneNumbers
            } else {
                throw new TypeError('First argument phoneNumbers could be array for multiple numbers or string for one number')
            }
        } else {
            throw new TypeError('First argument phoneNumbers is required, it could be array for multiple numbers or string for one number')
        }
        if (!text || typeof text != 'string') {
            throw new TypeError('Second argument text is required, it must be string')
        }
        let requestBody = {
            username: this.username,
            password: this.password,
            sender_id: senderString,
            phone: phoneNumbersArray.join(','),
            message: text
        };

        try {
            return await request.post('/text/single', qs.stringify(requestBody));
        } catch (err) {
            throw err;
        }
    }

    // check message status
    async status(messageId) {
        if (!messageId) {
            throw new TypeError('Message Id is required, it should be string')
        }
        let requestBody = {
            username: this.username,
            password: this.password,
            message_id: messageId
        };
        try {
            return await request.post('/text/single', qs.stringify(requestBody));
        } catch (err) {
            throw err
        }
    }
}

module.exports = SMS;
