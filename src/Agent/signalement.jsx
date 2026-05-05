import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import {
  CreateSignalement,
  ShowLastNumeroSignalement,
  ShowSignalement,
} from "../api/signalement";

// ─── Remplace ces imports par tes vraies fonctions API ───────────────────────
// import { CreateSignalement, ShowSignalement, ShowLastNumeroSignalement } from "../api/signalement";
// import useAsync from "../hooks/useAsync";
// import { useAuth } from "../context/AuthContext";

// ─── Mock temporaire (à supprimer quand l'API est prête) ─────────────────────
function useAsync(fn) {
  return { loading: false, execute: fn || (async () => {}) };
}

// ─────────────────────────────────────────────────────────────────────────────

const NATURE_LABELS = {
  prix_abusif: "Prix abusif",
  produit_perime: "Produit périmé",
  refus_facture: "Refus de facture",
  autre: "Autre",
};

const COMMERCE_LABELS = {
  boutique: "Boutique",
  supermarche: "Supermarché",
  marche: "Marché",
  autre: "Autre",
};

const COMPARAISON_LABELS = {
  oui_superieur: "Oui, supérieur au prix habituel",
  oui_inferieur: "Oui, inférieur (suspect)",
  non: "Non, prix habituel",
  ne_sais_pas: "Je ne sais pas",
};

// Cas types avec message de réponse
const CAS_TYPES = [
  {
    key: "prix_abusif",
    label: "Cas 1 : Prix abusif",
    message:
      "Votre signalement est bien enregistré. Il sera transmis aux services de contrôle compétents.",
  },
  {
    key: "produit_perime",
    label: "Cas 2 : Produit périmé",
    message:
      "Merci pour votre vigilance, ce type d'information est prioritaire.",
  },
  {
    key: "refus_facture",
    label: "Cas 3 : Refus de facture",
    message: "Cela constitue une irrégularité, votre signalement sera traité.",
  },
];

