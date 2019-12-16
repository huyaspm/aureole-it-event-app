const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true }));

const { register, user, checked, taken } = require("./handlers/users");
const { manager, create, scan, give, gift, lucky } = require("./handlers/managers");

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

exports.api = functions.region("asia-east2").https.onRequest(app);
