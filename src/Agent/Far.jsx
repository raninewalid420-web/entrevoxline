import React, { useState } from "react";

export default function PlainteForm() {
  const [formData, setFormData] = useState({
    date: "",
    nomReclamant: "",
    contact: "",
    projet: "",
    details: "",
    signatureReclamant: "",
    anonyme: false,
  });

  const [plaintes, setPlaintes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [counter, setCounter] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nouvellePlainte = {
      ...formData,
      reference: `FAR-${String(counter).padStart(4, "0")}`,
      status: "En cours",
      id: Date.now(),
    };

    setPlaintes([nouvellePlainte, ...plaintes]);
    setCounter(counter + 1);

    // Réinitialiser le formulaire
    setFormData({
      date: "",
      nomReclamant: "",
      contact: "",
      projet: "",
      details: "",
      signatureReclamant: "",
      anonyme: false,
    });
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

  const plaintesFiltrees = plaintes.filter((p) =>
    p.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 p-8">
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
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 px-6 py-4">
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
              <label className="block font-medium">
                Contact (adresse / téléphone)
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            {/* Projet */}
            <div>
              <label className="block font-medium">
                Type de projet et emplacement
              </label>
              <input
                type="text"
                name="projet"
                value={formData.projet}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
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
                type="submit"
                className="text-white flex-1 bg-slate-700 hover:bg-slate-800 text-lg py-2 font-semibold cursor-pointer w-full rounded-md"
              >
                Soumettre la plainte
              </button>
            </div>
          </form>
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
                        className={`px-3 py-1 rounded text-sm font-semibold ${
                          plainte.status === "En cours"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {plainte.status}
                      </button>
                    </div>

                    <div className="text-sm space-y-1">
                      <p>
                        <span className="font-medium">Réclamant:</span>{" "}
                        {plainte.anonyme ? "Anonyme" : plainte.nomReclamant}
                      </p>
                      <p>
                        <span className="font-medium">Contact:</span>{" "}
                        {plainte.contact}
                      </p>
                      <p>
                        <span className="font-medium">Projet:</span>{" "}
                        {plainte.projet}
                      </p>
                      <p>
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
