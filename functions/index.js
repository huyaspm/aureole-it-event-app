const functions = require("firebase-functions");
const express = require("express");
const app = express();

const { register, user } = require("./handlers/users");
const { manager, create } = require("./handlers/managers");

app.post("/register", register);
app.post("/user", user);

app.post('/manager', manager)
app.post('/manager/create', create)

exports.api = functions.region("asia-northeast1").https.onRequest(app);
