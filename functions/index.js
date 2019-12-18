const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true }));

const { register, user, checked, taken } = require("./handlers/users");

const {
  manager,
  create,
  scan,
  give,
  gift,
  lucky
} = require("./handlers/managers");

const {
  getGifts,
  getGift,
  createGift,
  updateGift,
  getGiftByName,
  updateGiven,
  updateTaken
} = require("./handlers/gifts");

app.post("/register", register);
app.post("/user", user);
app.post("/checked", checked);
app.post("/taken", taken);

app.post("/manager", manager);
app.post("/manager/create", create);
app.post("/manager/scan", scan);
app.post("/manager/give", give);
app.post("/manager/gift", gift);
app.post("/manager/lucky", lucky);

app.post("/gifts/", getGifts);
app.post("/gift/", getGift);
app.post("/gift/create", createGift);
app.post("/gift/update", updateGift);
app.post("/gift/name", getGiftByName);
app.post("/gift/update/given", updateGiven);
app.post("/gift/update/taken", updateTaken);

exports.api = functions.region("asia-east2").https.onRequest(app);
