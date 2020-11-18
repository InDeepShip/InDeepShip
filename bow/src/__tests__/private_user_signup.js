import * as addresses from '../constants/environment';
const puppeteer = require('puppeteer');

describe('Private user sign-up process', () => {
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

    it('can click private account options', async () => {
        let page = await browser.newPage();
        await page.goto(`${addresses.SERVER_ADDRESS}/signup/`);

        await page.click("#signup-option-private");
        await page.waitForSelector('#signup-form');

        expect(await page.$('#signup-form')).not.toBe('null');
        
    });
    

    test("can sign up a new private user", async () => {
        // Arrange: initialize code
        let page = await browser.newPage();
        await page.goto(`${addresses.SERVER_ADDRESS}/signup/`);
        const user = {name : "David", address : "1150 high street", email : " aa@aa.com", password1 : "11111111", password2 : "11111111"};
        

        // Act
        await page.click("#signup-option-private");

        await page.waitForSelector('#signup-form');
        await page.type('#name-selector', user.name);
        await page.type('#home-address-selector', user.address);
        await page.type('#email-selector', user.email);
        await page.type('#pwd1-selector', user.password1);
        await page.type('#pwd2-selector', user.password2);

        await page.click('#signup-submit-btn');
        
        // Assert
        
        
    });

    // test("Should not add the user to the store if it's not saved to the server", async () => {
        
    //     const user = {name : "David", address : "1150 high stree", email : " aa@aa.com", password1 : "11111111", password2 : "11111111", account : "broker"};
    //     fakeAxios.onPost("http://127.0.0.1:8000/api/users/signup/").reply(500);

    //     await tmpStore.dispatch(authSignup(user));

    //     expect(userSlice().user).toHaveLength(0);
    // });
    
});

