/* globals gauge*/
"use strict";
const { closeBrowser, text, click, attach, to, waitFor, $, write, clear, into, textBox, below, above } = require('taiko');
const assert = require("assert");
const env = process.env.NODE_ENV || 'default';

step("Upload image <image>", async (image) => {
    await waitFor(4000); // wait for covering frame to disappear
    await click('Upload');
    assert.ok(await text('Start adding photos').exists());
    await attach(image, to($(`.dz-hidden-input`)));

    await waitFor(4000); // wait for image upload
    assert.ok(await $(`.tag-item`).exists()); // successful call to Clarifai

    await click('Choose up to 3 Categories');
    await click('Aerial');

    const timestamp = Date.now().toString();
    const titleTextbox = textBox({ 'placeholder': 'Give this photo a name' });

    await clear(titleTextbox);
    await write(`Testing ${timestamp}`, into(titleTextbox));
    await write(`Testing ${timestamp}`, into(textBox({ name: 'description' })));

    await click($(`.pixerf-radio-btn`), below('Usage'));
    await click($(`.pixerf-radio-btn`), above('Small'));

    await click('Publish photo');
    await waitFor(2000);
    assert.ok(await text(`Testing ${timestamp}`, above('Reviewing')).exists());
});

step("Extract tags from image <image> with tags <tag1> and <tag2>", async (image, tag1, tag2) => {
    await waitFor(2000); // wait for covering frame to disappear
    await click('Upload');
    assert.ok(await text('Start adding photos').exists());
    await attach(image, to($(`.dz-hidden-input`)));

    await waitFor(4000); // wait for image upload
    assert.ok(await text(tag1, below('Keywords')).exists());
    assert.ok(await text(tag2, below('Keywords')).exists()); // successful tags extraction

    await click($(`.icon-icons_close`));
    await click('Yes');
});