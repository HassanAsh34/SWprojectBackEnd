const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require("./credentials.json");

initializeApp({
  credential: cert(serviceAccount)
  // projectId: 'swproject-bc133' // Ensure this matches your Firebase project ID
});

const db = getFirestore();

module.exports = { db };
