const SMS = require('./../../lib/vavasms');

describe("VavaSMS", function () {

    const sms = new SMS('username', 'password');

    it("should sent SMS sending request to VavaSMS", async function () {
        const result = await sms.send('+22507070101', 'Hello !');
        expect(result.data).toBeInstanceOf(Object);
    });
    it("should check the status of a sent message", async function () {
        const result = await sms.status('ANY-SMS-ID');
        expect(result.data).toBeInstanceOf(Object);
    });
});
