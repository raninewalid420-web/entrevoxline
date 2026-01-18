import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CreateFar, ShowFar, ShowLastNumeroFar } from "../api/far";
import useAsync from "../hooks/useAsync";
import { useAuth } from "../context/AuthContext";

export default function PlainteForm() {
  const [formData, setFormData] = useState({
    date: "",
    nomReclamant: "",
    contact: "",
    pointFocal: "",
    type_plainte: "",
    langue: "",
    region: "",
    details: "",
    anonyme: false,
  });

  const [plaintes, setPlaintes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [counter, setCounter] = useState();

  const { execute: NumExecute } = useAsync(ShowLastNumeroFar, []);
  const { loading: LoadingFar, execute: FarExecute } = useAsync(CreateFar, []);
  const { loading: ShowLoadingFar, execute: ShowFarExecute } = useAsync(
    ShowFar,
    []
  );

  const { user } = useAuth();

  // Points focaux par région
  const pointsFocauxParRegion = {
    Tadjourah: ["Omar Ahmed Houssein"],
    Dikhil: ["Said Ibrahim Mohamed"],
    Arta: ["Ifrah Osmane Arta"],
    "Ali-sabieh": ["Hawa Ismil Ali"],
    Obock: ["Houmed Ibrahim Mohamed"],
    "Djibouti ville": ["Kafia Abdourahman Cheik"],
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Si on change de région, réinitialiser le point focal
    if (name === "region") {
      setFormData({
        ...formData,
        region: value,
        pointFocal: "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nouvellePlainte = {
        ...formData,
        reference: counter,
        status: "En cours",
        id: Date.now(),
      };

      console.log("Nouvelle plainte à enregistrer :", nouvellePlainte);

      const result = await FarExecute(nouvellePlainte, user?.id);
      if (result?.success) {
        toast.success(result?.message || "Enregistrée avec succès !");

        // Réinitialiser le formulaire
        setFormData({
          date: "",
          nomReclamant: "",
          contact: "",
          pointFocal: "",
          type_plainte: "",
          langue: "",
          region: "",
          details: "",
          anonyme: false,
        });

        // 🔥 Recharger le nouveau numéro après insertion
        const numero = await NumExecute();
        if (numero) {
          setCounter(numero);
        }
        // 🔥 Mettre à jour la liste des plaintes localemen
        const updatedPlaintes = await ShowFarExecute();
        if (updatedPlaintes) {
          setPlaintes(updatedPlaintes);
        }
      } else {
        toast.error(result?.error || "Erreur lors de l'enregistrement.");
      }
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement de la Mass.");
      console.error(err);
    }
  };

  const toggleStatus = (id) => {
    setPlaintes(
      plaintes.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "En cours" ? "Terminé" : "En cours" }
          : p
      )
    );
  };

  useEffect(() => {
    let isMounted = true;

    const refreshNumero = async () => {
      try {
        const numero = await NumExecute();
        if (isMounted && numero) {
          setCounter(numero);
        }
      } catch (e) {
        console.error(e);
      }
    };

    // 🔥 Chargement initial
    refreshNumero();

    // 🔁 Polling toutes les 5 secondes
    const interval = setInterval(refreshNumero, 3000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // 🔥 Mettre à jour la liste des plaintes localemen
    const Show = async () => {
      try {
        const updatedPlaintes = await ShowFarExecute();
        if (updatedPlaintes) {
          setPlaintes(updatedPlaintes);
        }
      } catch (e) {
        console.error(e);
      }
    };

    // 🔥 Chargement initial
    Show();
  }, []);

  const plaintesFiltrees = plaintes.filter((p) =>
    p.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <ToastContainer position="top-center" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulaire */}
        <div className="bg-white rounded-xl shadow-md">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5 rounded-t-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="px-3 py-1 bg-green-800 text-white text-xs font-semibold rounded uppercase tracking-wide">
                REGISTRE DE GESTION DES PLAINTES
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Enregistrement des Plaintes
            </h1>
            <p className="text-white">
              Bonjour et bienvenue sur la ligne verte 2020 du projet Far.
            </p>
          </div>
          <div className="space-y-4 px-6 py-4">
            <h1 className="font-semibold">Reference : {counter}</h1>
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

            {/* Nom du réclamant */}
            {!formData.anonyme && (
              <div>
                <label className="block font-medium">Nom du réclamant</label>
                <input
                  type="text"
                  name="nomReclamant"
                  value={formData.nomReclamant}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
            )}

            {/* Contact */}
            <div>
              <label className="block font-medium">Contact</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            {/* Type de plainte */}
            <div>
              <label className="block font-medium">Type de plainte</label>
              <select
                name="type_plainte"
                value={formData.type_plainte}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Sélectionner un type</option>
                <option value="Doléance">Doléance</option>
                <option value="Plainte urgente">Plainte urgente</option>
                <option value="Plainte normal">Plainte normal</option>
              </select>
            </div>

            {/* Langue */}
            <div>
              <label className="block font-medium">Langue</label>
              <select
                name="langue"
                value={formData.langue}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Sélectionner une langue</option>
                <option value="Somali">Somali</option>
                <option value="Afar">Afar</option>
                <option value="Arabe">Arabe</option>
                <option value="Amharique">Amharique</option>
                <option value="Anglais">Anglais</option>
                <option value="Français">Français</option>
              </select>
            </div>

            {/* Zone */}
            <div>
              <label className="block font-medium">Zone</label>
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Sélectionner une région</option>
                <option value="Tadjourah">Tadjourah</option>
                <option value="Dikhil">Dikhil</option>
                <option value="Arta">Arta</option>
                <option value="Ali-sabieh">Ali-sabieh</option>
                <option value="Obock">Obock</option>
                <option value="Djibouti ville">Djibouti ville</option>
              </select>
            </div>

            {/* Point Focal - Dépend de la région */}
            <div>
              <label className="block font-medium">Point Focal</label>
              <select
                name="pointFocal"
                value={formData.pointFocal}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
                disabled={!formData.region}
              >
                <option value="">
                  {formData.region
                    ? "Sélectionner un point focal"
                    : "Sélectionner d'abord une région"}
                </option>
                {formData.region &&
                  pointsFocauxParRegion[formData.region]?.map(
                    (point, index) => (
                      <option key={index} value={point}>
                        {point}
                      </option>
                    )
                  )}
              </select>
            </div>

            {/* Détails */}
            <div>
              <label className="block font-medium">
                Détails sur la plainte
              </label>
              <textarea
                name="details"
                rows="5"
                value={formData.details}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              ></textarea>
            </div>

            {/* Bouton */}
            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="text-white flex-1 bg-slate-700 hover:bg-slate-800 text-lg py-2 font-semibold cursor-pointer w-full rounded-md"
              >
                Soumettre la plainte
              </button>
            </div>
          </div>
        </div>

        {/* Tableau des plaintes */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Liste des Plaintes
          </h2>

          {/* Barre de recherche */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Rechercher par référence (ex: FAR-0001)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Tableau */}
          <div className="overflow-auto max-h-[600px]">
            {plaintesFiltrees.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Aucune plainte enregistrée
              </p>
            ) : (
              <div className="space-y-4">
                {plaintesFiltrees.map((plainte) => (
                  <div
                    key={plainte.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-bold text-lg text-slate-700">
                          {plainte.reference}
                        </span>
                        <span className="text-sm text-gray-600 ml-3">
                          {plainte.date}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleStatus(plainte.id)}
                        className={`px-3 py-1 rounded text-sm font-semibold ${plainte.status === "En cours"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                          }`}
                      >
                        {plainte.status}
                      </button>
                    </div>

                    <div className="text-sm space-y-1">
                      <p className="break-words">
                        <span className="font-medium">Réclamant:</span>{" "}
                        {plainte.anonyme ? "Anonyme" : plainte.nom_reclamant}
                      </p>
                      <p className="break-words">
                        <span className="font-medium">Contact:</span>{" "}
                        {plainte.contact}
                      </p>
                      <p className="break-words">
                        <span className="font-medium">Type:</span>{" "}
                        {plainte.type_plainte}
                      </p>
                      <p className="break-words">
                        <span className="font-medium">Langue:</span>{" "}
                        {plainte.langue}
                      </p>
                      <p className="break-words">
                        <span className="font-medium">Région:</span>{" "}
                        {plainte.region}
                      </p>
                      <p className="break-words">
                        <span className="font-medium">Point focal:</span>{" "}
                        {plainte.pointFocal}
                      </p>
                      <p className="break-words">
                        <span className="font-medium">Détails:</span>{" "}
                        {plainte.details}
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
