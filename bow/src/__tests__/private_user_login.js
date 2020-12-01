import { randomUserGenerator, registeredUserGenerator } from '../utility';
require("dotenv").config()
const puppeteer = require('puppeteer');

describe('Private user log-in process', () => {
    let browser;

    beforeEach(async (done) => {
        browser = await puppeteer.launch();
        done();
    });

    afterEach(async (done) => {
        await browser.close();
        done();
    });

    test('can click reset password', async () => {
        const page = await browser.newPage();
        await page.goto(`${process.env.REACT_APP_FRONTEND_PRODUCTION_ADDRESS}/login`);

        await page.waitForSelector("#pwd-reset-btn");
        const [response] = await Promise.all([
            page.waitForNavigation(),
            page.click("#pwd-reset-btn"),
          ]);

        expect(await page.$("#pwd-reset-page-selector")).not.toBeNull();
        await page.close();
    });

    test('can click signup', async () => {
        const page = await browser.newPage();
        await page.goto(`${process.env.REACT_APP_FRONTEND_PRODUCTION_ADDRESS}/login`);

        await page.waitForSelector("#signup-link-selector");
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
        await page.goto(`${process.env.REACT_APP_FRONTEND_PRODUCTION_ADDRESS}/login`);
        const registeredUser = registeredUserGenerator();


        // Act
        await page.waitForSelector('#login-form');
        await page.type('#email-selector', registeredUser.email);
        await page.type('#pwd-selector', registeredUser.password);
        
        await Promise.all([
            page.waitForNavigation(), 
            page.click('#login-submit-btn', {delay: 1000})
          ]);

        // Assert
        expect(await page.$('#private-dashboard-selector')).not.toBeNull();
        await page.close();
    });

    test("a non-registered private user cannot log in", async () => {
        const page = await browser.newPage();
        const nonRegisteredUser = randomUserGenerator();
        await page.goto(`${process.env.REACT_APP_FRONTEND_PRODUCTION_ADDRESS}/login`);

        await page.waitForSelector('#login-form');
        await page.type('#email-selector', nonRegisteredUser.email);
        await page.type('#pwd-selector', nonRegisteredUser.pwd1);
        await page.click('#login-submit-btn', {delay: 1000});

        expect(await page.$('#private-dashboard-selector')).toBeNull();
        await page.close();
    });

});

