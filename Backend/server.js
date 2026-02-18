const express = require("express");
const Razorpay = require("razorpay");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
  key_id: "RAZORPAY_KEY_ID",
  key_secret: "RAZORPAY_KEY_SECRET"
});

// CREATE ORDER
app.post("/create-order", (req, res) => {
  const { amount } = req.body;

  razorpay.orders.create({
    amount: amount * 100,
    currency: "INR"
  }, (err, order) => {
    if (err) return res.status(500).send(err);
    res.send(order);
  });
});

// SAVE ORDER
app.post("/save-order", (req, res) => {
  const orders = JSON.parse(fs.readFileSync("orders.json"));
  const order = {
    id: uuidv4(),
    ...req.body,
    status: "Processing"
  };
  orders.push(order);
  fs.writeFileSync("orders.json", JSON.stringify(orders, null, 2));
  res.send({ success: true, orderId: order.id });
});

// TRACK ORDER
app.get("/track/:id", (req, res) => {
  const orders = JSON.parse(fs.readFileSync("orders.json"));
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).send("Not found");
  res.send(order);
});

// ADMIN LOGIN
app.post("/admin-login", (req, res) => {
  const admin = JSON.parse(fs.readFileSync("admin.json"));
  if (
    req.body.username === admin.username &&
    req.body.password === admin.password
  ) res.send({ success: true });
  else res.status(401).send("Invalid");
});

// ADMIN ORDERS
app.get("/admin-orders", (req, res) => {
  const orders = JSON.parse(fs.readFileSync("orders.json"));
  res.send(orders);
});

app.listen(5000, () =>
  console.log("Backend running on http://localhost:5000")
);