export default function Signalement() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    date: "",
    nature: "",
    zone: "",
    commerce: "",
    produit: "",
    prix: "",
    comparaison: "",
    details: "",
    nom: "",
    tel: "",
    anonyme: false,
  });

  const [signalements, setSignalements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [counter, setCounter] = useState("");
  const [casActif, setCasActif] = useState(null); // message cas type affiché

  const { execute: NumExecute } = useAsync(ShowLastNumeroSignalement);
  const { loading: LoadingCreate, execute: CreateExecute } =
    useAsync(CreateSignalement);
  const { execute: ShowExecute } = useAsync(ShowSignalement);
  

  // Quand la nature change, on met à jour le cas actif
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    // Synchroniser le cas type affiché avec la nature sélectionnée
    if (name === "nature") {
      const cas = CAS_TYPES.find((c) => c.key === value);
      setCasActif(cas || null);
    }
  };

  // Clic sur un bouton cas type → remplit la nature ET affiche le message
  const handleCasType = (cas) => {
    setFormData((prev) => ({ ...prev, nature: cas.key }));
    setCasActif(cas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nature)
      return toast.warn("Veuillez sélectionner la nature du problème.");
    if (!formData.zone.trim())
      return toast.warn("Veuillez indiquer la localisation.");

    try {
      const nouveauSignalement = {
        ...formData,
        reference: counter,
        status: "En cours",
        id: Date.now(),
      };
      // console.log(nouveauSignalement);

      const result = await CreateExecute(nouveauSignalement, user?.id);
      if (result?.success) {
        toast.success(result?.message || "Enregistré avec succès !");

        setFormData({
          date: "",
          nature: "",
          zone: "",
          commerce: "",
          produit: "",
          prix: "",
          comparaison: "",
          details: "",
          nom: "",
          tel: "",
          anonyme: false,
        });
        setCasActif(null);

        const numero = await NumExecute();
        if (numero) setCounter(numero);

        const updated = await ShowExecute();
        if (updated) setSignalements(updated);
      } else {
        toast.error(result?.error || "Erreur lors de l'enregistrement.");
        console.log(result?.data);
      }
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement.");
      console.error(error);
    }
  };

  const toggleStatus = (id) => {
    setSignalements((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "En cours" ? "Terminé" : "En cours" }
          : s,
      ),
    );
  };

  // Polling numéro de référence toutes les 3 secondes
  useEffect(() => {
    let isMounted = true;
    const refreshNumero = async () => {
      try {
        const numero = await NumExecute();
        if (isMounted && numero) setCounter(numero);
      } catch (e) {
        console.error(e);
      }
    };
    refreshNumero();
    const interval = setInterval(refreshNumero, 3000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Chargement initial de la liste
  useEffect(() => {
    const load = async () => {
      try {
        const data = await ShowExecute();
        if (data) setSignalements(data);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  const signalementsFiltres = signalements.filter((s) =>
    (s.reference || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <ToastContainer position="top-center" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ═══════════════════════════════════════
            COLONNE GAUCHE — Formulaire
        ═══════════════════════════════════════ */}
        <div className="bg-white rounded-xl shadow-md">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5 rounded-t-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="px-3 py-1 bg-blue-800 text-white text-xs font-semibold rounded uppercase tracking-wide">
                Centre d'appels 2020 — La Poste de Djibouti
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Formulaire de Signalement
            </h1>
            <p className="text-white text-sm italic">
              « Bonjour, centre d'appels 2020, La Poste de Djibouti, à votre
              écoute. En quoi puis-je vous aider ? »
            </p>
          </div>

          <div className="space-y-4 px-6 py-4">
            {/* Référence */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2">
              <span className="text-sm text-slate-500 font-medium">
                Référence :
              </span>
              <span className="text-sm font-bold text-blue-700 tracking-wide">
                {counter || "—"}
              </span>
            </div>

            {/* Date */}
            <div>
              <label className="block font-medium">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            {/* Anonyme */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="anonyme"
                id="anonyme"
                checked={formData.anonyme}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <label htmlFor="anonyme" className="font-medium cursor-pointer">
                Je souhaite rester anonyme
              </label>
            </div>

            {/* Nom */}
            {!formData.anonyme && (
              <div>
                <label className="block font-medium">Nom du déclarant</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  placeholder="Nom complet"
                />
              </div>
            )}

            {/* Téléphone */}
            <div>
              <label className="block font-medium">Numéro de téléphone</label>
              <input
                type="tel"
                name="tel"
                value={formData.tel}
                onChange={handleChange}
                placeholder="+253 77 000 000"
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Nature du problème */}
            <div>
              <label className="block font-medium">Nature du problème</label>
              <select
                name="nature"
                value={formData.nature}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">— Sélectionner —</option>
                <option value="prix_abusif">Prix abusif</option>
                <option value="produit_perime">Produit périmé</option>
                <option value="refus_facture">Refus de facture</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            {/* ── Cas types et réponses ── */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="bg-slate-100 px-4 py-2 border-b border-slate-200">
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest">
                  🧾 Cas types et réponses
                </p>
              </div>
              <div className="divide-y divide-slate-100">
                {CAS_TYPES.map((cas) => {
                  const isActif = casActif?.key === cas.key;
                  return (
                    <div
                      key={cas.key}
                      className={`p-3 transition-colors ${isActif ? "bg-red-50" : "hover:bg-slate-50"}`}
                    >
                      <button
                        type="button"
                        onClick={() => handleCasType(cas)}
                        className={`flex items-center gap-2 w-full text-left mb-1`}
                      >
                        <span className="text-red-500 text-xs">🔴</span>
                        <span
                          className={`text-sm font-semibold ${isActif ? "text-red-700" : "text-slate-700"}`}
                        >
                          {cas.label}
                        </span>
                      </button>
                      {isActif && (
                        <p className="text-xs text-red-600 italic ml-5 mt-1">
                          « {cas.message} »
                        </p>
                      )}
                      {!isActif && (
                        <p className="text-xs text-slate-400 ml-5">
                          Cliquer pour sélectionner ce cas
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Zone */}
            <div>
              <label className="block font-medium">
                Localisation (Quartier / Zone)
              </label>
              <input
                type="text"
                name="zone"
                value={formData.zone}
                onChange={handleChange}
                placeholder="Ex: Plateau du Serpent…"
                className="w-full border p-2 rounded"
                required
              />
            </div>

            {/* Type de commerce */}
            <div>
              <label className="block font-medium">Type de commerce</label>
              <select
                name="commerce"
                value={formData.commerce}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">— Sélectionner —</option>
                <option value="boutique">Boutique</option>
                <option value="supermarche">Supermarché</option>
                <option value="marche">Marché</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            {/* Produit */}
            <div>
              <label className="block font-medium">Produit concerné</label>
              <input
                type="text"
                name="produit"
                value={formData.produit}
                onChange={handleChange}
                placeholder="Ex: sucre, huile, médicament…"
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Prix */}
            <div>
              <label className="block font-medium">Prix constaté (FDJ)</label>
              <input
                type="text"
                name="prix"
                value={formData.prix}
                onChange={handleChange}
                placeholder="Ex: 500"
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Comparaison */}
            <div>
              <label className="block font-medium">
                Prix différent du prix habituel ?
              </label>
              <select
                name="comparaison"
                value={formData.comparaison}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">— Sélectionner —</option>
                <option value="oui_superieur">
                  Oui, supérieur au prix habituel
                </option>
                <option value="oui_inferieur">Oui, inférieur (suspect)</option>
                <option value="non">Non, prix habituel</option>
                <option value="ne_sais_pas">Je ne sais pas</option>
              </select>
            </div>

            {/* Message de confiance */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 flex items-start gap-2">
              <span className="text-slate-400 mt-0.5">🛡️</span>
              <p className="text-sm text-slate-600 italic">
                Vos informations resteront strictement confidentielles. Vous
                pouvez rester anonyme si vous le souhaitez.
              </p>
            </div>

            {/* Détails */}
            <div>
              <label className="block font-medium">
                Détails sur le signalement
              </label>
              <textarea
                name="details"
                rows="5"
                value={formData.details}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            {/* Bouton */}
            <div className="text-center pb-2">
              <button
                onClick={handleSubmit}
                disabled={LoadingCreate}
                className="text-white bg-slate-700 hover:bg-slate-800 text-lg py-2 font-semibold cursor-pointer w-full rounded-md disabled:opacity-50 transition-colors"
              >
                {LoadingCreate
                  ? "Enregistrement…"
                  : "Enregistrer le signalement"}
              </button>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            COLONNE DROITE — Liste des signalements
        ═══════════════════════════════════════ */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Liste des Signalements
          </h2>

          {/* Barre de recherche */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Rechercher par référence (ex: SIG-0001)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Liste */}
          <div className="overflow-auto max-h-[900px]">
            {signalementsFiltres.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Aucun signalement enregistré
              </p>
            ) : (
              <div className="space-y-4">
                {signalementsFiltres.map((s) => (
                  <div
                    key={s.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    {/* Header card */}
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-bold text-lg text-slate-700">
                          {s.reference}
                        </span>
                        <span className="text-sm text-gray-600 ml-3">
                          {s.date}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleStatus(s.id)}
                        className={`px-3 py-1 rounded text-sm font-semibold ${
                          s.status === "En cours"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {s.status}
                      </button>
                    </div>

                    {/* Détails card */}
                    <div className="text-sm space-y-1">
                      <p className="break-words">
                        <span className="font-medium">Déclarant :</span>{" "}
                        {s.anonyme ? "Anonyme" : s.nom || "—"}
                      </p>
                      <p className="break-words">
                        <span className="font-medium">Téléphone :</span>{" "}
                        {s.anonyme ? "—" : s.tel || "—"}
                      </p>
                      <p className="break-words">
                        <span className="font-medium">Nature :</span>{" "}
                        {NATURE_LABELS[s.nature] || s.nature || "—"}
                      </p>
                      <p className="break-words">
                        <span className="font-medium">Zone :</span>{" "}
                        {s.zone || "—"}
                      </p>
                      <p className="break-words">
                        <span className="font-medium">Commerce :</span>{" "}
                        {COMMERCE_LABELS[s.commerce] || s.commerce || "—"}
                      </p>
                      <p className="break-words">
                        <span className="font-medium">Produit :</span>{" "}
                        {s.produit || "—"}
                      </p>
                      <p className="break-words">
                        <span className="font-medium">Prix constaté :</span>{" "}
                        {s.prix ? `${s.prix} FDJ` : "—"}
                      </p>
                      <p className="break-words">
                        <span className="font-medium">Comparaison :</span>{" "}
                        {COMPARAISON_LABELS[s.comparaison] ||
                          s.comparaison ||
                          "—"}
                      </p>
                      <p className="break-words">
                        <span className="font-medium">Détails :</span>{" "}
                        {s.details || "—"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
