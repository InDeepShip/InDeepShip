require("dotenv").config()
const puppeteer = require('puppeteer');

describe('Private user log-in process', () => {
    let browser;

    beforeEach(async (done) => {
        browser = await puppeteer.launch({
            headless: true,
            // slowMo: 100,
        });
        done();
    });

    afterEach(async (done) => {
        await browser.close();
        done();
    });

    test('can click reset password', async () => {
        let page = await browser.newPage();
        await page.goto(`${process.env.REACT_APP_FRONTEND_DEV_ADDRESS}/login`);

        const [response] = await Promise.all([
            page.waitForNavigation(),
            page.click("#pwd-reset-btn"),
          ]);

          expect(await page.$("#pwd-reset-page-selector")).not.toBe('null');

    });

    test('can click signup', async () => {
        let page = await browser.newPage();
        await page.goto(`${process.env.REACT_APP_FRONTEND_DEV_ADDRESS}/login`);

        const [response] = await Promise.all([
            page.waitForNavigation(),
            page.click("#signup-link-selector"),
          ]);
        
        expect(await page.$("#signup-option-private")).not.toBe('null');

    });

    test("a registered private user can log in", async () => {
        // Arrange: initialize code
        let page = await browser.newPage();
        await page.goto(`${process.env.REACT_APP_FRONTEND_DEV_ADDRESS}/login`);
        const registeredUser = { name: "David", address: "1150 high street", email: " aa@aa.com", password1: "11111111", password2: "11111111" };


        // Act
        await page.waitForSelector('#login-form');
        await page.type('#email-selector', registeredUser.email);
        await page.type('#pwd-selector', registeredUser.password1);
        
        await Promise.all([
            page.waitForNavigation(), 
            page.click('#login-submit-btn', {delay: 1000})
          ]);

        expect(await page.$('#landing-page-selector')).not.toBe('null');
        // Assert


    });

    test("a non-registered private user cannot log in", async () => {
        let page = browser.newPage();
        const nonRegisteredUser = {name : "invalid user", email : " invalid@mail.com", password : "11111111"};
        await page.goto(`${process.env.REACT_APP_FRONTEND_DEV_ADDRESS}/login`);

        await page.waitForSelector('#login-form');
        await page.type('#email-selector', nonRegisteredUser.email);
        await page.type('#pwd-selector', nonRegisteredUser.password);
        await Promise.all([
            page.waitForNavigation(), 
            page.click('#login-submit-btn', {delay: 1000})
          ]);

        expect(await page.$('#landing-page-selector')).toBe('null');
        
    });

});

