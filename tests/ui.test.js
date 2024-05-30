const { test, expect } = require("@playwright/test");

test('Very All Books link is visible', async( { page } ) =>
    {
        //Open the application
        await page.goto("http://localhost:3000");

        //Locate page navbar 
        await page.waitForSelector("nav.navbar");
        
        //Get All Books link
        const allBooksLink = await page.$('section > a');
        
        //Check if Element is visible
        const isElementVisible = await allBooksLink.isVisible();

        //Verify if the element is visible
        expect(isElementVisible).toBe(true);
    });