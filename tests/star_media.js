/* globals gauge*/
"use strict";
const { closeBrowser, text, click, $, waitFor } = require('taiko');
const assert = require("assert");
const env = process.env.NODE_ENV || 'default';

afterSuite(async () => {
  await closeBrowser();
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