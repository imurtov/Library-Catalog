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

test('Verify Invalid Login Details', async( {page} ) =>
{
    await page.goto(appUrl);
    //await page.waitForSelector('nav.navbar');

    await page.goto(appUrl + "/login");

    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toContain("All fields are required");
        
        await dialog.accept();
    });

    
    const loginButton = await page.$('xpath=//*[@id="login-form"]/fieldset/input');
    await loginButton.click();

    //await page.click('input[type="submit"]');

    await page.$('a[href="/login"]');
    expect(page.url()).toBe(appUrl + '/login');
})

test ('Verify Empty Email address and Filled Password', async({page}) =>
{
    await page.goto(appUrl);
    
    await page.goto(appUrl + "/login");

    await page.fill("#password", "123456");

    

    page.on('dialog', async dialog =>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');

        await dialog.accept();
    });

    await page.click('input[type="submit"]');

    await page.$('a[href="/login"]');
    expect(page.url()).toBe(appUrl + "/login");

});

test('Verify Filled Email and Empty Password', async({page}) => {
    await page.goto(appUrl);

    await page.goto(appUrl + "/login");

    await page.fill("#email", "peter@abv.bg");

    

    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toContain("All fields are required!");

        await dialog.accept();
    });

    await page.click('input[type="submit"]');

    await page.$('a[href="/login"]');
    expect(page.url()).toContain(appUrl + "/login");
});

test('Verify Register with Valid Data', async({page}) => {
    await page.goto(appUrl);
    await page.goto(appUrl + "/register");

    await page.fill("#email", "ivan2.outlook.com");
    await page.fill("#password", "123456");
    await page.fill("#repeat-pass", "123456");

    await page.click('input[type="submit"]');

    await page.goto(appUrl + '/catalog');
    expect(page.url()).toContain(appUrl + "/catalog");

    const logoutButton = await page.$('#logoutBtn');
    const logoutButtonText = await logoutButton.textContent();

    expect(logoutButtonText).toEqual("Logout");
});

test('Verify Registation with Empty Email Field', async ({ page }) =>
{
    await page.goto(appUrl);

    await page.goto (appUrl + "/register");

    await page.fill("#password", "123456");
    await page.fill("#repeat-pass", "123456");

    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toContain('All fields are required!');

        await dialog.accept();
    });

    

    await page.click('input[type="submit"]');

    await page.$('a[href="register"]');
    expect(page.url()).toBe(appUrl + '/register');
});

test('Verify Different Passwords on Registration', async({page}) => {
    await page.goto(appUrl + "/register");

    await page.fill("#email", "ivan.murtov@outlook.com");
    await page.fill("#password", "123456");
    await page.fill("#repeat-pass", "1234567");

    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toContain('Passwords don\'t match!');

        await dialog.accept();
    });

    await page.click('input[type="submit"]');

    await page.$('a[href="register"]');
    expect(page.url()).toBe(appUrl + "/register");
})

test('Add Book with Correct Data', async({page}) => {
    await page.goto(appUrl + "/login");

    await page.fill("#email", "peter@abv.bg");
    await page.fill("#password", "123456");


    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    await page.fill("#title", "Test Book");
    await page.fill("#description", "This is a test book description");
    await page.fill("#image", "https://example.com/book-imag.jpg");
    await page.selectOption("#type", "Fiction");

    await page.click('#create-form input[type="submit"]');

    await page.waitForURL(appUrl + "/catalog");

    expect(page.url()).toBe(appUrl + "/catalog");
})