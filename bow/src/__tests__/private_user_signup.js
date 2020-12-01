
import { randomUserGenerator } from '../utility';
const puppeteer = require('puppeteer');
require("dotenv").config()

describe('Private user sign-up process', () => {
    let browser;

    beforeEach(async (done) => {
        browser = await puppeteer.launch();
        done();
    });

    afterEach(async (done) => {
        await browser.close();
        done();
    });

    test('can click private account options', async () => {
        const page = await browser.newPage();
        
        await page.goto(`${process.env.REACT_APP_FRONTEND_PRODUCTION_ADDRESS}/signup`);
        await page.waitForSelector('#signup-option-private');
        await page.click("#signup-option-private");
        await page.waitForSelector('#signup-form');

        expect(await page.$('#signup-form')).not.toBeNull();
        await page.close();
    });

    test('cannot sign up a private use if input are invalid', async () => {
        const page = await browser.newPage();
        await page.goto(`${process.env.REACT_APP_FRONTEND_PRODUCTION_ADDRESS}/signup`);
        
        const user = { username: "David", address: "1150 high street", email: " aa@mail.com", pwd1: "11111111", pwd2: "11111111" };

        // Act
        await page.waitForSelector("#signup-option-private")
        await page.click("#signup-option-private");
        await page.waitForSelector('#signup-form');

        await page.type('#name-selector', user.username);
        await page.type('#home-address-selector', user.address);
        await page.type('#email-selector', user.email);
        await page.type('#pwd1-selector', user.pwd1);
        await page.type('#pwd2-selector', user.pwd2);
        await page.click('#signup-submit-btn', {delay: 1000});
        
        expect(await page.$('#landing-page-selector')).toBeNull();
        await page.close();
    });

    test("can sign up a new private user if input are valid", async () => {
        // Arrange: initialize code
        const page = await browser.newPage();
        await page.goto(`${process.env.REACT_APP_FRONTEND_PRODUCTION_ADDRESS}/signup`);
        const user = randomUserGenerator();

        //const user = { username: "Chris", address: "1150 high street", email: " chris@mail.com", pwd1: "chrischris", pwd2: "chrischris"};
        // Act
        await page.waitForSelector("#signup-option-private")
        await page.click("#signup-option-private");
        await page.waitForSelector('#signup-form');

        await page.type('#name-selector', user.username);
        await page.type('#home-address-selector', user.address);
        await page.type('#email-selector', user.email);
        await page.type('#pwd1-selector', user.pwd1);
        await page.type('#pwd2-selector', user.pwd2);

        const [response] = await Promise.all([
            page.waitForNavigation(), 
            page.click('#signup-submit-btn', {delay: 1000})
          ]);

        expect(await page.$('#landing-page-selector')).not.toBeNull();
        await page.close();
    });

});

