const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const communeRoutes = require("./routes/communesRoutes");
const fonctionRoutes = require("./routes/fonctionsRoutes");
const demandeRoutes = require("./routes/demandesRoutes");
const strateRoutes = require("./routes/stratesRoutes");
const app = express();
const themeRoutes = require("./routes/themeRoutes");
const path = require("path");
const faqRoutes = require("./routes/faqRoutes"); // Ajout des routes FAQ

app.use(express.json());

// Middleware CORS personnalisé
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://tag-app-five.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes API
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/communes", communeRoutes);
app.use("/api/fonctions", fonctionRoutes);
app.use("/api/themes", themeRoutes);
app.use("/api/demandes", demandeRoutes);
app.use("/api/strates", strateRoutes);
app.use("/api/faqs", faqRoutes);

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connecté à MongoDB"))
  .catch((err) => console.error("Erreur de connexion à MongoDB:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));
