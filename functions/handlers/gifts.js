const { firestore } = require("../utils/admin");
const auth = require("../utils/auth");

exports.createGift = async (req, res) => {
  const gift = {
    uid: req.body.uid,
    phoneNumber: req.body.phoneNumber,
    fullName: req.body.fullName,
    description: req.body.description,
    exchange: {
      givenTo: {
        fullName: "",
        uid: ""
      },
      takenFrom: {
        fullName: "",
        uid: ""
      }
    },
    createdAt: new Date().toISOString()
  };
  if (gift.fullName === "") {
    res.status(401).json({ error: "invalid input" });
  } else {
    firestore
      .collection("gifts")
      .add(gift)
      .then(doc => {
        gift.id = doc.id;
        res.json(gift);
      })
      .catch(() =>
        res.status(500).json({ error: "something went wrong, try again" })
      );
  }
};

exports.updateGift = async (req, res) => {
  const gift = {
    fullName: req.body.fullName,
    description: req.body.description,
    updatedAt: new Date().toISOString()
  };
  if (gift.fullName === "") {
    res.status(401).json({ error: "invalid input" });
  } else {
    firestore
      .collection("gifts")
      .doc(req.body.id)
      .update(gift)
      .then(doc => {
        firestore
          .collection("gifts")
          .doc(req.body.id)
          .get()
          .then(doc => {
            const gift = doc.data();
            gift.id = doc.id;
            res.json(gift);
          });
      })
      .catch(() =>
        res.status(500).json({ error: "something went wrong, try again" })
      );
  }
};

exports.getGift = (req, res) => {
  firestore
    .collection("gifts")
    .get()
    .then(data => {
      if (data.empty) res.status(400).json({ error: "gift is empty" });
      else {
        data.forEach(doc => {
          if (doc.data().uid === req.body.uid) {
            const gift = doc.data();
            gift.id = doc.id;
            return res.json(gift);
          }
        });
      }
    })
    .catch(() =>
      res.status(500).json({ error: "something went wrong, try again" })
    );
};

exports.getGiftByName = (req, res) => {
  auth(req, res);
  firestore
    .collection("gifts")
    .get()
    .then(data => {
      if (data.empty) res.status(400).json({ error: "gift is empty" });
      else {
        data.forEach(doc => {
          if (doc.data().fullName === req.body.fullName) {
            const gift = doc.data();
            gift.id = doc.id;
            return res.json(gift);
          }
        });
      }
    })
    .catch(() =>
      res.status(500).json({ error: "something went wrong, try again" })
    );
};

exports.getGifts = (req, res) => {
  auth(req, res);
  const gifts = [];
  firestore
    .collection("gifts")
    .get()
    .then(data => {
      if (data.empty) res.status(400).json({ error: "gift is empty" });
      else {
        data.forEach(doc => {
          const gift = doc.data();
          gift.id = doc.id;
          gifts.push(gift);
        });
        return res.json(gifts);
      }
    })
    .catch(() =>
      res.status(500).json({ error: "something went wrong, try again" })
    );
};

exports.updateGiven = (req, res) => {
  firestore
    .collection("gifts")
    .doc(req.body.id)
    .get()
    .then(doc => {
      const gift = doc.data();
      gift.exchange.givenTo.fullName = req.body.fullName;
      gift.exchange.givenTo.uid = req.body.uid;
      gift.updatedAt = new Date().toISOString();
      firestore
        .collection("gifts")
        .doc(req.body.id)
        .update(gift);
      return res.json(gift);
    })
    .catch(() =>
      res.status(500).json({ error: "something went wrong, try again" })
    );
};

exports.updateTaken = (req, res) => {
  firestore
    .collection("gifts")
    .doc(req.body.id)
    .get()
    .then(doc => {
      const gift = doc.data();
      gift.exchange.takenFrom.fullName = req.body.fullName;
      gift.exchange.takenFrom.uid = req.body.uid;
      gift.updatedAt = new Date().toISOString();
      firestore
        .collection("gifts")
        .doc(req.body.id)
        .update(gift);
      return res.json(gift);
    })
    .catch(() =>
      res.status(500).json({ error: "something went wrong, try again" })
    );
};
