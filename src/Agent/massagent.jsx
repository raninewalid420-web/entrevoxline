"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// 🔹 Données
const regions = {
  "Ali-Sabieh": [],
  Dikhil: [],
  Obock: [],
  ARTA: [],
  Tadjourah: [],
  "Djibouti-ville": [],
};
const communesDjibouti = ["Balbala", "Boulaos", "Ras-Dika"];
const quartiersBalbala = [
  "PK20",
  "Balbala 04",
  "PK12",
  "Balbala 05",
  "Hablayeh",
  "T3",
  "Doraleh",
  "Cheikh moussa",
  "Cité Cheikh osman",
  "cité Hodan",
  "cité Hodan 2",
  "Barwago 1",
  "Barwago 2",
  "cité nassib",
  "Torabora",
  "cite doumeura",
  "cite gargar",
  "pk13",
  "Balbala 2,Agadalise",
];
const quartiersBoulaos = [
  "Quartier 1",
  "Quartier 2",
  "Quartier 3",
  "Quartier 4",
  "Quartier 5",
  "Quartier 6",
  "Quartier 7",
  "Quartier 7 bis",
  "Arhiba",
  "Stade",
  "Ambouli",
  "Einguela",
];
const quartiersRasdika = ["Plateau", "Marabout", "Héron", "Serpent", "Paid"];

const regionspurcas = {
  "Ali-Sabieh": [
    "Holl-Holl",
    "Hamboucto",
    "Assamo",
    "Ali-Addeh",
    "Ara-Madowleh",
  ],
  Dikhil: ["Gami", "Gobaad", "Hanle", "Harou", "Mouloud", "Sheikhatou"],
  Obock: [
    "Oulma",
    "Wadii",
    "Assasan",
    "Soublaley",
    "Ilisola",
    "Oued-obocki",
    "Bissidirou",
  ],
  ARTA: ["Omar Jagac", "PK50", "PK20", "Atar/Dmarjog", "Wea"],
  Tadjourah: ["Andabba", "Dorra", "Ardo", "Bankoualeh", "PK9", "Dafenatou"],
  "Djibouti-ville": ["Balbala", "Boulaos", "Ras-Dika"],
};

const Deleguerpurcas = {
  "Holl-Holl": ["Rahma Osman Ali"],
  Hamboucto: ["Moustapha Djama"],
  Assamo: ["Fathia Idleh Doubed"],
  "Ali-Addeh": ["Harbi Sabrieh Darar"],
  "Ara-Madowleh": ["Mohammed Hassan Ismael"],
  Gami: ["Abdallah Robleh"],
  Gobaad: ["Mohamed Loita Ibrahim"],
  // ...reste des délégués
};

// 🔹 Composants personnalisés pour projets PURCSA (inchangé)
const RegionSelect = ({ name, register }) => (
  <select {...register(name)} className="border p-2 rounded w-full">
    <option value="">Sélectionner une région</option>
    {Object.keys(regionspurcas).map((r) => (
      <option key={r} value={r}>
        {r}
      </option>
    ))}
  </select>
);

const LocaliteSelect = ({ name, register, values }) => {
  const region = values.region;
  const localites = region ? regionspurcas[region] : [];
  return (
    <select {...register(name)} className="border p-2 rounded w-full">
      <option value="">Sélectionner une localité</option>
      {localites.map((l) => (
        <option key={l} value={l}>
          {l}
        </option>
      ))}
    </select>
  );
};

const DeleguerSelect = ({ name, register, values }) => {
  const localite = values.localite;
  const delegues = localite ? Deleguerpurcas[localite] || [] : [];
  return (
    <select {...register(name)} className="border p-2 rounded w-full">
      <option value="">Sélectionner un délégué</option>
      {delegues.map((d) => (
        <option key={d} value={d}>
          {d}
        </option>
      ))}
    </select>
  );
};

// 🔹 Composants personnalisés pour projets ASERI
const AseriRegionSelect = ({ name, register }) => (
  <select {...register(name)} className="border p-2 rounded w-full">
    <option value="">Sélectionner une région</option>
    {Object.keys(regions).map((r) => (
      <option key={r} value={r}>
        {r}
      </option>
    ))}
  </select>
);

