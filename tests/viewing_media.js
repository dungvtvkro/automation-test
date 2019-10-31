/* globals gauge*/
"use strict";
const { closeBrowser, text, click, waitFor, $, scrollTo } = require('taiko');
const assert = require("assert");
const env = process.env.NODE_ENV || 'default';

afterSuite(async () => {
  await closeBrowser();
});

step("Viewing media", async () => {
  await waitFor(4000); // wait for covering frame to disappear
  await click('Marketplace');
  assert.ok(await text('Browse images').exists());
  await waitFor(2000); // Wait for new media is loaded
  await scrollTo($(".photo:last-child"));
  await waitFor(2000); // Wait for new media is loaded
  assert.ok((await $(".photo").get()).length, 34);
});