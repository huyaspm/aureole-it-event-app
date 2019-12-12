const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const { register, user, status, taken } = require("./handlers/users");
const { manager, create, scan, gift, lucky } = require("./handlers/managers");

app.post("/register", register);
app.post("/user", user);
app.post("/status", status);
app.post("/taken", taken);

app.post("/manager", manager);
app.post("/manager/create", create);
app.post("/manager/scan", scan);
app.post("/manager/gift", gift);
app.post("/manager/lucky", lucky);

exports.api = functions.region("asia-east2").https.onRequest(app);
