/* globals gauge*/
"use strict";
const { closeBrowser, text, click, waitFor, $, scrollTo, write, clear, into, textBox, press } = require('taiko');
const assert = require("assert");
const env = process.env.NODE_ENV || 'default';

step("Viewing media", async () => {
  await waitFor(4000); // wait for covering frame to disappear
  await click('Marketplace');
  assert.ok(await text('Browse images').exists());
  await waitFor(2000); // Wait for new media is loaded
  await scrollTo($(".photo:last-child"));
  await waitFor(2000); // Wait for new media is loaded
  assert.ok((await $(".photo").get()).length, 34);
});

step("Like/Unlike media", async () => {
  await click($(`.photo:last-child`));
  const is_liked = await text("class", `.photo:last-child .photo__tools .btn-like--liked`).exists()
  assert.ok(await text('Photo Details').exists());
  await click($(".photo-detail__photo-info__top-info .icon-icons_like"));

  if (is_liked) {
    assert.ok(!text("class", ".photo-detail__photo-info__top-info .btn-like--liked").exists());
  }
  else {
    assert.ok(text("class", ".photo-detail__photo-info__top-info .btn-like--liked").exists());
  }
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

step("Star/Remove star media", async () => {
  const is_stared = await text("class", `.photo-detail__main-content__photo-thumbnail .photo__tools .star-btn--stared`).exists()
  await click($(".photo-detail__main-content__photo-thumbnail .star-btn"));

  if (is_stared) {
    assert.ok(!text("class", ".photo-detail__main-content__photo-thumbnail .photo__tools .star-btn--stared").exists());
  }
  else {
    assert.ok(text("class", ".photo-detail__main-content__photo-thumbnail .photo__tools .star-btn--stared").exists());
  }

  await click($(".photo-detail-popup__close-btn"));
});