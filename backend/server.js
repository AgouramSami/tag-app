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

// Configuration CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

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
