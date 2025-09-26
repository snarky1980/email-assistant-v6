/**
 * EmailForm - Composant de formulaire pour la saisie des données d'email
 *
 * Ce composant gère la saisie des informations nécessaires pour personnaliser
 * les modèles d'emails. Il inclut la validation des données et la gestion
 * des différents types de champs.
 *
 * Props:
 * - formData: Object - Les données actuelles du formulaire
 * - selectedTemplate: Object - Le modèle d'email sélectionné
 * - onFormChange: Function - Callback pour les changements de données
 * - onGenerate: Function - Callback pour générer l'email
 *
 * @author Bureau de la traduction
 */

import React, { useState } from "react";

const EmailForm = ({
  formData,
  selectedTemplate,
  onFormChange,
  onGenerate,
}) => {
  // État local pour la validation des champs
  const [fieldErrors, setFieldErrors] = useState({});

  // NOTE: Removed unused isSubmitted state to appease lint.

  /**
   * Valide un champ spécifique
   * @param {string} fieldName - Le nom du champ à valider
   * @param {string} value - La valeur du champ
   * @returns {string|null} Message d'erreur ou null si valide
   */
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "clientName":
        if (!value.trim()) {
          return "Le nom du client est requis";
        }
        if (value.trim().length < 2) {
          return "Le nom du client doit contenir au moins 2 caractères";
        }
        return null;

      case "subject":
        if (!value.trim()) {
          return "Le sujet est requis";
        }
        if (value.length > 100) {
          return "Le sujet ne doit pas dépasser 100 caractères";
        }
        return null;

      case "customMessage":
        if (value.length > 500) {
          return "Le message personnalisé ne doit pas dépasser 500 caractères";
        }
        return null;

      default:
        return null;
    }
  };

  /**
   * Gestionnaire pour les changements de champs
   * @param {Event} event - L'événement de changement
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Mettre à jour les données du formulaire
    const newData = { [name]: value };
    onFormChange(newData);

    // Valider le champ modifié
    const error = validateField(name, value);
    setFieldErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  /**
   * Valide l'ensemble du formulaire
   * @returns {boolean} True si le formulaire est valide
   */
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Valider tous les champs requis
    const requiredFields = ["clientName", "subject"];
    requiredFields.forEach((field) => {
      const error = validateField(field, formData[field] || "");
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    });

    // Valider les champs optionnels
    const optionalFields = ["customMessage"];
    optionalFields.forEach((field) => {
      const error = validateField(field, formData[field] || "");
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    });

    setFieldErrors(errors);
    return isValid;
  };

  /**
   * Gestionnaire pour la soumission du formulaire
   * @param {Event} event - L'événement de soumission
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) onGenerate();
  };

  /**
   * Réinitialise le formulaire
   */
  const handleReset = () => {
    onFormChange({
      clientName: "",
      subject: selectedTemplate?.defaultSubject || "",
      customMessage: "",
      urgency: "normal",
      language: "fr",
    });
    setFieldErrors({});
  };

  // Si aucun modèle n'est sélectionné, afficher un message
  if (!selectedTemplate) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📧</div>
          <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--tb-navy)' }}>
            Sélectionnez un modèle d'email
          </h3>
          <p style={{ color: 'var(--tb-teal)' }}>
            Choisissez un modèle dans la liste de gauche pour commencer à
            rédiger votre email.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border-2" style={{ borderColor: 'var(--tb-mint)' }}>
      {/* En-tête du formulaire avec couleurs Bureau de la traduction */}
      <div className="px-6 py-4" style={{ backgroundColor: 'var(--tb-navy)', color: 'white' }}>
        <h2 className="text-xl font-bold text-white">
          📝 Personnalisation de l'email
        </h2>
        <p className="text-sm text-white/90 mt-1">
          Modèle sélectionné:{" "}
          <span className="font-bold" style={{ color: 'var(--tb-sage-muted)' }}>{selectedTemplate.name}</span>
        </p>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Nom du client */}
        <div>
          <label
            htmlFor="clientName"
            className="block text-sm font-bold mb-2"
            style={{ color: 'var(--tb-navy)' }}
          >
            Nom du client <span style={{ color: 'crimson' }}>*</span>
          </label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            value={formData.clientName || ""}
            onChange={handleInputChange}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="Ex: Madame Dupont, Monsieur Martin..."
            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all"
            style={{
              borderColor: fieldErrors.clientName ? 'crimson' : 'var(--tb-mint)',
              borderRadius: 'var(--radius)',
              backgroundColor: 'white'
            }}
            onFocus={(e) => {
              if (!fieldErrors.clientName) {
                e.target.style.borderColor = 'var(--tb-teal)';
                e.target.style.boxShadow = `0 0 0 3px rgba(8, 145, 178, 0.1)`;
              }
            }}
            onBlur={(e) => {
              if (!fieldErrors.clientName) {
                e.target.style.borderColor = 'var(--tb-mint)';
                e.target.style.boxShadow = 'none';
              }
            }}
          />
          {fieldErrors.clientName && (
            <p className="mt-1 text-sm text-red-600">
              {fieldErrors.clientName}
            </p>
          )}
        </div>

        {/* Sujet de l'email */}
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-bold mb-2"
            style={{ color: 'var(--tb-navy)' }}
          >
            Sujet de l'email <span style={{ color: 'crimson' }}>*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject || ""}
            onChange={handleInputChange}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="Sujet de votre email..."
            maxLength={100}
            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all"
            style={{
              borderColor: fieldErrors.subject ? 'crimson' : 'var(--tb-mint)',
              borderRadius: 'var(--radius)',
              backgroundColor: 'white'
            }}
            onFocus={(e) => {
              if (!fieldErrors.subject) {
                e.target.style.borderColor = 'var(--tb-teal)';
                e.target.style.boxShadow = `0 0 0 3px rgba(8, 145, 178, 0.1)`;
              }
            }}
            onBlur={(e) => {
              if (!fieldErrors.subject) {
                e.target.style.borderColor = 'var(--tb-mint)';
                e.target.style.boxShadow = 'none';
              }
            }}
          />
          <div className="flex justify-between mt-1">
            {fieldErrors.subject ? (
              <p className="text-sm text-red-600">{fieldErrors.subject}</p>
            ) : (
              <p className="text-sm" style={{ color: 'var(--tb-teal)' }}>
                Sujet clair et professionnel
              </p>
            )}
            <p className="text-sm" style={{ color: 'var(--tb-teal)' }}>
              {(formData.subject || "").length}/100
            </p>
          </div>
        </div>

        {/* Message personnalisé */}
        <div>
          <label
            htmlFor="customMessage"
            className="block text-sm font-bold mb-2"
            style={{ color: 'var(--tb-navy)' }}
          >
            Message personnalisé (optionnel)
          </label>
          <textarea
            id="customMessage"
            name="customMessage"
            value={formData.customMessage || ""}
            onChange={handleInputChange}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="Ajoutez des informations spécifiques à ce client ou cette situation..."
            rows={4}
            maxLength={500}
            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all resize-vertical"
            style={{
              borderColor: fieldErrors.customMessage ? 'crimson' : 'var(--tb-mint)',
              borderRadius: 'var(--radius)',
              backgroundColor: 'white'
            }}
            onFocus={(e) => {
              if (!fieldErrors.customMessage) {
                e.target.style.borderColor = 'var(--tb-teal)';
                e.target.style.boxShadow = `0 0 0 3px rgba(8, 145, 178, 0.1)`;
              }
            }}
            onBlur={(e) => {
              if (!fieldErrors.customMessage) {
                e.target.style.borderColor = 'var(--tb-mint)';
                e.target.style.boxShadow = 'none';
              }
            }}
          />
          <div className="flex justify-between mt-1">
            {fieldErrors.customMessage ? (
              <p className="text-sm text-red-600">
                {fieldErrors.customMessage}
              </p>
            ) : (
              <p className="text-sm" style={{ color: 'var(--tb-teal)' }}>
                Ce message sera inséré dans le modèle
              </p>
            )}
            <p className="text-sm" style={{ color: 'var(--tb-teal)' }}>
              {(formData.customMessage || "").length}/500
            </p>
          </div>
        </div>

        {/* Niveau d'urgence */}
        <div>
          <label
            htmlFor="urgency"
            className="block text-sm font-bold mb-2"
            style={{ color: 'var(--tb-navy)' }}
          >
            Niveau d'urgence
          </label>
          <select
            id="urgency"
            name="urgency"
            value={formData.urgency || "normal"}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all"
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
          >
            <option value="low">🟢 Faible - Réponse non urgente</option>
            <option value="normal">
              🟡 Normal - Réponse dans les délais habituels
            </option>
            <option value="high">🔴 Élevé - Réponse requise rapidement</option>
          </select>
          <p className="mt-1 text-sm" style={{ color: 'var(--tb-teal)' }}>
            Ceci affectera la signature et le ton de l'email
          </p>
        </div>

        {/* Langue */}
        <div>
          <label
            htmlFor="language"
            className="block text-sm font-bold mb-2"
            style={{ color: 'var(--tb-navy)' }}
          >
            Langue de l'email
          </label>
          <select
            id="language"
            name="language"
            value={formData.language || "fr"}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all"
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
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-between pt-6 border-t-2" style={{ borderColor: 'var(--tb-mint)' }}>
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-3 text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105 border-2"
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
            🔄 Réinitialiser
          </button>

          <button
            type="submit"
            className="px-8 py-3 text-sm font-bold text-white rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            style={{
              backgroundColor: 'var(--tb-teal)',
              boxShadow: '0 4px 12px rgba(8, 145, 178, 0.3)'
            }}
            disabled={!formData.clientName || !formData.subject}
            onMouseEnter={(e) => {
              if (!e.target.disabled) {
                e.target.style.backgroundColor = 'var(--tb-navy)';
              }
            }}
            onMouseLeave={(e) => {
              if (!e.target.disabled) {
                e.target.style.backgroundColor = 'var(--tb-teal)';
              }
            }}
          >
            ✨ Générer l'email
          </button>
        </div>

        {/* Message d'aide */}
        <div className="border-2 rounded-lg p-5" style={{ backgroundColor: 'var(--tb-light-blue)', borderColor: 'var(--tb-mint)' }}>
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-2xl">💡</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-bold" style={{ color: 'var(--tb-navy)' }}>
                Conseils pour un email efficace
              </h3>
              <div className="mt-2 text-sm" style={{ color: 'var(--tb-navy)' }}>
                <ul className="list-disc list-inside space-y-1">
                  <li>Utilisez un nom de client complet et respectueux</li>
                  <li>Rédigez un sujet clair et informatif</li>
                  <li>Personnalisez le message selon le contexte</li>
                  <li>Choisissez le niveau d'urgence approprié</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmailForm;
