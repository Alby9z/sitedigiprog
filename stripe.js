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

// Routes pour créer une intention de paiement
app.post("/create-payment-intent", async (req, res) => {
  const { amount, pack } = req.body;

  try {
    // Créer une intention de paiement avec Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur", // Devise en euros
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Route pour télécharger le fichier PDF en fonction du pack choisi
app.get("/download-pdf", (req, res) => {
  const { pack } = req.query;

  // Déterminer le chemin du fichier PDF en fonction du pack
  let filePath;
  switch (pack) {
    case "pack-autonome":
      filePath = path.join(__dirname, "pdfs", "pack_autonome.pdf");
      break;
    case "creation-personnalisee":
      filePath = path.join(__dirname, "pdfs", "creation_personnalisee.pdf");
      break;
    case "creation-complete":
      filePath = path.join(__dirname, "pdfs", "creation_complete.pdf");
      break;
    default:
      return res.status(404).send("Pack not found");
  }

  // Vérifier si le fichier existe
  if (fs.existsSync(filePath)) {
    // Envoyer le fichier PDF en réponse à la demande
    res.download(filePath);
  } else {
    res.status(404).send("File not found");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
