const axios = require('axios');
const qs = require('querystring');

class SMS {
    constructor(username, password) {
        if (!username) {
            throw new TypeError('Username is required');
        }
        if (typeof username !== 'string') {
            throw new TypeError('Username must be a string');
        }
        if (!password) {
            throw new TypeError('Password is required');
        }
        if (typeof password !== 'string') {
            throw new TypeError('Password must be a string');
        }

        this.client = axios.create({
            baseURL: 'https://vavasms.com/api/v1',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'VavaSMS-NodeJS/0.1.4'
            },
            timeout: 10000, // 10 second timeout
            maxRedirects: 5
        });

        this.username = username;
        this.password = password;
    }

    validatePhoneNumbers(phoneNumbers) {
        const phoneNumbersArray = Array.isArray(phoneNumbers) ? phoneNumbers : [phoneNumbers];
        
        if (!phoneNumbersArray.length) {
            throw new TypeError('At least one phone number is required');
        }

        // E.164 format validation
        // Format: +[country code][number]
        // Example: +14155552671, +2250701020304
        const e164Regex = /^\+[1-9]\d{1,14}$/;
        const invalidNumbers = phoneNumbersArray.filter(num => !e164Regex.test(num));
        
        if (invalidNumbers.length) {
            throw new TypeError(
                `Invalid phone numbers detected: ${invalidNumbers.join(', ')}. ` +
                'Phone numbers must be in E.164 format (e.g., +14155552671, +2250701020304)'
            );
        }

        return phoneNumbersArray;
    }

    async send(phoneNumbers, text, senderString) {
        if (!text || typeof text !== 'string') {
            throw new TypeError('Message text is required and must be a string');
        }

        if (text.length > 1600) {
            throw new TypeError('Message text exceeds maximum length of 1600 characters');
        }

        const validatedPhoneNumbers = this.validatePhoneNumbers(phoneNumbers);

        const requestBody = {
            username: this.username,
            password: this.password,
            sender_id: senderString,
            phone: validatedPhoneNumbers.join(','),
            message: text
        };

        try {
            const response = await this.client.post('/text/single', qs.stringify(requestBody));
            return response;
        } catch (error) {
            if (error.response) {
                // Server responded with error
                throw new Error(`SMS API Error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
            } else if (error.request) {
                // Request made but no response
                throw new Error('No response received from SMS API');
            } else {
                // Error in request setup
                throw new Error(`SMS Request Error: ${error.message}`);
            }
        }
    }

    async status(messageId) {
        if (!messageId || typeof messageId !== 'string') {
            throw new TypeError('Message ID is required and must be a string');
        }

        const requestBody = {
            username: this.username,
            password: this.password,
            message_id: messageId
        };

        try {
            const response = await this.client.post('/text/single', qs.stringify(requestBody));
            return response;
        } catch (error) {
            if (error.response) {
                throw new Error(`Status API Error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
            } else if (error.request) {
                throw new Error('No response received from Status API');
            } else {
                throw new Error(`Status Request Error: ${error.message}`);
            }
        }
    }
}

module.exports = SMS;
