/* globals gauge*/
"use strict";
const { closeBrowser, text, click, $, waitFor } = require('taiko');
const assert = require("assert");
const env = process.env.NODE_ENV || 'default';

afterSuite(async () => {
  await closeBrowser();
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