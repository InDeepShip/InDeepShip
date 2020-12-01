import { randomString } from '../utility';
const puppeteer = require('puppeteer');
require("dotenv").config()

describe('Vessel name check', () => {
    let browser;
    beforeEach(async (done) => {
        browser = await puppeteer.launch({});
        done();
    })

    afterEach(async (done) => {
        await browser.close();
        done();
    })

    it('Can check if a name is available in a port', async () => {
        const page = await browser.newPage();
        await page.goto(`${process.env.REACT_APP_PRODUCTION_DEV_ADDRESS}/vesselNameLookup`)

        await page.type('#vessel-name-input', randomString());
        await page.click('#check-btn');
        await page.waitForFunction('document.querySelector("#check-result").innerText.length > 0');
        
        expect(await page.$eval('#check-result', e => e.textContent)).not.toBeNull();
        await page.close();
    });

    
});