const AseriCommuneSelect = ({ name, register, values }) => {
  const region = values.region_aseri;
  let communes = [];
  if (region === "Djibouti-ville") communes = communesDjibouti;
  return (
    <select {...register(name)} className="border p-2 rounded w-full">
      <option value="">Sélectionner une commune</option>
      {communes.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
};

const AseriQuartierSelect = ({ name, register, values }) => {
  const commune = values.commune;
  let quartiers = [];
  if (commune === "Balbala") quartiers = quartiersBalbala;
  else if (commune === "Boulaos") quartiers = quartiersBoulaos;
  else if (commune === "Ras-Dika") quartiers = quartiersRasdika;
  return (
    <select {...register(name)} className="border p-2 rounded w-full">
      <option value="">Sélectionner un quartier</option>
      {quartiers.map((q) => (
        <option key={q} value={q}>
          {q}
        </option>
      ))}
    </select>
  );
};

// 🔹 Mapping composants dynamiques
const customComponents = {
  regionSelect: RegionSelect,
  localiteSelect: LocaliteSelect,
  deleguerSelect: DeleguerSelect,
  aseriRegionSelect: AseriRegionSelect,
  aseriCommuneSelect: AseriCommuneSelect,
  aseriQuartierSelect: AseriQuartierSelect,
};

// 🔹 Validation Zod
const schema = z.object({
  numero_plainte: z.string().nonempty("Numéro requis"),
  date_enregistrement: z.string().nonempty("Date requise"),
  nom_plaignant: z.string().nonempty("Nom du plaignant requis"),
  nom_conjoint: z.string().optional(),
  telephone: z.string().nonempty("Téléphone requis"),
  date_naissance: z.string().nonempty("Date de naissance requise"),
  genre: z.string().nonempty("Genre requis"),
  cin: z.string().optional(),
  categorie_plainte: z.string().nonempty("Catégorie requise"),
  // Champs dynamiques
  region: z.string().optional(),
  localite: z.string().optional(),
  region_aseri: z.string().optional(),
  commune: z.string().optional(),
  quartier: z.string().optional(),
  description: z.string().optional(),
  nomdeleguer: z.string().optional(),
  categorie: z.string().optional(),
  type_probleme_ps: z.string().optional(),
});

// 🔹 Composants MassAgent
export default function MassAgent() {
  const { register, handleSubmit, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      numero: 1,
      date: "",
      nom: "",
      conjointe: "",
      telephone: "",
      quartiers_impact: "",
      date_naissance: "",
      genre: "",
      cin: "",
      type_plainte: "",
      projet: "",
      information: "",
      region: "",
      region_aseri: "",
      localite: "",
      commune: "",
      quartier: "",
      description: "",
      num_etudiant: "",
      hr: "",
      nomdeleguer: "",
      categorie: "",
      type_activite: "",
      sous_type_ouvrage: "",
      date_depot: "",
      date_resolution: "",
      resolution_comite: "",
      satisfaction: "",
      status_plainte: "",
      type: "",
      type_probleme_aseri: "",
      type_probleme_fresh_food: "",
      type_probleme_agr: "",
      type_probleme_eaps: "",
      type_probleme_crec: "",
      type_probleme_pass: "",
      type_probleme_pirb: "",
    },
  });
  const [project, setProject] = React.useState("purcsa");
  const values = watch();

  const onSubmit = (data) => {
    
    alert("Formulaire envoyé !");
  };

  // 🔹 Définition des champs dynamiques (simplifié pour l'exemple)
  // -------------------- Champs dynamiques --------------------
  const projectFields = {
    purcsa: [
      {
        name: "region",
        type: "custom",
        component: "regionSelect",
        label: "Région",
      },
      {
        name: "localite",
        type: "custom",
        component: "localiteSelect",
        label: "Localité",
        dependsOn: "region",
      },
      { name: "description", type: "textarea", label: "Description" },
      {
        name: "nomdeleguer",
        type: "custom",
        component: "deleguerSelect",
        label: "Nom du délégué",
      },
      {
        name: "categorie",
        type: "select",
        label: "Catégorie",
        options: ["solvable", "non_solvable"],
      },
      {
        name: "type_activite",
        type: "select",
        label: "Plainte / Type d’activité",
        options: ["Agriculture", "Ouvrage"],
      },
      {
        name: "sous_type_ouvrage",
        type: "select",
        label: "Sous-type d’ouvrage",
        options: ["Seuil", "Barrage", "Infrastructure"],
        condition: (values) => values.type_activite === "Ouvrage",
      },
      { name: "date_depot", type: "date", label: "Date Dépôt" },
      { name: "date_resolution", type: "date", label: "Date Résolution" },
      {
        name: "resolution_comite",
        type: "textarea",
        label: "Résolution Comité Local",
      },
      {
        name: "satisfaction",
        type: "select",
        label: "Satisfaction",
        options: ["Oui", "Non"],
      },
      {
        name: "status_plainte",
        type: "select",
        label: "Status de plainte",
        options: ["En cours", "Fermé"],
      },
    ],
    ps: [
      // Comme PURCSA + Type
      {
        name: "region_aseri",
        type: "custom",
        component: "aseriRegionSelect",
        label: "Région",
      },
      {
        name: "commune",
        type: "custom",
        component: "aseriCommuneSelect",
        label: "Commune",
        dependsOn: "region_aseri",
      },
      {
        name: "quartier",
        type: "custom",
        component: "aseriQuartierSelect",
        label: "Quartier",
        dependsOn: "commune",
      },
      { name: "description", type: "textarea", label: "Description" },
      // { name: "hr", type: "text", label: "" },
      // { name: "nomdeleguer", type: "text", label: "Nom du délégué" },
      // { name: "categorie", type: "select", label: "Catégorie", options: ["solvable", "non_solvable"] },
      {
        name: "type_probleme_ps",
        type: "select",
        label: "Type de plainte",
        options: [
          "Erreur dans le nom du chef de ménage ou du conjoint",
          "Remplacement d’un membre bancarisé par un autre du même ménage",
          "Perte du livret du bénéficiaire",
          "Problème lié à la pièce d’identité",
          "Problème lié à la dynamique de genre",
          "Transfert non perçu",
          "Vivres alimentaires non reçus sur le site de distribution",
          "Probleme lui des employer et l'employeur.",
        ],
      },
      // { name: "date_depot", type: "date", label: "Date Dépôt" },
      // { name: "date_resolution", type: "date", label: "Date Résolution" },
      // { name: "resolution_comite", type: "textarea", label: "Résolution Comité Local" },
      // { name: "satisfaction", type: "select", label: "Satisfaction", options: ["Oui", "Non"] },
      {
        name: "status_plainte",
        type: "select",
        label: "Status de plainte",
        options: ["En cours", "Fermé"],
      },
    ],
    hors_projets: [
      // Comme PURCSA + Type
      {
        name: "region_aseri",
        type: "custom",
        component: "aseriRegionSelect",
        label: "Région",
      },
      {
        name: "commune",
        type: "custom",
        component: "aseriCommuneSelect",
        label: "Commune",
        dependsOn: "region_aseri",
      },
      {
        name: "quartier",
        type: "custom",
        component: "aseriQuartierSelect",
        label: "Quartier",
        dependsOn: "commune",
      },
      { name: "description", type: "textarea", label: "Description" },
    ],
    aseri: [
      {
        name: "region_aseri",
        type: "custom",
        component: "aseriRegionSelect",
        label: "Région",
      },
      {
        name: "commune",
        type: "custom",
        component: "aseriCommuneSelect",
        label: "Commune",
        dependsOn: "region_aseri",
      },
      {
        name: "quartier",
        type: "custom",
        component: "aseriQuartierSelect",
        label: "Quartier",
        dependsOn: "commune",
      },
      {
        name: "type_probleme_aseri",
        type: "select",
        label: "Type de problème",
        options: [
          "Transfert non reçu via D-Money",
          "Changement de numéro de téléphone",
          "Dysfonctionnement de la plateforme D-Money",
          "Demande d’inclusion dans le programme ASERI",
        ],
      },
      {
        name: "num_etudiant",
        type: "text",
        label: "Numéro étudiant universitaire",
      },
      { name: "description", type: "textarea", label: "Description" },
    ],
    fresh_food: [
      {
        name: "region_aseri",
        type: "custom",
        component: "aseriRegionSelect",
        label: "Région",
      },
      {
        name: "commune",
        type: "custom",
        component: "aseriCommuneSelect",
        label: "Commune",
        dependsOn: "region_aseri",
      },
      {
        name: "quartier",
        type: "custom",
        component: "aseriQuartierSelect",
        label: "Quartier",
        dependsOn: "commune",
      },
      {
        name: "type_probleme_fresh_food",
        type: "select",
        label: "Type de problème",
        options: [
          "Perte de la carte SCOOP",
          "Dysfonctionnement de la carte SCOOP",
          "Modification du code PIN de la carte SCOOP",
          "Hausse des prix des denrées alimentaires chez les commerçants",
          "Retard dans le cycle de transfert",
          "Articles alimentaires préférés indisponibles ou quantités réduites en magasin",
          "Qualité des articles alimentaires jugée insuffisante",
          "Demande d’inclusion dans le programme",
        ],
      },
      { name: "description", type: "textarea", label: "Description" },
    ],
    agr: [
      {
        name: "region_aseri",
        type: "custom",
        component: "aseriRegionSelect",
        label: "Région",
      },
      {
        name: "commune",
        type: "custom",
        component: "aseriCommuneSelect",
        label: "Commune",
        dependsOn: "region_aseri",
      },
      {
        name: "quartier",
        type: "custom",
        component: "aseriQuartierSelect",
        label: "Quartier",
        dependsOn: "commune",
      },
      {
        name: "type_probleme_agr",
        type: "select",
        label: "Type de problème",
        options: [
          "Appui financier au démarrage de nouvelles AGR et renforcement des AGR existantes",
          "Montant de prêt jugé insuffisant",
        ],
      },
      { name: "description", type: "textarea", label: "Description" },
    ],
    eaps: [
      {
        name: "region_aseri",
        type: "custom",
        component: "aseriRegionSelect",
        label: "Région",
      },
      {
        name: "commune",
        type: "custom",
        component: "aseriCommuneSelect",
        label: "Commune",
        dependsOn: "region_aseri",
      },
      {
        name: "quartier",
        type: "custom",
        component: "aseriQuartierSelect",
        label: "Quartier",
        dependsOn: "commune",
      },
      {
        name: "type_probleme_eaps",
        type: "select",
        label: "Type de problème",
        options: [
          "Retards constatés dans le transfert en nature.",
          "Insuffisance ou absence d'articles nutritifs.",
          "Demandes d'inclusion au programme.",
          "Sollicitations pour l'acquisition de produits prescrits par ordonnance.",
          "Demandes relatives à la fourniture de produits hygiénique.",
        ],
      },
      { name: "description", type: "textarea", label: "Description" },
    ],
    crec: [
      {
        name: "region",
        type: "custom",
        component: "regionSelect",
        label: "Région",
      },
      {
        name: "localite",
        type: "custom",
        component: "localiteSelect",
        label: "Localité",
        dependsOn: "region",
      },
      {
        name: "nomdeleguer",
        type: "custom",
        component: "deleguerSelect",
        label: "Nom du délégué",
      },
      {
        name: "type_probleme_crec",
        type: "select",
        label: "Type de problème",
        options: [
          "Renforcement et accompagnement d’un groupement existant (transformation en CREC)",
          "Appui à l’accès et à l’accompagnement pour le CREC",
          "Demande de coaching pour les CREC mis en place",
        ],
      },
      { name: "description", type: "textarea", label: "Description" },
    ],
    pass: [
      {
        name: "region",
        type: "custom",
        component: "regionSelect",
        label: "Région",
      },
      {
        name: "localite",
        type: "custom",
        component: "localiteSelect",
        label: "Localité",
        dependsOn: "region",
      },
      { name: "description", type: "textarea", label: "Description" },
      {
        name: "nomdeleguer",
        type: "custom",
        component: "deleguerSelect",
        label: "Nom du délégué",
      },
      {
        name: "type_probleme_pass",
        type: "select",
        label: "Type de problème",
        options: [
          "Demande d’informations sur le programme",
          "Demande d’inclusion",
          "Lenteur dans le traitement des dossiers",
          "Perte de la carte PASS",
          "Changement d’assuré en cas de décès du chef de ménage",
        ],
      },
      {
        name: "status_plainte",
        type: "select",
        label: "Status de plainte",
        options: ["En cours", "Fermé"],
      },
    ],
    pirb: [
      {
        name: "quartiers_impact",
        type: "select",
        label: "Ménages issus des quartiers impactés",
        options: [
          "Balbala Nord",
          "Balbala Ancienne",
          "site Nassib",
          "Holl-Holl ",
          "Ali-Addeh",
        ],
      },
      { name: "description", type: "textarea", label: "Description" },
      {
        name: "type_probleme_pirb",
        type: "select",
        label: "Type de problème",
        options: [
          "Frais de transport non versés",
          "Certificat non délivré",
          "Kit d’auto-emploi non remis",
          "Retarde de versement des autres tranches les associations sélectionnées",
        ],
      },
      {
        name: "status_plainte",
        type: "select",
        label: "Status de plainte",
        options: ["En cours", "Fermé"],
      },
    ],
  };

  const fields = projectFields[project] || [];

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5 rounded-t-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="px-3 py-1 bg-green-800 text-white text-xs font-semibold rounded uppercase tracking-wide">
              MASS - FORMULAIRE DE PLAINTE
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Enregistrement des Plaintes MASS
          </h1>
          <p className="text-white">
            Formulaire unifié pour tous les projets du programme MASS
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 🔵 SECTION FIXE */}
          <div className="space-y-6 bg-white p-5 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-lg font-semibold text-slate-800">
                Informations générales
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label>Numéro de plainte</Label>
                <Input {...register("numero_plainte")} />
              </div>
              <div>
                <Label>Date d'enregistrement</Label>
                <Input type="date" {...register("date_enregistrement")} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label>Nom du plaignant</Label>
                <Input {...register("nom_plaignant")} />
              </div>
              <div>
                <Label>Nom conjoint / manager</Label>
                <Input {...register("nom_conjoint")} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label>Téléphone</Label>
                <Input {...register("telephone")} />
              </div>
              <div>
                <Label>Date de naissance</Label>
                <Input type="date" {...register("date_naissance")} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label>Genre</Label>
                <Select onValueChange={(v) => (values.genre = v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="homme">Homme</SelectItem>
                    <SelectItem value="femme">Femme</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>CIN</Label>
                <Input {...register("cin")} />
              </div>
            </div>

            <div>
              <Label>Catégorie de plainte</Label>
              <Input {...register("categorie_plainte")} />
            </div>
          </div>

          {/* 🟣 SECTION DYNAMIQUE */}
          <div className=" bg-white p-5 shadow-sm">
            <Label className="text-lg font-semibold">
              Informations spécifiques au projet
            </Label>
            <select
              className="border p-2 rounded w-full"
              value={project}
              onChange={(e) => setProject(e.target.value)}
            >
              <option value="purcsa">PURCSA</option>
              <option value="ps">PS</option>
              <option value="aseri">ASERI</option>
              <option value="fresh_food">Fresh Food</option>
              <option value="agr">AGR</option>
              <option value="eaps">EAPS</option>
              <option value="crec">CREC</option>
              <option value="pass">PASS</option>
              <option value="pirb">PIRB</option>
              <option value="hors_projets">Hors projets</option>
            </select>

            <div className="space-y-5 mt-4">
              {fields.map((field) => {
                if (field.dependsOn && !values[field.dependsOn]) return null;
                if (field.type === "custom") {
                  const Component = customComponents[field.component];
                  return (
                    <Component
                      key={field.name}
                      name={field.name}
                      register={register}
                      values={values}
                    />
                  );
                }
                if (field.type === "text")
                  return (
                    <div key={field.name}>
                      <Label>{field.label}</Label>
                      <Input {...register(field.name)} />
                    </div>
                  );
                if (field.type === "textarea")
                  return (
                    <div key={field.name}>
                      <Label>{field.label}</Label>
                      <Textarea {...register(field.name)} />
                    </div>
                  );
                if (field.type === "select")
                  return (
                    <div key={field.name}>
                      <Label>{field.label}</Label>
                      <select
                        {...register(field.name)}
                        className="border p-2 rounded w-full"
                      >
                        <option value="">Sélectionner</option>
                        {field.options.map((op) => (
                          <option key={op} value={op}>
                            {op}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                return null;
              })}
            </div>
            <div className="flex gap-4 pt-6 border-t border-slate-200">
              <Button
                type="submit"
                className="text-white flex-1 bg-slate-700 hover:bg-slate-800 text-lg py-6 font-semibold cursor-pointer"
              >
                Soumettre
              </Button>
            </div>
          </div>
        </form>
        {/* Message final */}
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-5">
          <p className="text-blue-900 text-sm leading-relaxed">
            La plainte sera enregistrée dans le système et traitée selon les
            procédures du projet sélectionné.
          </p>
        </div>
      </div>
    </div>
  );
}
