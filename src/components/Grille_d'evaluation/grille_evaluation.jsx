"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FileUp, Save, RotateCcw, Plus } from "lucide-react";
import * as XLSX from "xlsx";
import { DataTable } from "../dataTables/Tables/data-table";
import {
  timeSlotsConfig,
  equipes,
  nombreAppels,
  evaluationCriteria,
  applicableOptions,
  evaluationListColumns,
} from "../dataTables/evaluationListColumns";

export default function GrilleEvaluation() {
  const [showForm, setShowForm] = useState(false);
  const [evaluations, setEvaluations] = useState([]);

  const [formData, setFormData] = useState({
    dateEval: new Date().toISOString().split("T")[0],
    equipe: "soir", // Équipe par défaut
    nombreAppels: 1, // Nombre d'appels par défaut
    agent: "",
    callIds: ["", "", "", ""], // 4 IDs max (un par appel)
    evalType: "Appel entrant",
    comments: "",
  });

  // Créneaux horaires dynamiques selon l'équipe
  const [timeSlots, setTimeSlots] = useState(timeSlotsConfig.soir);

  const [evaluationData, setEvaluationData] = useState(() => {
    const initialData = {};
    evaluationCriteria.forEach((criterion) => {
      initialData[criterion.id] = {};
      // Initialiser pour 4 appels maximum
      for (let i = 1; i <= 4; i++) {
        initialData[criterion.id][`appel${i}`] = {
          applicable: "A",
          score: "",
          commentaire: "", // Nouveau champ commentaire
        };
      }
    });
    return initialData;
  });

  const [averages, setAverages] = useState({
    bySlot: {},
    general: 0,
  });

  // Charger les évaluations depuis localStorage
  useEffect(() => {
    loadEvaluations();
  }, []);

  // Calcul des moyennes
  useEffect(() => {
    calculateAverages();
  }, [evaluationData]);

  const loadEvaluations = () => {
    const saved = localStorage.getItem("evaluations");
    if (saved) {
      const parsed = JSON.parse(saved);
      const list = Object.values(parsed).map((eva) => ({
        ...eva,
        generalAverage: eva.averages?.general || 0,
      }));
      setEvaluations(list);
    }
  };

  const calculateAverages = () => {
    const appelAverages = {};

    // Calculer la moyenne pour chaque appel
    for (let i = 1; i <= formData.nombreAppels; i++) {
      let total = 0;
      let maxTotal = 0;

      evaluationCriteria.forEach((criterion) => {
        const data = evaluationData[criterion.id][`appel${i}`];
        if (data.applicable === "A" && data.score) {
          total += parseFloat(data.score);
          maxTotal += criterion.maxScore;
        }
      });

      appelAverages[`appel${i}`] = maxTotal > 0 ? (total / maxTotal) * 100 : 0;
    }

    const validAverages = Object.values(appelAverages).filter((avg) => avg > 0);
    const generalAvg =
      validAverages.length > 0
        ? validAverages.reduce((a, b) => a + b, 0) / validAverages.length
        : 0;

    setAverages({
      byAppel: appelAverages,
      general: generalAvg,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Si changement d'équipe, mettre à jour les créneaux horaires
    if (name === "equipe") {
      setTimeSlots(timeSlotsConfig[value]);
    }
  };

  const handleCallIdChange = (index, value) => {
    const newCallIds = [...formData.callIds];
    newCallIds[index] = value;
    setFormData({
      ...formData,
      callIds: newCallIds,
    });
  };

  const handleEvaluationChange = (criterionId, appelNum, field, value) => {
    setEvaluationData((prev) => ({
      ...prev,
      [criterionId]: {
        ...prev[criterionId],
        [`appel${appelNum}`]: {
          ...prev[criterionId][`appel${appelNum}`],
          [field]: value,
          ...(field === "applicable" && (value === "NA" || value === "RAS")
            ? { score: "" }
            : {}),
        },
      },
    }));
  };

  const resetForm = () => {
    const resetData = {};
    evaluationCriteria.forEach((criterion) => {
      resetData[criterion.id] = {};
      for (let i = 1; i <= 4; i++) {
        resetData[criterion.id][`appel${i}`] = {
          applicable: "A",
          score: "",
          commentaire: "",
        };
      }
    });
    setEvaluationData(resetData);
    setFormData({
      dateEval: new Date().toISOString().split("T")[0],
      equipe: "soir",
      nombreAppels: 1,
      agent: "",
      callIds: ["", "", "", ""],
      evalType: "Appel entrant",
      comments: "",
    });
    setTimeSlots(timeSlotsConfig.soir);
  };

  const saveEvaluation = () => {
    if (!formData.agent || !formData.dateEval) {
      alert("⚠️ Veuillez remplir au minimum la date et le nom de l'agent");
      return;
    }

    const evaluation = {
      ...formData,
      data: evaluationData,
      averages: averages,
      timestamp: new Date().toISOString(),
    };

    const saved = JSON.parse(localStorage.getItem("evaluations") || "{}");
    const key = `${formData.dateEval}_${formData.agent}_${Date.now()}`;
    saved[key] = evaluation;
    localStorage.setItem("evaluations", JSON.stringify(saved));

    alert("✅ Évaluation enregistrée avec succès !");
    loadEvaluations();
    setShowForm(false);
    resetForm();
  };

  const exportToExcel = () => {
    if (!formData.agent || !formData.dateEval) {
      alert("⚠️ Veuillez remplir la date et le nom de l'agent");
      return;
    }

    const equipeInfo = equipes.find((e) => e.value === formData.equipe);

    const data = [
      ["Grille D'évaluation d'Appel Entrant"],
      [],
      ["Date d'évaluation:", formData.dateEval, "", "Agent:", formData.agent],
      [
        "Type d'évaluation:",
        formData.evalType,
        "",
        "Équipe:",
        `${equipeInfo.name} (${equipeInfo.horaire})`,
      ],
      ["Nombre d'appels évalués:", formData.nombreAppels],
      [],
    ];

    // Ajouter les IDs des appels
    for (let i = 0; i < formData.nombreAppels; i++) {
      data.push([`ID Appel ${i + 1}:`, formData.callIds[i] || "N/A"]);
    }

    data.push([]);
    data.push([
      "Description",
      ...Array.from({ length: formData.nombreAppels }, (_, i) => [
        `Appel ${i + 1}`,
        "",
        "",
      ]).flat(),
      "Max",
    ]);
    data.push([
      "",
      ...Array.from({ length: formData.nombreAppels }, () => [
        "A/NA",
        "Note",
        "Commentaire",
      ]).flat(),
      "",
    ]);

    evaluationCriteria.forEach((criterion) => {
      const row = [criterion.description];
      for (let i = 1; i <= formData.nombreAppels; i++) {
        const evalData = evaluationData[criterion.id][`appel${i}`];
        row.push(
          evalData.applicable,
          evalData.score || "",
          evalData.commentaire || "",
        );
      }
      row.push(`/${criterion.maxScore}`);
      data.push(row);
    });

    const avgRow = ["Moyenne/Appel"];
    for (let i = 1; i <= formData.nombreAppels; i++) {
      avgRow.push(
        "",
        averages.byAppel[`appel${i}`]?.toFixed(1) + "%" || "0%",
        "",
      );
    }
    avgRow.push("");
    data.push(avgRow);

    data.push(["Moyenne Générale", averages.general.toFixed(1) + "%"]);
    data.push([]);
    data.push(["Commentaires généraux:", formData.comments]);

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Evaluation");
    XLSX.writeFile(
      wb,
      `Evaluation_${formData.agent}_${formData.dateEval}_${formData.nombreAppels}appels.xlsx`,
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-lg shadow-2xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                📞 Grille d'Évaluation d'Appel Entrant
              </h1>
              <p className="text-slate-300">
                Système de notation des agents - Équipe de Soir
              </p>
            </div>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {showForm ? "Voir la liste" : "Nouvelle évaluation"}
            </Button>
          </div>
        </div>

        {showForm ? (
          // Formulaire d'évaluation
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            {/* Informations de base */}
            <div className="bg-white p-6 border-b-4 border-slate-800">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">
                    📅 Date d'évaluation
                  </label>
                  <Input
                    type="date"
                    name="dateEval"
                    value={formData.dateEval}
                    onChange={handleInputChange}
                    className="border-2 border-slate-800 focus:border-blue-600 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">
                    👥 Équipe
                  </label>
                  <select
                    name="equipe"
                    value={formData.equipe}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-2 border-slate-800 focus:border-blue-600 rounded-lg font-semibold"
                  >
                    {equipes.map((eq) => (
                      <option key={eq.value} value={eq.value}>
                        {eq.name} ({eq.horaire})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">
                    🔢 Nombre d'appels
                  </label>
                  <select
                    name="nombreAppels"
                    value={formData.nombreAppels}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-2 border-slate-800 focus:border-blue-600 rounded-lg font-semibold"
                  >
                    {nombreAppels.map((nb) => (
                      <option key={nb} value={nb}>
                        {nb} appel{nb > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">
                    👤 Nom de l'agent
                  </label>
                  <Input
                    type="text"
                    name="agent"
                    value={formData.agent}
                    onChange={handleInputChange}
                    placeholder="Ex: Mourad"
                    className="border-2 border-slate-800 focus:border-blue-600 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">
                    📋 Type d'évaluation
                  </label>
                  <select
                    name="evalType"
                    value={formData.evalType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-2 border-slate-800 focus:border-blue-600 rounded-lg font-semibold"
                  >
                    <option value="Appel entrant">Appel entrant</option>
                    <option value="Appel sortant">Appel sortant</option>
                  </select>
                </div>
              </div>

              {/* Section des IDs d'appels - Dynamique selon le nombre d'appels */}
              <div className="mt-6 pt-6 border-t-2 border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">
                  📞 IDs des appels évalués
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Array.from(
                    { length: formData.nombreAppels },
                    (_, i) => i,
                  ).map((index) => (
                    <div key={index}>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">
                        ID Appel {index + 1}
                      </label>
                      <Input
                        type="text"
                        value={formData.callIds[index]}
                        onChange={(e) =>
                          handleCallIdChange(index, e.target.value)
                        }
                        placeholder={`[]_10000-117_...`}
                        className="border-2 border-slate-600 focus:border-blue-600 rounded-lg text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tableau d'évaluation */}
            <div className="overflow-x-auto bg-slate-50 p-6">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-700 to-slate-800">
                    <th
                      rowSpan="2"
                      className="text-white p-4 text-left font-bold uppercase tracking-wide border-r border-slate-600"
                    >
                      Description
                    </th>
                    {Array.from(
                      { length: formData.nombreAppels },
                      (_, i) => i + 1,
                    ).map((appelNum) => (
                      <th
                        key={appelNum}
                        colSpan="3"
                        className="text-white p-3 text-center font-bold border-r border-slate-600"
                      >
                        Appel {appelNum}
                      </th>
                    ))}
                    <th
                      rowSpan="2"
                      className="text-white p-4 text-center font-bold uppercase"
                    >
                      Max
                    </th>
                  </tr>
                  <tr className="bg-slate-700">
                    {Array.from(
                      { length: formData.nombreAppels },
                      (_, i) => i + 1,
                    ).map((appelNum) => (
                      <React.Fragment key={appelNum}>
                        <th className="text-white p-2 text-center text-sm font-semibold border-r border-slate-600">
                          A/NA
                        </th>
                        <th className="text-white p-2 text-center text-sm font-semibold border-r border-slate-600">
                          Note
                        </th>
                        <th className="text-white p-2 text-center text-sm font-semibold border-r border-slate-600">
                          Commentaire
                        </th>
                      </React.Fragment>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {evaluationCriteria.map((criterion, idx) => (
                    <tr
                      key={criterion.id}
                      className={`${
                        idx % 2 === 0 ? "bg-white" : "bg-slate-50"
                      } hover:bg-blue-50 transition-colors duration-150`}
                    >
                      <td className="p-4 text-sm text-slate-800 font-medium border-r border-l-4 border-l-blue-600 border-slate-200">
                        {criterion.description}
                      </td>
                      {Array.from(
                        { length: formData.nombreAppels },
                        (_, i) => i + 1,
                      ).map((appelNum) => (
                        <React.Fragment key={appelNum}>
                          <td className="p-2 text-center border-r border-slate-200">
                            <select
                              value={
                                evaluationData[criterion.id][`appel${appelNum}`]
                                  .applicable
                              }
                              onChange={(e) =>
                                handleEvaluationChange(
                                  criterion.id,
                                  appelNum,
                                  "applicable",
                                  e.target.value,
                                )
                              }
                              className="w-full px-2 py-1 border-2 border-slate-800 rounded font-semibold text-sm focus:border-blue-600 focus:outline-none"
                            >
                              {applicableOptions.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="p-2 text-center border-r border-slate-200">
                            <Input
                              type="number"
                              min="0"
                              max={criterion.maxScore}
                              step="0.5"
                              value={
                                evaluationData[criterion.id][`appel${appelNum}`]
                                  .score
                              }
                              onChange={(e) =>
                                handleEvaluationChange(
                                  criterion.id,
                                  appelNum,
                                  "score",
                                  e.target.value,
                                )
                              }
                              disabled={
                                evaluationData[criterion.id][`appel${appelNum}`]
                                  .applicable !== "A"
                              }
                              className="w-full text-center font-bold border-2 border-slate-800 focus:border-blue-600 disabled:bg-slate-100 disabled:border-slate-300"
                            />
                          </td>
                          <td className="p-2 border-r border-slate-200">
                            <Input
                              type="text"
                              placeholder="Commentaire..."
                              value={
                                evaluationData[criterion.id][`appel${appelNum}`]
                                  .commentaire
                              }
                              onChange={(e) =>
                                handleEvaluationChange(
                                  criterion.id,
                                  appelNum,
                                  "commentaire",
                                  e.target.value,
                                )
                              }
                              className="w-full text-sm border-2 border-slate-300 focus:border-blue-600"
                            />
                          </td>
                        </React.Fragment>
                      ))}
                      <td className="p-3 text-center font-bold text-slate-900 bg-blue-50 border-l-2 border-blue-600">
                        /{criterion.maxScore}
                      </td>
                    </tr>
                  ))}
                  {/* Ligne moyenne par appel */}
                  <tr className="bg-gradient-to-r from-slate-700 to-slate-800 text-white font-bold">
                    <td className="p-4">Moyenne/Appel</td>
                    {Array.from(
                      { length: formData.nombreAppels },
                      (_, i) => i + 1,
                    ).map((appelNum) => (
                      <td
                        key={appelNum}
                        colSpan="3"
                        className="p-3 text-center border-r border-slate-600"
                      >
                        {averages.byAppel[`appel${appelNum}`]?.toFixed(1) ||
                          "0.0"}
                        %
                      </td>
                    ))}
                    <td></td>
                  </tr>
                  {/* Ligne moyenne générale */}
                  <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg">
                    <td className="p-4">Moyenne Générale</td>
                    <td
                      colSpan={formData.nombreAppels * 3 + 1}
                      className="p-4 text-center"
                    >
                      {averages.general.toFixed(1)}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Actions */}
            <div className="bg-slate-50 p-6 flex gap-4 justify-center border-t-2 border-slate-200">
              <Button
                onClick={resetForm}
                className="bg-white text-slate-900 border-2 border-slate-900 hover:bg-slate-900 hover:text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Réinitialiser
              </Button>
              <Button
                onClick={saveEvaluation}
                className="bg-slate-900 text-white hover:bg-slate-700 px-6 py-3 rounded-lg font-bold transition-all duration-300 flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Enregistrer
              </Button>
              <Button
                onClick={exportToExcel}
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-bold transition-all duration-300 flex items-center gap-2"
              >
                <FileUp className="w-5 h-5" />
                Exporter Excel
              </Button>
            </div>
          </div>
        ) : (
          // Liste des évaluations avec DataTable
          <div className="bg-white rounded-lg shadow-2xl p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              📋 Liste des Évaluations
            </h2>
            <DataTable
              columns={evaluationListColumns}
              data={evaluations}
              TypeFilter="agent"
              DateFilter="dateEval"
            />
          </div>
        )}
      </div>
    </div>
  );
}
