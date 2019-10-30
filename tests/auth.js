/* globals gauge*/
"use strict";
const { openBrowser, closeBrowser, goto, text, click, into, write, textBox, button, image, waitFor, $} = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';
const config = require('../env/config.json');
const env = process.env.NODE_ENV || 'development';

beforeSuite(async () => {
    await openBrowser({ headless: headless })
});

afterSuite(async () => {
    await closeBrowser();
});

step("Log in as <user_type>", async (user_type) => {
    const login_email = user_type == "personal" ? config[env]["personal_user_email"] : config[env]["business_user_email"];
    const login_password = user_type == "personal" ? config[env]["personal_user_password"] : config[env]["business_user_password"];

    await goto(config[env]["site"]);
    await click('Log in');
    await write(login_email, into(textBox({ name: 'email' })));
    await write(login_password, into(textBox({ name: 'password' })));
    await click(button('Log in'));
    assert.ok(await $(`.icon-icons_camera`).exists());
});

step("Log out", async () => {
    await waitFor(3000); // wait for covering frame to disappear
    await click(image({class:'pull-left ng-isolate-scope'}));
    await click('Logout');
    assert.ok(await text('Log in').exists());
});
