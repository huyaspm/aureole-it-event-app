const { firestore } = require("../utils/admin");
const bcrypt = require("bcryptjs");
const randomize = require("randomatic");
const jwt = require("jsonwebtoken");
const auth = require("../utils/auth");

const generate = manager => {
  return (token = jwt.sign(
    {
      username: manager.username,
      permission: {
        job: manager.permission.job,
        type: manager.permission.type
      }
    },
    "gau-gau, ang-ang",
    {
      expiresIn: "1d"
    }
  ));
};

exports.manager = async (req, res) => {
  firestore
    .collection("managers")
    .where("username", "==", req.body.username)
    .get()
    .then(data => {
      if (data.empty)
        return res.status(400).json({ handle: "manager not found" });
      else {
        data.forEach(doc => {
          bcrypt
            .compare(req.body.password, doc.data().password)
            .then(result => {
              if (result) {
                const token = generate(doc.data());
                return res.json({
                  usename: doc.data().username,
                  permission: doc.data().permission,
                  token: token
                });
              } else return res.status(400).json({ handle: "wrong password" });
            });
          return res.status(400).json({ handle: "wrong password" });
        });
      }
    })
    .catch(() =>
      res.status(500).json({ error: "something went wrong, try again" })
    );
};

exports.create = async (req, res) => {
  auth(req, res);
  if (req.body.username.trim() === "" || req.body.password.trim() === "")
    return res.status(500).json({ error: "input must not be empty" });
  const password = await bcrypt.hash(req.body.password, 12);
  const type = parseInt(req.body.permission);
  const permission = {
    type: type,
    job: type === 0 ? "root" : "staff"
  };
  const manager = {
    username: req.body.username,
    password: password,
    createdAt: new Date().toISOString(),
    permission: permission
  };
  firestore
    .collection("managers")
    .where("username", "==", manager.username)
    .get()
    .then(data => {
      if (data.empty) {
        firestore
          .collection("managers")
          .add(manager)
          .then(doc => {
            res.json({ message: `document ${doc.id} was created` });
          });
      } else
        return res.status(400).json({ handle: "username is already taken" });
    })
    .catch(() =>
      res.status(500).json({ error: "something went wrong, try again" })
    );
};

exports.scan = async (req, res) => {
  auth(req, res);
  firestore
    .collection("users")
    .where("checked.ticketCode", "==", req.body.ticketCode)
    .get()
    .then(data => {
      if (data.empty) {
        return res.status(400).json({ handle: "invalid ticket code" });
      } else {
        data.forEach(async doc => {
          if (doc.data().checked.checkedIn || doc.data().gifts.taken) {
            return res.status(401).json({ handle: "already checked" });
          } else {
            var luckyNumber = randomize("0", 3);
            var similar = false;
            while (!similar) {
              await firestore
                .collection("users")
                .where("gifts.luckyNumber", "==", luckyNumber)
                .get()
                .then(data => {
                  if (data.empty) similar = true;
                })
                .catch(() =>
                  res
                    .status(500)
                    .json({ error: "something went wrong, try again" })
                );
              if (!similar) luckyNumber = randomize("0", 3);
            }
            var user = doc.data();
            user.checked.checkedIn = true;
            user.checked.checkedAt = new Date().toISOString();
            user.gifts.luckyNumber = luckyNumber;
            firestore
              .collection("users")
              .doc(doc.id)
              .set(user)
              .catch(err => res.status(400).json(err));
            return res.json(user);
          }
        });
      }
    })
    .catch(() =>
      res.status(500).json({ error: "something went wrong, try again" })
    );
};

exports.give = async (req, res) => {
  auth(req, res);
  firestore
    .collection("users")
    .where("checked.ticketCode", "==", req.body.ticketCode)
    .get()
    .then(data => {
      if (data.empty) {
        return res.status(400).json({ handle: "user not found" });
      } else {
        data.forEach(async doc => {
          if (!doc.data().checked.checkedIn)
            return res.status(402).json({ handle: "not checked" });
          if (doc.data().gifts.taken) {
            return res.status(401).json({ handle: "was given" });
          } else {
            var user = doc.data();
            return res.json(user);
          }
        });
      }
    })
    .catch(() =>
      res.status(500).json({ error: "something went wrong, try again" })
    );
};

exports.gift = async (req, res) => {
  auth(req, res);
  firestore
    .collection("users")
    .where("uid", "==", req.body.uid)
    .get()
    .then(data => {
      if (data.empty) {
        return res.status(400).json({ handle: "user not found" });
      } else {
        data.forEach(async doc => {
          if (!doc.data().checked.checkedIn) {
            return res.status(401).json({ handle: "not checked" });
          } else {
            var user = doc.data();
            user.gifts.taken = true;
            user.gifts.takenAt = new Date().toISOString();
            firestore
              .collection("users")
              .doc(doc.id)
              .set(user);
            return res.json(user);
          }
        });
      }
    })
    .catch(() =>
      res.status(500).json({ error: "something went wrong, try again" })
    );
};

exports.lucky = async (req, res) => {
  auth(req, res);
  firestore
    .collection("users")
    .where("checked.checkedIn", "==", true)
    .get()
    .then(data => {
      var lucky = [];
      data.forEach(doc => {
        lucky.push(doc.data());
      });
      return res.json(lucky);
    })
    .catch(() =>
      res.status(500).json({ error: "something went wrong, try again" })
    );
};
