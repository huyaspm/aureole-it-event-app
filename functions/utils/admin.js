const admin = require("firebase-admin");
const serviceAccount = require("../config/service-account.json");

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const firestore = admin.firestore();

module.exports = { admin, firestore };
