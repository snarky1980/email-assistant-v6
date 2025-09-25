/**
 * EmailPreview - Composant de prévisualisation de l'email généré
 *
 * Ce composant affiche l'email final généré avec une mise en forme
 * professionnelle et des options pour copier ou modifier le contenu.
 *
 * Props:
 * - generatedEmail: string - Le contenu de l'email généré
 * - formData: Object - Les données du formulaire utilisées
 * - onCopyToClipboard: Function - Callback pour copier l'email
 * - onBackToForm: Function - Callback pour retourner au formulaire
 *
 * @author Bureau de la traduction
 */

import React, { useState } from "react";

const EmailPreview = ({
  generatedEmail,
  formData,
  onCopyToClipboard,
  onBackToForm,
}) => {
  // État pour indiquer si l'email a été copié
  const [isCopied, setIsCopied] = useState(false);

  // État pour l'édition en ligne
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(generatedEmail);

  /**
   * Gestionnaire pour la copie dans le presse-papiers
   */
  const handleCopy = async () => {
    try {
      await onCopyToClipboard();
      setIsCopied(true);
      // Réinitialiser l'état après 3 secondes
      setTimeout(() => setIsCopied(false), 3000);
    } catch (error) {
      console.error("Erreur lors de la copie:", error);
    }
  };

  /**
   * Gestionnaire pour l'édition du contenu
   */
  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(generatedEmail);
  };

  /**
   * Sauvegarde les modifications
   */
  const handleSaveEdit = () => {
    setIsEditing(false);
    // Ici on pourrait mettre à jour l'email généré si nécessaire
  };

  /**
   * Annule l'édition
   */
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(generatedEmail);
  };

  /**
   * Formate le contenu de l'email pour l'affichage
   * @param {string} content - Le contenu brut de l'email
   * @returns {JSX.Element} Le contenu formaté
   */
  const formatEmailContent = (content) => {
    if (!content) return null;

    return content.split("\n").map((line, index) => {
      // Ligne vide
      if (line.trim() === "") {
        return <br key={index} />;
      }

      // Ligne de signature (commence par "Cordialement" ou contient "Bureau de la traduction")
      if (
        line.includes("Cordialement") ||
        line.includes("Bureau de la traduction")
      ) {
        return (
          <p key={index} className="font-bold" style={{ color: 'var(--tb-navy)' }}>
            {line}
          </p>
        );
      }

      // Ligne d'alerte (contient des emojis d'alerte)
      if (line.includes("⚠️") || line.includes("🔴")) {
        return (
          <p
            key={index}
            className="text-red-600 font-semibold bg-red-50 px-2 py-1 rounded"
          >
            {line}
          </p>
        );
      }

      // Ligne normale
      return (
        <p key={index} className="leading-relaxed" style={{ color: 'var(--tb-navy)' }}>
          {line}
        </p>
      );
    });
  };

  /**
   * Génère les métadonnées de l'email pour l'affichage
   */
  const getEmailMetadata = () => {
    const wordCount = generatedEmail.split(/\s+/).length;
    const charCount = generatedEmail.length;
    const estimatedReadTime = Math.ceil(wordCount / 200); // 200 mots par minute

    return {
      wordCount,
      charCount,
      estimatedReadTime,
      language: formData.language === "fr" ? "Français" : "English",
      urgency:
        {
          low: "Faible",
          normal: "Normal",
          high: "Élevé",
        }[formData.urgency] || "Normal",
    };
  };

  const metadata = getEmailMetadata();

  if (!generatedEmail) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 border-2" style={{ borderColor: 'var(--tb-mint)' }}>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📧</div>
          <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--tb-navy)' }}>
            Aucun email généré
          </h3>
          <p className="mb-4" style={{ color: 'var(--tb-teal)' }}>
            Remplissez le formulaire et cliquez sur "Générer l'email" pour voir
            la prévisualisation.
          </p>
          <button
            onClick={onBackToForm}
            className="px-6 py-3 text-white font-bold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
            style={{
              backgroundColor: 'var(--tb-teal)',
              boxShadow: '0 4px 12px rgba(8, 145, 178, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'var(--tb-navy)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'var(--tb-teal)';
            }}
          >
            ← Retour au formulaire
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border-2" style={{ borderColor: 'var(--tb-mint)' }}>
      {/* En-tête de la prévisualisation avec couleurs Bureau de la traduction */}
      <div className="px-6 py-4" style={{ backgroundColor: 'var(--tb-lime)', color: 'var(--tb-navy)' }}>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--tb-navy)' }}>
              👁️ Prévisualisation de l'email
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--tb-navy)' }}>
              Vérifiez le contenu avant de l'utiliser
            </p>
          </div>
          <button
            onClick={onBackToForm}
            className="px-4 py-2 text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105 border-2"
            style={{
              color: 'var(--tb-navy)',
              backgroundColor: 'white',
              borderColor: 'var(--tb-navy)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'var(--tb-light-blue)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'white';
            }}
          >
            ← Modifier
          </button>
        </div>
      </div>

      {/* Métadonnées de l'email */}
      <div className="px-6 py-4 border-b-2" style={{ backgroundColor: 'var(--tb-light-blue)', borderColor: 'var(--tb-mint)' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-medium" style={{ color: 'var(--tb-teal)' }}>Mots:</span>
            <span className="ml-1 font-bold" style={{ color: 'var(--tb-navy)' }}>{metadata.wordCount}</span>
          </div>
          <div>
            <span className="font-medium" style={{ color: 'var(--tb-teal)' }}>Caractères:</span>
            <span className="ml-1 font-bold" style={{ color: 'var(--tb-navy)' }}>{metadata.charCount}</span>
          </div>
          <div>
            <span className="font-medium" style={{ color: 'var(--tb-teal)' }}>Lecture:</span>
            <span className="ml-1 font-bold" style={{ color: 'var(--tb-navy)' }}>
              {metadata.estimatedReadTime} min
            </span>
          </div>
          <div>
            <span className="font-medium" style={{ color: 'var(--tb-teal)' }}>Urgence:</span>
            <span className="ml-1 font-bold" style={{ color: 'var(--tb-navy)' }}>{metadata.urgency}</span>
          </div>
        </div>
      </div>

      {/* Simulation de l'interface email */}
      <div className="p-6">
        <div className="border-2 rounded-lg overflow-hidden" style={{ borderColor: 'var(--tb-mint)' }}>
          {/* En-tête de l'email simulé */}
          <div className="px-4 py-3 border-b-2" style={{ backgroundColor: 'var(--tb-light-blue)', borderColor: 'var(--tb-mint)' }}>
            <div className="space-y-2 text-sm">
              <div className="flex">
                <span className="font-medium w-16" style={{ color: 'var(--tb-teal)' }}>De:</span>
                <span className="font-bold" style={{ color: 'var(--tb-navy)' }}>
                  Bureau de la traduction &lt;traduction@canada.ca&gt;
                </span>
              </div>
              <div className="flex">
                <span className="font-medium w-16" style={{ color: 'var(--tb-teal)' }}>À:</span>
                <span className="font-bold" style={{ color: 'var(--tb-navy)' }}>
                  {formData.clientName || "[Nom du client]"}
                </span>
              </div>
              <div className="flex">
                <span className="font-medium w-16" style={{ color: 'var(--tb-teal)' }}>Sujet:</span>
                <span className="font-bold" style={{ color: 'var(--tb-navy)' }}>
                  {formData.subject || "[Sujet]"}
                </span>
              </div>
              <div className="flex">
                <span className="font-medium w-16" style={{ color: 'var(--tb-teal)' }}>Date:</span>
                <span className="font-bold" style={{ color: 'var(--tb-navy)' }}>
                  {new Date().toLocaleDateString("fr-CA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Contenu de l'email */}
          <div className="p-6 bg-white">
            {isEditing ? (
              <div className="space-y-4">
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full h-96 px-4 py-3 border-2 rounded-lg focus:outline-none font-mono text-sm transition-all"
                  style={{
                    borderColor: 'var(--tb-mint)',
                    backgroundColor: 'white'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--tb-teal)';
                    e.target.style.boxShadow = `0 0 0 3px rgba(8, 145, 178, 0.1)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--tb-mint)';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="Contenu de l'email..."
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105 border-2"
                    style={{
                      color: 'var(--tb-navy)',
                      backgroundColor: 'white',
                      borderColor: 'var(--tb-mint)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'var(--tb-light-blue)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'white';
                    }}
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 text-sm font-bold text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
                    style={{
                      backgroundColor: 'var(--tb-teal)',
                      boxShadow: '0 4px 12px rgba(8, 145, 178, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'var(--tb-navy)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'var(--tb-teal)';
                    }}
                  >
                    Sauvegarder
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 font-serif text-base leading-relaxed">
                {formatEmailContent(generatedEmail)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 border-t-2" style={{ borderColor: 'var(--tb-mint)', backgroundColor: 'var(--tb-light-blue)' }}>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              disabled={isEditing}
              className="px-4 py-2 text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105 border-2"
              style={{
                color: 'var(--tb-navy)',
                backgroundColor: 'white',
                borderColor: 'var(--tb-mint)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--tb-light-blue)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'white';
              }}
            >
              ✏️ Modifier
            </button>

            <button
              onClick={handleCopy}
              className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                isCopied
                  ? "text-green-700 bg-green-100 border border-green-300"
                  : "text-white bg-blue-600 border border-transparent hover:bg-blue-700 focus:ring-blue-500"
              }`}
            >
              {isCopied ? "✅ Copié!" : "📋 Copier l'email"}
            </button>
          </div>

          <div className="text-sm" style={{ color: 'var(--tb-teal)' }}>
            Prêt à être utilisé dans votre client email
          </div>
        </div>
      </div>

      {/* Conseils d'utilisation */}
      <div className="px-6 py-4 bg-yellow-50 border-t border-yellow-200">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-yellow-400 text-xl">💡</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Conseils avant l'envoi
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Relisez attentivement le contenu pour détecter toute erreur
                </li>
                <li>Vérifiez que les informations du client sont correctes</li>
                <li>
                  Assurez-vous que le niveau d'urgence correspond à la situation
                </li>
                <li>Ajoutez des pièces jointes si nécessaire avant l'envoi</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;
