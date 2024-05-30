const { test, expect } = require("@playwright/test");
const appUrl = "http://localhost:3000";


test('Very All Books link is visible', async( { page } ) =>
    {
        //Open the application
        await page.goto(appUrl);

        //Locate page navbar 
        await page.waitForSelector("nav.navbar");
        
        //Get All Books link
        const allBooksLink = await page.$('section > a');
        
        //Check if Element is visible
        const isElementVisible = await allBooksLink.isVisible();

        //Verify if the element is visible
        expect(isElementVisible).toBe(true);
    });

test('Very Login button is visible', async( { page } ) =>
    {
        await page.goto(appUrl);
        await page.waitForSelector("nav.navbar");
        const loginLink = await page.$('a[href="/login"]');
        const isElementVisible = await loginLink.isVisible();
        expect(isElementVisible).toBe(true);
    });

test('Very Register button is visible', async( { page } ) =>
    {
        await page.goto(appUrl);
        await page.waitForSelector("nav.navbar");
        const registerLink = await page.$('a[href="/register"]');
        const isElementVisible = await registerLink.isVisible();
        expect(isElementVisible).toBe(true);
    });

test('Very Register link text', async( { page } ) =>
    {
        await page.goto(appUrl);
        await page.waitForSelector("nav.navbar");
        const registerLink = await page.$('a[href="/register"]');
        const registerLinkText = await registerLink.textContent();
        expect(registerLinkText).toEqual("Register");
    });