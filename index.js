const express = require("express");
const admin = require("firebase-admin");
const app = express();

// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json"); // Update the path
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();

// Endpoint to handle offerwall callbacks
app.get("/offerwallCallback", async (req, res) => {
  const { endUserId, currencyAmt } = req.query;

  // Check for required parameters
  if (!endUserId || !currencyAmt) {
    return res.status(400).send("Missing endUserId or currencyAmt");
  }

  res.status(200).send(`Received endUserId: ${endUserId}, currencyAmt: ${currencyAmt}`);

//   try {
//     // Update Firestore for the specific user
//     const userRef = firestore.collection("users").doc(endUserId);
//     await userRef.update({
//       userCoins: admin.firestore.FieldValue.increment(parseInt(currencyAmt)),
//     });

//     res.status(200).send("User coins updated successfully");
//   } catch (error) {
//     console.error("Error updating user coins:", error);
//     res.status(500).send("Failed to update user coins");
//   }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
