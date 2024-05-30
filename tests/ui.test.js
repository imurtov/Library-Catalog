const { test, expect } = require("@playwright/test");
const appUrl = "http://localhost:3000";


test('Verify All Books link is visible', async( { page } ) =>
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

test('Verify Login button is visible', async( { page } ) =>
    {
        await page.goto(appUrl);
        await page.waitForSelector("nav.navbar");
        const loginLink = await page.$('a[href="/login"]');
        const isElementVisible = await loginLink.isVisible();
        expect(isElementVisible).toBe(true);
    });

test('Verify Register button is visible', async( { page } ) =>
    {
        await page.goto(appUrl);
        await page.waitForSelector("nav.navbar");
        const registerLink = await page.$('a[href="/register"]');
        const isElementVisible = await registerLink.isVisible();
        expect(isElementVisible).toBe(true);
    });

test('Verify Register link text', async( { page } ) =>
    {
        await page.goto(appUrl);
        await page.waitForSelector("nav.navbar");
        const registerLink = await page.$('a[href="/register"]');
        const registerLinkText = await registerLink.textContent();
        expect(registerLinkText).toEqual("Register");
    });

test('Verify user can login', async( { page } ) =>
    {
        await page.goto(appUrl);
        await page.waitForSelector("nav.navbar");
        
        const loginLink = await page.$('a[href="/login"]');
        
        await loginLink.click();

        await page.fill("#email", "peter@abv.bg");
        await page.fill("#password", "123456");

        const loginButton = await page.$('xpath=//*[@id="login-form"]/fieldset/input');
        await loginButton.click();

        const logoutButton = await page.$('#logoutBtn');
        const logoutButtonText = await logoutButton.textContent();

        expect(logoutButtonText).toEqual("Logout");
    });