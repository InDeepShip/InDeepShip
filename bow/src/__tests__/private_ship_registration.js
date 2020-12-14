import { randomString, registeredUserGenerator } from '../utility';
const puppeteer = require('puppeteer');
require("dotenv").config()


describe('Private ship registration', () => {
    let browser;
    let page;
    beforeEach(async (done) => {
        browser = await puppeteer.launch({});
        page = await browser.newPage();
        await page.setViewport({
            width: 1000,
            height: 1200,
            deviceScaleFactor: 1,
          });
        done();
    });

    afterEach(async (done) => {
        await page.close();
        await browser.close();
        done();
    });

    test('private user can be directed to login page from the landing page', async () => {
        
        await page.goto(`${process.env.REACT_APP_FRONTEND_DEV_ADDRESS}`);

        await page.waitForSelector("#private-registration-link");
        await Promise.all([
            page.waitForNavigation(),
            page.click("#private-registration-link"),
        ]);

        await page.waitForSelector("#register-btn");
        await Promise.all([
            page.waitForNavigation(),
            page.click("#register-btn"),
        ]);

        expect(await page.$("#login-form")).not.toBeNull();
        

    });
    
    test('private user can login and be redirected to registration form', async () => {
        
        await page.goto(`${process.env.REACT_APP_FRONTEND_DEV_ADDRESS}`);
        const registeredUser = registeredUserGenerator();

        // Act
        await page.waitForSelector("#private-registration-link");
        await Promise.all([
            page.waitForNavigation(),
            page.click("#private-registration-link"),
        ]);

        await page.waitForSelector("#register-btn");
        await Promise.all([
            page.waitForNavigation(),
            page.click("#register-btn"),
        ]);
        
        await page.waitForSelector('#login-form');
        await page.type('#email-selector', registeredUser.email);
        await page.type('#pwd-selector', registeredUser.password);

        await Promise.all([
            page.waitForNavigation(),
            page.click('#login-submit-btn', {delay: 1000})
        ]);
        expect(await page.$('#stepsDemo')).not.toBeNull();
        
    });
    
    test('private user can login and then complete a ship registration', async () => {

        await page.goto(`${process.env.REACT_APP_FRONTEND_DEV_ADDRESS}`);
        const registeredUser = registeredUserGenerator();

        // Act
        await page.waitForSelector("#private-registration-link");
        await Promise.all([
            page.waitForNavigation(),
            page.click("#private-registration-link"),
        ]);

        await page.waitForSelector("#register-btn");
        await Promise.all([
            page.waitForNavigation(),
            page.click("#register-btn"),
        ]);
        
        await page.waitForSelector('#login-form');
        await page.type('#email-selector', registeredUser.email);
        await page.type('#pwd-selector', registeredUser.password);

        await Promise.all([
            page.waitForNavigation(),
            page.click('#login-submit-btn', {delay: 1000})
        ]);

        await page.waitForSelector("#stepsDemo");

        /* Start to fill in forms step by step */
        // step 1
        await page.waitForSelector("#vessel-name-input");
        await page.type("#vessel-name-input", randomString(8), {delay:100});
        await page.waitForTimeout(1000);
        await page.type('input[name="imo"]', Math.random().toString(10).substr(2,7), {delay:100});
        await page.type('input[name="tonnage"]', "20");
        await page.type("#regdate", "03122020", {delay:100});
        await page.type('input[name="vessel_length"]', "15");
        await page.type('input[name="hulls"]', "4");

        await page.waitForSelector("#next-btn");
        await page.click("#next-btn");

        // step 2
        await page.type('input[name="phone"]', "1-832-888-7777", {delay:100});
        await page.click("#next-btn");
        
        // step 3
        await page.type('input[name="builder_name"]', "ShipX");
        await page.type('input[name="builder_address"]', "1000 Seabright Street", {delay:100});
        await page.type('input[name="yard_number"]', "100");
        await page.click("#next-btn");

        // step 4
        await page.waitForSelector("#checkbox-input");
        const checkbox = await page.$('#checkbox-input')
        await checkbox.click();
        await page.waitForTimeout(1000);
        
        const [response] = await Promise.all([
            page.waitForNavigation(),
            page.click('#checkout-btn', {delay: 500})
        ]);
        if (!response) {
            console.log("Failed to redirect to stripe checkout");
        }

        // step 5 - stripe
        await page.waitForSelector("#email");
        await page.type("#email", registeredUser.email, {delay: 50});
        await page.type("#cardNumber", "4242 4242 4242 4242", {delay: 100});
        await page.type("#cardExpiry", "1223");
        await page.type("#cardCvc", "333");
        await page.type("#billingName", registeredUser.username);
        await page.type("#billingPostalCode", "95060", {delay: 50});

        console.log("SO FAR SO GOOD!");

        await page.waitForFunction('document.querySelector("button.SubmitButton.SubmitButton--complete") != null');
        const [res] = await Promise.all([
            page.waitForNavigation(),         
            page.click('button.SubmitButton.SubmitButton--complete', {delay: 4000}),
        ]);

        if (!res) {
            console.log("Failed to redirect back to dashboard");
        }
        
        // Assert
        expect(await page.$('#private-dashboard-selector')).not.toBeNull();
        await page.waitForTimeout(4000);
          
    });
    
});
