const { firestore } = require("../utils/admin");
const { validateRegister } = require("../utils/validate");
const randomize = require("randomatic");

exports.register = (req, res) => {
  const user = {
    uid: req.body.uid,
    email: req.body.email,
    fullName: req.body.fullName,
    phoneNumber: req.body.phoneNumber,
    checked: {
      ticketCode: randomize("Aa0", 10),
      checkedIn: false,
      checkedAt: ""
    },
    gift: {},
    createdAt: new Date().toISOString()
  };
  const { errors, invalid } = validateRegister(
    user.email,
    user.fullName,
    user.phoneNumber
  );
  if (invalid) return res.status(500).json(errors);
  firestore
    .collection("users")
    .where("email", "==", user.email)
    .get()
    .then(data => {
      if (data.empty) {
        firestore
          .collection("users")
          .add(user)
          .then(doc => {
            res.json({ message: `document ${doc.id} was created` });
          });
      } else
        return res.status(400).json({ handle: "email is already registered" });
    })
    .catch(() =>
      res.status(500).json({ error: "something went wrong, try again" })
    );
};

exports.user = (req, res) => {
  firestore
    .collection("users")
    .where("uid", "==", req.body.uid)
    .get()
    .then(data => {
      var user = {};
      data.forEach(doc => {
        user = {
          uid: req.body.uid,
          email: doc.data().email,
          fullName: doc.data().fullName,
          phoneNumber: doc.data().phoneNumber,
          checked: doc.data().checked,
          gift: doc.data().gift,
          createdAt: doc.data().createdAt
        };
      });
      return res.json(user);
    })
    .catch(() =>
      res.status(500).json({ error: "something went wrong, try again" })
    );
};
