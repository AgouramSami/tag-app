import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../styles/StatistiquesSatisfaction.css";
import axiosInstance from "../config/api";

const StatistiquesSatisfaction = () => {
  const [statistiques, setStatistiques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem("token");

        if (!token) {
          setError("Veuillez vous connecter pour accéder aux statistiques");
          return;
        }

        console.log("🔑 Token trouvé:", token.substring(0, 20) + "...");

        const response = await axiosInstance.get(
          "/demandes/stats/satisfaction",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("📊 Données reçues:", response.data);

        if (!response.data || response.data.length === 0) {
          setError("Aucune donnée de statistiques disponible");
          return;
        }

        setStatistiques(response.data);
        setError(null);
      } catch (error) {
        console.error("❌ Erreur:", error);
        if (error.response?.status === 401) {
          setError(
            "Accès non autorisé. Veuillez vous connecter avec un compte administrateur ou juriste."
          );
        } else {
          setError(
            error.response?.data?.message ||
              "Erreur lors de la récupération des statistiques"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="loading">Chargement des statistiques...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="stats-container">
      <h2 className="stats-title">
        Statistiques de satisfaction par strate de commune
      </h2>

      <div className="stats-grid">
        {statistiques.map((stat) => (
          <div key={stat.strate._id} className="stats-card">
            <h3 className="strate-title">{stat.strate.nom}</h3>
            <div className="stats-content">
              <div className="stats-item">
                <span className="stats-label">Total des demandes :</span>
                <span className="stats-value">{stat.totalDemandes}</span>
              </div>
              <div className="stats-item">
                <span className="stats-label">Note moyenne :</span>
                <span className="stats-value">
                  {stat.noteMoyenne.toFixed(1)} / 5
                </span>
              </div>
              <div className="stats-item">
                <span className="stats-label">Taux de satisfaction :</span>
                <span className="stats-value">
                  {(
                    ((stat.distribution[4] + stat.distribution[5]) /
                      stat.totalDemandes) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
              <div className="star-distribution">
                <h4>Distribution des notes :</h4>
                {[1, 2, 3, 4, 5].map((note) => (
                  <div key={note} className="star-row">
                    <span className="star-label">
                      {note} étoile{note > 1 ? "s" : ""} :
                    </span>
                    <span className="star-value">
                      {stat.distribution[note] || 0}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatistiquesSatisfaction;
