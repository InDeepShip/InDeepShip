import { randomUserGenerator, registeredUserGenerator } from '../utility';
require("dotenv").config()
const puppeteer = require('puppeteer');

describe('User password reset process', () => {
    let browser;
    beforeEach(async () => {
        browser = await puppeteer.launch();
    })

    afterEach(async (done) => {
        await browser.close();
        done();
    })

    test('a registered user can reset password', async () => {
        let page = browser.newPage();
        await page.goto(`${process.env.REACT_APP_DEV_ADDRESS}/passwordreset`);
        const registeredUser = registeredUserGenerator();

        await page.type('#pwd-reset-input-selector', registeredUser.email);
        await page.click('#pwd-reset-submit-btn');
        await page.waitForSelector('#email-sent-msg-selector');

        expect(await page.$('#email-sent-msg-selector')).not.toBeNull();

    });
    
    test('a non-registered user cannot reset password', async () => {
        let page = browser.newPage();
        await page.goto(`${process.env.REACT_APP_DEV_ADDRESS}/passwordreset`);
        const nonRegisteredUser = randomUserGenerator();

        await page.type('#pwd-reset-input-selector', nonRegisteredUser.email);
        await page.click('#pwd-reset-submit-btn');
        await page.waitForSelector('#email-sent-msg-selector');

        expect(await page.$('#email-sent-msg-selector')).toBeNull();
    });
    
});
