/* globals gauge*/
"use strict";
const { closeBrowser, text, waitFor, write, clear, into, textBox, press } = require('taiko');
const assert = require("assert");
const env = process.env.NODE_ENV || 'default';

afterSuite(async () => {
  await closeBrowser();
});

step("Comment on media", async () => {
  const timestamp = Date.now().toString();
  const commentTextbox = textBox({ 'placeholder': 'Add a comment' });

  await clear(commentTextbox);
  await write(`Testing comment ${timestamp}`, into(commentTextbox));

  await press('Enter')
  await waitFor(2000);
  assert.ok(await text(`Testing comment ${timestamp}`).exists());
});