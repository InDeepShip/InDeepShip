import { randomUserGenerator, registeredUserGenerator } from '../utility';
require("dotenv").config()
const puppeteer = require('puppeteer');

describe('User password reset process', () => {
    let browser;
    beforeEach(async (done) => {
        browser = await puppeteer.launch({});
        done();
    })

    afterEach(async (done) => {
        await browser.close();
        done();
    })
 
    test('a registered user can reset password', async () => {
        const page = await browser.newPage();
        await page.goto(`${process.env.REACT_APP_FRONTEND_PRODUCTION_ADDRESS}/passwordreset`);
        const registeredUser = registeredUserGenerator();

        await page.waitForSelector("#email-selector");
        await page.waitForSelector('#submit-selector');
        await page.type('#email-selector', registeredUser.email)
        await page.click('#submit-selector');
        await page.waitForSelector('#email-sent-msg-selector');
                
        await page.waitForFunction('document.querySelector("#email-sent-msg-selector").innerText.length > 0');
        expect(await page.$eval('#email-sent-msg-selector', e => e.textContent)).toBe("Password reset e-mail has been sent.");
        await page.close();
    });
    
    // test('a non-registered user cannot reset password', async () => {
    //     const page = await browser.newPage();
    //     await page.goto(`${process.env.REACT_APP_FRONTEND_DEV_ADDRESS}/passwordreset`);
    //     const nonRegisteredUser = randomUserGenerator();

    //     await page.type('#email-selector', nonRegisteredUser.email);
    //     await page.click('#submit-selector');
    //     await page.waitForSelector('#email-sent-msg-selector');

    //     //expect(await page.$eval('#email-sent-msg-selector', e => e.textContent)).not.toBe("Password reset e-mail has been sent.");
    //     await page.close();
    // });
    
});
