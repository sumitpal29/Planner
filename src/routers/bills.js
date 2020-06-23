// shared bills
const express = require("express");
const router = new express.Router();
const Bill = require("../db/models/bills");
const auth = require("../middleware/auth");

// add bill
router.post("/bills", auth, async (req, res) => {
  const datum = {
    ...req.body,
    owner: req.user._id,
  };

  const newBill = new Bill(datum);

  try {
    await newBill.save();
    res.status(201).send(newBill);
  } catch (e) {
    res.status(500).send(e);
  }
});
// update bill
router.patch("/bills/:id", auth, async (req, res) => {
  const allowedProps = ["header", "description", "amount", "currency"];
  const props = Object.keys(req.body);
  const isValidUpdate = props.every((prop) => allowedProps.includes(prop));

  if (!isValidUpdate)
    return res.status(400).send({
      error: "You are not allowed to update above properties",
    });

  try {
    const _id = req.params.id;
    const bill = await Bill.findOne({   
      _id,
      owner: req.user._id,
    });

    if (!bill)
      return res.status(404).send({
        message: "Bill not found!",
      });

    props.forEach((prop) => (bill[prop] = req.body[prop]));
    await bill.save().then((t) => res.status(200).send(t));
  } catch (e) {
    res.status(500).send(e);
  }
});
// delete bill
router.delete("/bills/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const bill = await Bill.findOneAndDelete({
      _id,
      owner: req.user._id,
    });

    if (!bill)
      return res.status(404).send({
        message: "Bill not found!",
      });

    res.status(200).send(bill);
  } catch (e) {
    res.status(500).send(e);
  }
});
// get bills - inbetween dates / specfic date / all bills
router.get("/bills", auth, async (req, res) => {
  const bills = await Bill.find({
    owner: req.user._id,
  });
  if (!bills)
    return res.status(404).send({
      message: "No bills found!",
    });
  res.status(200).send(bills);
});

module.exports = router

// create-at - last date
