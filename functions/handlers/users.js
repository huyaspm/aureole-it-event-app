const { firestore } = require("../utils/admin");
const { validateRegister } = require("../utils/validate");
const randomize = require("randomatic");

exports.register = async (req, res) => {
  var ticketCode = "AIT-" + randomize("0", 5);
  var similar = false;
  while (!similar) {
    await firestore
      .collection("users")
      .where("checked.ticketCode", "==", ticketCode)
      .get()
      .then(data => {
        if (data.empty) similar = true;
      })
      .catch(() =>
        res.status(500).json({ error: "something went wrong, try again" })
      );
    if (!similar) ticketCode = "AIT-" + randomize("0", 5);
  }
  const user = {
    uid: req.body.uid,
    email: req.body.email,
    fullName: req.body.fullName,
    phoneNumber: req.body.phoneNumber,
    checked: {
      ticketCode: ticketCode,
      checkedIn: false,
      checkedAt: ""
    },
    gifts: {
      luckyNumber: "",
      set: "",
      taken: false,
      takenAt: ""
    },
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
            user.id = doc.id;
            res.json(user);
          })
          .catch(() =>
            res.status(500).json({ error: "something went wrong, try again" })
          );
      } else
        return res.status(401).json({ handle: "email is already registered" });
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
      if (!data.empty) {
        data.forEach(doc => {
          const user = {
            id: doc.id,
            uid: req.body.uid,
            email: doc.data().email,
            fullName: doc.data().fullName,
            phoneNumber: doc.data().phoneNumber,
            checked: doc.data().checked,
            gifts: doc.data().gifts,
            createdAt: doc.data().createdAt
          };
          return res.json(user);
        });
        return res.status(400).json({ handle: "user not found" });
      } else {
        return res.status(400).json({ handle: "user not found" });
      }
    })
    .catch(() =>
      res.status(500).json({ error: "something went wrong, try again" })
    );
};

exports.checked = (req, res) => {
  firestore
    .collection("users")
    .doc(req.body.id)
    .onSnapshot(
      doc => {
        if (doc.exists) {
          if (doc.data().checked.checkedIn) {
            const user = {
              id: doc.id,
              uid: doc.data().uid,
              email: doc.data().email,
              fullName: doc.data().fullName,
              phoneNumber: doc.data().phoneNumber,
              checked: doc.data().checked,
              gifts: doc.data().gifts,
              createdAt: doc.data().createdAt
            };
            return res.json(user);
          }
        } else {
          return res.status(400).json({ handle: "user not found" });
        }
      },
      err => {
        return res
          .status(500)
          .json({ error: "something went wrong, try again" });
      }
    );
};

exports.taken = (req, res) => {
  firestore
    .collection("users")
    .doc(req.body.id)
    .onSnapshot(
      doc => {
        if (doc.exists) {
          if (doc.data().gifts.taken) return res.json(doc.data());
        } else {
          return res.status(400).json({ handle: "user not found" });
        }
      },
      () => {
        return res
          .status(500)
          .json({ error: "something went wrong, try again" });
      }
    );
};
