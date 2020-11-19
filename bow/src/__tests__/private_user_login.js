require("dotenv").config()
const puppeteer = require('puppeteer');

describe('Private user log-in process', () => {
    let browser;

    beforeEach(async (done) => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 50,
        });
        done();
    });

    afterEach(async (done) => {
        await browser.close();
        done();
    });

    test('can click reset password', async () => {
        const page = await browser.newPage();
        await page.goto(`${process.env.REACT_APP_FRONTEND_DEV_ADDRESS}/login`);

        const [response] = await Promise.all([
            page.waitForNavigation(),
            page.click("#pwd-reset-btn"),
          ]);

        expect(await page.$("#pwd-reset-page-selector")).not.toBe('null');
        await page.close();
    });

    test('can click signup', async () => {
        const page = await browser.newPage();
        await page.goto(`${process.env.REACT_APP_FRONTEND_DEV_ADDRESS}/login`);

        const [response] = await Promise.all([
            page.waitForNavigation(),
            page.click("#signup-link-selector"),
          ]);
        
        expect(await page.$("#signup-option-private")).not.toBe('null');
        await page.close();
    });

    test("a registered private user can log in", async () => {
        // Arrange: initialize code
        const page = await browser.newPage();
        await page.goto(`${process.env.REACT_APP_FRONTEND_DEV_ADDRESS}/login`);
        const registeredUser = { name: "Chris", address: "1150 high street", email: " chris@mail.com", password: "chrischris"};


        // Act
        await page.waitForSelector('#login-form');
        await page.type('#email-selector', registeredUser.email);
        await page.type('#pwd-selector', registeredUser.password);
        
        await Promise.all([
            page.waitForNavigation(), 
            page.click('#login-submit-btn', {delay: 1000})
          ]);

        // Assert
        expect(await page.$('#landing-page-selector')).not.toBeNull();
        await page.close();
    });

    test("a non-registered private user cannot log in", async () => {
        const page = await browser.newPage();
        const nonRegisteredUser = {name : "invalid user", email : "invalid@mail.com", password : "11111111"};
        await page.goto(`${process.env.REACT_APP_FRONTEND_DEV_ADDRESS}/login`);

        await page.waitForSelector('#login-form');
        await page.type('#email-selector', nonRegisteredUser.email);
        await page.type('#pwd-selector', nonRegisteredUser.password);
        await page.click('#login-submit-btn', {delay: 1000});

        expect(await page.$('#landing-page-selector')).toBeNull();
        await page.close();
    });

});

