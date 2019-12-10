const { firestore } = require("../utils/admin");
const bcrypt = require("bcryptjs");

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
              if (result)
                return res.json({
                  usename: doc.data().username,
                  result: true
                });
              else return res.status(400).json({ handle: "wrong password" });
            });
        });
      }
    })
    .catch(() =>
      res.status(500).json({ error: "something went wrong, try again" })
    );
};

exports.create = async (req, res) => {
  if (req.body.username.trim() === "" || req.body.password.trim() === "")
    return res.status(500).json({ error: "imput must not be empty" });
  const password = await bcrypt.hash(req.body.password, 12);
  const manager = {
    username: req.body.username,
    password: password
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
