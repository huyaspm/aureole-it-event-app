const functions = require("firebase-functions");
const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");

const app = express();

app
  .use(cors({ origin: true }))
  .use(bodyParse.json())
  .use(bodyParse.urlencoded({ extended: false }));

const { register, user, checked, taken } = require("./handlers/users");

const {
  manager,
  create,
  scan,
  give,
  gift,
  lucky,
  email
} = require("./handlers/managers");

const {
  getGifts,
  getGift,
  getWishes,
  createGift,
  updateGift,
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
app.post("/manager/scan/email", email);

app.get("/gift/wishes", getWishes);
app.post("/gifts/", getGifts);
app.post("/gift/", getGift);
app.post("/gift/create", createGift);
app.post("/gift/update", updateGift);
app.post("/gift/update/given", updateGiven);
app.post("/gift/update/taken", updateTaken);

app.get("*", (_, res) => res.status(404).json({ error: "endpoint not found" }));

const api = functions
  .runWith({ memory: "2GB", timeoutSeconds: 30 })
  .region("asia-east2")
  .https.onRequest(app);

module.exports = { api };
