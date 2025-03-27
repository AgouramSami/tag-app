import React, { useState } from "react";
import PropTypes from "prop-types";
import CloturerDemande from "./CloturerDemande";
import "../styles/ConsulterDemande.css";
import axiosInstance from "../config/api";

const API_URL = "http://localhost:5000"; // URL du backend

const ConsulterDemande = ({ demande, onSubmit, onRetour }) => {
  const [reponse, setReponse] = useState("");
  const [fichier, setFichier] = useState(null);
  const [erreurFichier, setErreurFichier] = useState("");
  const [showCloturer, setShowCloturer] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("texte", reponse);
      if (fichier) {
        formData.append("fichiers", fichier);
      }

      const response = await axiosInstance.post(
        `/demandes/${demande._id}/message`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onSubmit(response.data);
    } catch (error) {
      console.error("❌ Erreur:", error);
      alert("Une erreur est survenue lors de l'envoi de la réponse");
    }
  };

  const handleCloturer = async (note) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axiosInstance.put(
        `/demandes/${demande._id}/cloturer`,
        { note },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Demande clôturée avec succès:", response.data);
      onRetour(); // Retour à la liste des demandes
    } catch (error) {
      console.error("❌ Erreur lors de la clôture:", error);
      alert("Une erreur est survenue lors de la clôture de la demande");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Vérifier la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErreurFichier("Le fichier ne doit pas dépasser 5MB");
        e.target.value = null;
        return;
      }

      // Vérifier le type de fichier
      const typesAutorises = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
      ];
      if (!typesAutorises.includes(file.type)) {
        setErreurFichier(
          "Format de fichier non autorisé. Formats acceptés : PDF, JPEG, JPG, PNG"
        );
        e.target.value = null;
        return;
      }

      setFichier(file);
      setErreurFichier("");
    }
  };

  // Fonction pour formater le nom du fichier
  const formatFileName = (filePath) => {
    return filePath.split("/").pop();
  };

  return (
    <div className="consulter-demande-container">
      <div className="breadcrumb">
        <button onClick={onRetour} className="btn-retour">
          <i className="fas fa-arrow-left"></i> Retour
        </button>
      </div>

      <div className="demande-header">
        <div className="demande-status">
          <span className={`status-badge ${demande.statut.toLowerCase()}`}>
            {demande.statut}
          </span>
          <span className="demande-date">
            {new Date(demande.dateCreation).toLocaleDateString()}
          </span>
          <span className="demande-number">#{demande._id.slice(-5)}</span>
        </div>
      </div>

      <div className="demande-content">
        <div className="demande-content-top">
          <div className="demande-detail-info">
            <h2>Informations générales</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Thème</label>
                <span>{demande.theme}</span>
              </div>
              <div className="info-item">
                <label>Commune</label>
                <span>{demande.commune}</span>
              </div>
              <div className="info-item">
                <label>Demandeur</label>
                <span>
                  {demande.utilisateur.nom} {demande.utilisateur.prenom}
                </span>
              </div>
            </div>
          </div>

          <div className="demande-detail-objet">
            <h2>Objet de ma demande</h2>
            <p>{demande.objet}</p>
          </div>

          <div className="demande-detail-description">
            <h2>Ma demande</h2>
            <p>{demande.description}</p>
          </div>

          {demande.fichiers && demande.fichiers.length > 0 && (
            <div className="demande-detail-fichiers">
              <h2>Mes pièces jointes</h2>
              <ul>
                {demande.fichiers.map((fichier, index) => (
                  <li key={index}>
                    <a
                      href={`${API_URL}/${fichier}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {formatFileName(fichier)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="messages-section">
          <h2>Historique des échanges</h2>
          <div className="messages-list">
            {demande.messages &&
              demande.messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${
                    message.type === "reponse" ? "message-reponse" : ""
                  }`}
                >
                  <div className="message-header">
                    <span className="message-author">
                      {message.auteur.nom} {message.auteur.prenom}
                    </span>
                    <span className="message-date">
                      {new Date(message.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="message-content">
                    <p>{message.texte}</p>
                    {message.piecesJointes &&
                      message.piecesJointes.length > 0 && (
                        <ul className="message-fichiers">
                          {message.piecesJointes.map((fichier, idx) => (
                            <li key={idx}>
                              <a
                                href={`${API_URL}/${fichier}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {formatFileName(fichier)}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {demande.statut !== "clôturé" && (
          <div className="reponse-section">
            <h2>Répondre à la demande</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="reponse">Votre réponse</label>
                <textarea
                  id="reponse"
                  value={reponse}
                  onChange={(e) => setReponse(e.target.value)}
                  placeholder="Écrivez votre réponse ici..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="fichier">Pièce jointe (optionnelle)</label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="fichier"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <label htmlFor="fichier" className="file-label">
                    <i className="fas fa-upload"></i>
                    Choisir un fichier
                  </label>
                </div>
                {erreurFichier && <p className="file-error">{erreurFichier}</p>}
                <p className="file-info">
                  Formats acceptés : PDF, JPEG, JPG, PNG (max 5MB)
                </p>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={onRetour}
                  className="btn-annuler"
                >
                  Annuler
                </button>
                <button type="submit" className="btn-envoyer">
                  Envoyer la réponse
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Afficher le formulaire de clôture si la demande est en statut "répondu" */}
        {demande.statut === "répondu" && !showCloturer && (
          <button
            className="btn-cloturer"
            onClick={() => setShowCloturer(true)}
          >
            Clôturer la demande
          </button>
        )}

        {showCloturer && (
          <CloturerDemande
            demande={demande}
            onSubmit={handleCloturer}
            onCancel={() => setShowCloturer(false)}
          />
        )}
      </div>
    </div>
  );
};

ConsulterDemande.propTypes = {
  demande: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    objet: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    commune: PropTypes.string.isRequired,
    statut: PropTypes.string.isRequired,
    dateCreation: PropTypes.string.isRequired,
    fichiers: PropTypes.arrayOf(PropTypes.string),
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        auteur: PropTypes.shape({
          nom: PropTypes.string.isRequired,
          prenom: PropTypes.string.isRequired,
        }).isRequired,
        texte: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        piecesJointes: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    utilisateur: PropTypes.shape({
      nom: PropTypes.string.isRequired,
      prenom: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onRetour: PropTypes.func.isRequired,
};

export default ConsulterDemande;
