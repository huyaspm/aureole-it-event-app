const functions = require("firebase-functions");
const express = require("express");
const app = express();

const { register, user, status, taken } = require("./handlers/users");
const { manager, create, scan } = require("./handlers/managers");

app.post("/register", register);
app.post("/user", user);
app.post("/status", status);
app.post("/taken", taken);

app.post("/manager", manager);
app.post("/manager/create", create);
app.post("/manager/scan", scan);

exports.api = functions.region("asia-northeast1").https.onRequest(app);
