import * as addresses from '../constants/environment';
const puppeteer = require('puppeteer');

describe('user sign-up process', () => {
     let browser;

    beforeEach(async (done) => {
        browser = await puppeteer.launch({});
        done();
    });

    afterEach(async (done) => {
        await browser.close();
    });

    const userSlice = () => tmpStore.getState().auth;


    it('can click account options', async () => {
        let page = await browser.newPage();
        await page.goto(`${addresses.SERVER_ADDRESS}/signup/`);

        await page.click("#signup-option-private");

        await expect(page.$('#sign-up-form')).resolves.toBe('null');

    });
    

    // test("Should add the user to the store if it's saved to the server", async () => {
    //     // Arrange: initialize code
    //     let page = await browser.newPage();
    //     await page.goto("http://206.189.218.111/api/users/signup/");


    //     const user = {name : "David", address : "1150 high stree", email : " aa@aa.com", password1 : "11111111", password2 : "11111111", account : "broker"};
        

    //     // Act

    //     await tmpStore.dispatch(authSignup(user));

    //     // Assert
    //     console.log(tmpStore.getState());
    //     expect(userSlice().user).toContainEqual(savedUser);
    // });

    // test("Should not add the user to the store if it's not saved to the server", async () => {
        
    //     const user = {name : "David", address : "1150 high stree", email : " aa@aa.com", password1 : "11111111", password2 : "11111111", account : "broker"};
    //     fakeAxios.onPost("http://127.0.0.1:8000/api/users/signup/").reply(500);

    //     await tmpStore.dispatch(authSignup(user));

    //     expect(userSlice().user).toHaveLength(0);
    // });
    
});

