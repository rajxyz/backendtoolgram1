const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const fs = require("fs");
const cors = require("cors");

// Initialize Firebase Admin
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Debug route
app.get("/", (req, res) => {
  res.send("✅ Backend is running fine!");
});

// Sample webhook endpoint
app.post("/webhook", (req, res) => {
  console.log("📩 Webhook received:", req.body);

  // Sample: log customer ID
  if (req.body && req.body.data && req.body.data.object) {
    const eventData = req.body.data.object;
    console.log("👉 Event Data:", eventData);
  }

  res.status(200).send("Webhook processed.");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
