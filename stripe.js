const express = require("express");
const Stripe = require("stripe");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const stripe = Stripe(
  "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"
);

// Middleware pour analyser le corps des requêtes en JSON
app.use(bodyParser.json());

// Servir les fichiers statiques depuis le répertoire 'public'
app.use(express.static(path.join(__dirname, "digiprogtech")));

// Route pour créer une intention de paiement
app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "€",
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Configurer le port d'écoute
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
