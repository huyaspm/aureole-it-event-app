const functions = require("firebase-functions");
const express = require("express");
const app = express();

const { register, user } = require("./handlers/users");

app.post("/register", register);
app.post("/user", user);

exports.api = functions.region("asia-northeast1").https.onRequest(app);
