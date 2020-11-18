
const puppeteer = require('puppeteer');
require("dotenv").config()

describe('Private user sign-up process', () => {
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

    test('can click private account options', async () => {
        let page = await browser.newPage();
        
        await page.goto(`${process.env.REACT_APP_FRONTEND_DEV_ADDRESS}/signup`);
        // await page.goto("http://206.189.218.111/signup/");
        await page.click("#signup-option-private");
        await page.waitForSelector('#signup-form');

        expect(await page.$('#signup-form')).not.toBe('null');

    });

    test('cannot sign up a private use if input are invalid', async () => {
        let page = await browser.newPage();
        await page.goto(`${process.env.REACT_APP_FRONTEND_DEV_ADDRESS}/signup`);
        
        const user = { name: "David", address: "1150 high street", email: " aa@aa.com", password1: "11111111", password2: "11111111" };


        // Act
        await page.click("#signup-option-private");
        await page.waitForSelector('#signup-form');

        await page.type('#name-selector', user.name);
        await page.type('#home-address-selector', user.address);
        await page.type('#email-selector', user.email);
        await page.type('#pwd1-selector', user.password1);
        await page.type('#pwd2-selector', user.password2);
        await Promise.all([
            page.waitForNavigation(), 
            page.click('#signup-submit-btn', {delay: 1000})
          ]);

        expect(await page.$('#landing-page-selector')).toBe('null');
        
    });

    test("can sign up a new private user if input are valid", async () => {
        // Arrange: initialize code
        let page = await browser.newPage();
        await page.goto(`${process.env.REACT_APP_FRONTEND_DEV_ADDRESS}/signup`);
        
        // await page.goto("http://206.189.218.111/signup/");
        const user = { name: "David", address: "1150 high street", email: "david@gmail.com", password1: "daviddavid", password2: "daviddavid" };


        // Act
        await page.click("#signup-option-private");
        await page.waitForSelector('#signup-form');

        await page.type('#name-selector', user.name);
        await page.type('#home-address-selector', user.address);
        await page.type('#email-selector', user.email);
        await page.type('#pwd1-selector', user.password1);
        await page.type('#pwd2-selector', user.password2);

        const [response] = await Promise.all([
            page.waitForNavigation(), 
            page.click('#signup-submit-btn', {delay: 1000})
          ]);

        expect(await page.$('#landing-page-selector')).not.toBe('null');

    });

});

