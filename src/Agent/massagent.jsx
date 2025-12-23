"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";
import { Add_Mass_Project, Mass_LastNumero } from "../api/mass";
import useAsync from "../hooks/useAsync";
import { Loader2 } from "lucide-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// -------------------- Données régions et localités --------------------
const regions = {
  "Ali-Sabieh": [],
  Dikhil: [],
  Obock: [],
  ARTA: [],
  Tadjourah: [],
  "Djibouti-ville": [],
};

const regionspurcas= {
  "Ali-Sabieh": [
    "Holl-Holl",
    "Hamboucto",
    "Assamo",
    "Ali-Addeh",
    "Ara-Madowleh",
    "Goubetto",
    "Daasbiyo",
  ],

  Dikhil: [
    "Gami",
    "Gobaad",
    "Hanle",
    "Harou",
    "Mouloud",
    "Sheikhatou",
    "Koutabouya",
    "Biida",
    "Seik-sabir",
    "Harougo",
    "Galamo",
    "Bondara",
    "Yoboki",
    "Dakka",
    "Moutrous",
  ],

  Obock: [
    "Oulma",
    "Wadii",
    "Assasan",
    "Soublaley",
    "Ilisola",
    "Oued-obocki",
    "Bissidirou",
    "Khor-angar",
    "Alaylou",
    "Obocki",
    "Geuherlé",
    "Bossali",
    "Fididis",
    "Ado-Daaba",
    "Qaga",
    "Amassa",
    "Arafa",
  ],

  ARTA: [
    "Omar Jagac",
    "PK50",
    "PK20",
    "Atar/Dmarjog",
    "Wea",
    "Ali-oune",
  ],

  Tadjourah: [
    "Andabba",
    "Dorra",
    "Ardo",
    "Bankoualeh",
    "PK9",
    "Dafenatou",
    "Guirori",
    "Kalaf",
    "Sagalou",
    "Douloul",
    "Hambokka",
    "Toha",
    "Randa",
    "Ibna-Radi",
    "Loublakleh",
    "Garassou",
    "Magaleh",
    "Halou",
    "Mabla",
    "Hoboy-harak",
    "Day",
    "Debné",
    "Ambabo",
    "Daymoli",
    "Galaqto",
    "Lagalene",
    "Balho",
    "Dooda",
    "Menguela",
    "Bouyya",
    "Ilayasa",
    "Koulayou",
    "Gilagibleh",
    "Adoyla",
    "Madgoul",
    "Adaillou",
    "Assa-Gayla",
    "Garabtisan",
    "Ripta",
    "Wakir",
    "Wabeyta",
    "Mounkour",
    "Waydarim",
    "Otoy ",
    "Aylaadou",
    "Boli",
    "Ougoulfoum",
    "Gablablou",
    "Kalou",
    "Dar’Dara",
    "Hedargabo",
    "Alaf’af",
    "Malaho",
    "Saboub",
    "Dok’af",
  ],
};

// Noms délégués par localité
const Deleguerpurcas= {
  "Dok’af": ["Ali Kamil Orbiso"],
  "Saboub": ["Med Kamil Med"],
  "Aylaadou": ["Ali Hassan Med"],
  "Boli": ["Med Kamil Ali"],
  "Ougoulfoum": ["Abdo Ali Hamdou "],
  "Gablablou": ["Med Hamadou"],
  "Kalou": ["Ahmed Ali Med"],
  "Dar’Dara": ["Med Ali Med"],
  "Hedargabo": ["Houmed Med Houmed"],
  "Alaf’af": ["Badoul Gama Ali"],
  "Malaho": ["Med Aden Moussa"],
  "Moutrous": ["Hamad Mohamed Aidahis"],
  "Otoy ": ["Med Ali Hamadou"],
  "Holl-Holl": ["Rahma Osman Ali"],
  "Hamboucto": ["Moustapha Djama"],
  "Assamo": ["Fathia Idleh Doubed"],
  "Ali-Addeh": ["Harbi Sabrieh Darar"],
  "Ara-Madowleh": ["Mohammed Hassan Ismael"],
  "Goubetto": ["Safia Osman Darar"],
  "Daasbiyo": ["Asma Rayaleh Darar"],

  "Gami": ["Abdallah Robleh"],
  "Gobaad": ["Mohamed Loita Ibrahim"],
  "Hanle": ["Med Ali Kadito"],
  "Harou": ["(aucun dans Excel, tu peux m’en donner un si besoin)"],
  "Mouloud": ["Ayan Moussa Djama"],
  "Sheikhatou": ["Areita"],
  "Koutabouya": ["Med abate hassanle"],
  "Biida": ["Goura Gairo"],
  "Seik-sabir": ["Ali Med Kadito"],
  "Harougo": ["Med Ali Gadito"],
  "Galamo": ["Said Moussa"],
  "Bondara": ["Said Ismail"],
  "Yoboki": ["Hamadou Med Hamadou"],
  "Dakka": ["Hamadou Bekela Aramis"],

  "Oulma": ["Ali Ibrahim Mola"],
  "Wadii": ["Omar Obaker Ahmed"],
  "Assasan": ["Ahmed Abdo"],
  "Soublaley": ["Ahmed Ali"],
  "Ilisola": ["Houmed Dini"],
  "Oued-obocki": ["Meika Ali Kamil"],
  "Bissidirou": ["Ali Abdo Abokor"],
  "Khor-angar": ["Ibrahim Med Hamadou"],
  "Alaylou": ["Moussa Ali Omar"],
  "Obocki": ["Faycal Ali Bourhan"],
  "Geuherlé": ["Houmed Ibrahim Med"],
  "Bossali": ["Ahmed Ali Med"],
  "Fididis": ["Assia Hassan Youssouf"],
  "Ado-Daaba": ["Ahmed Kamil Ali"],
  "Qaga": ["Bourhan Abdallah Kamil"],
  "Amassa": ["Ali Mohamed Dato"],
  "Arafa": ["Kamil Med Bourhan"],

  "Omar Jagac": ["Moustapha Abdillahi Darar"],
  "PK50": ["Med Adaweh Djama"],
  "PK20": ["Sadik Med Ali"],
  "Atar/Dmarjog": ["Farhan Adaweh Guelleh"],
  "Wea": ["Moussa Ahmed Sougueh"],
  "Ali-oune": ["Djama Hassan Miguil"],

  "Andabba": ["Biida Ali Ahmed"],
  "Dorra": ["Mohamed Ali Mohamed"],
  "Ardo": ["Houmed Sheik Ahmed"],
  "Bankoualeh": ["Ahmed Med Hamad"],
  "PK9": ["Med Aboubaker Sadik"],
  "Dafenatou": ["Ali Kamil"],
  "Guirori": ["Ibrahim Ali Med"],
  "Kalaf": ["Med Soubourou"],
  "Sagalou": ["Med Goura Med"],
  "Douloul": ["Hasna Ahmed"],
  "Hambokka": ["Kabo Isse Idriss"],
  "Toha": ["Ahmed Baragoita Houssein"],
  "Randa": ["Mohamed Ali Issa"],
  "Ibna-Radi": ["Moussa Ahmed Houssein"],
  "Loublakleh": ["Moussa Kamil Bila"],
  "Garassou": ["Mohamed Daoud Mohamed"],
  "Magaleh": ["Gadito Gabir Rouffa"],
  "Halou": ["Moussa Adoyta Mohamed"],
  "Mabla": ["Ali Moussa Hassan"],
  "Hoboy-harak": ["Hassan Mohamed Houssein"],
  "Day": ["Hassan Merito Houssein"],
  "Debné": ["Mohamed Ahmed Mohamed"],
  "Ambabo": ["Mohamed Ali Aboubaker"],
  "Daymoli": ["Houmed Ibrahim Moussa"],
  "Galaqto": ["Kamil Ibrahim Ahmed"],
  "Lagalene": ["Ali Hagueyta Ali"],
  "Balho": ["Badoul Youssouf Ali"],
  "Dooda": ["Hamadou Med Hmadou"],
  "Menguela": ["Fatouma Ibanoh Youssouf"],
  "Bouyya": ["Ibrahim Ali Ibrahim"],
  "Ilayasa": ["Aramis Med Ali"],
  "Koulayou": ["Nour Ali Kamil"],
  "Gilagibleh": ["Mohamed Kamil Ali"],
  "Adoyla": ["Mohamed Houmed Alshab"],
  "Madgoul": ["Aboubaker Moussa Mohamed"],
  "Adaillou": ["Mohamed Ibrahim Abdallah"],
  "Assa-Gayla": ["Ahmed Mohamed Hassan"],
  "Garabtisan": ["Youssouf Badoul Youssouf"],
  "Ripta": ["Idriss Mohamed Hassan"],
  "Wakir": ["Houmed Ali Med"],
  "Wabeyta": ["Mohamed Obaker Houmed"],
  "Mounkour": ["Aramis Ali Mohamed"],
  "Waydarim": ["Abdo Ahmed Youssouf"],
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
  "cite doumeira",
  "cite gargar",
  "pk13",
  "Balbala 2,Agadalise",
  "bulduqo",
  "Bioked",
  "wahledaba",
  "warabaley",
  "Balbala T9",
  "Chabeley",
  "PK14",
  "cité Moustakaire",
  "8 mètres",
  " 4 mètres",
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
  "Zone industrielle",
  "Jamal",
  "Gabode 4",
];
const quartiersRasdika = ["Plateau", "Marabout", "Héron", "Serpent", "Paid"];

// -------------------- Schéma Zod --------------------
const FormSchema = z.object({
  numero: z.number().min(1),
  date: z.string().nonempty(),
  nom: z.string().optional(),
  conjointe: z.string().optional(),
  telephone: z.string().optional(),
  quartiers_impact: z.string().optional(),
  date_naissance: z.string().optional(),
  genre: z.string().optional(),
  cin: z.string().optional(),
  type_plainte: z.string().optional(),
  projet: z.string().optional(),
  information: z.string().optional(),
  region: z.string().optional(),
  region_aseri: z.string().optional(),
  localite: z.string().optional(),
  commune: z.string().optional(),
  quartier: z.string().optional(),
  description: z.string().optional(),
  num_etudiant: z.string().optional(),
  hr: z.string().optional(),
  nomdeleguer: z.string().optional(),
  categorie: z.string().optional(),
  type_activite: z.string().optional(),
  sous_type_ouvrage: z.string().optional(),
  date_depot: z.string().optional(),
  date_resolution: z.string().optional(),
  resolution_comite: z.string().optional(),
  satisfaction: z.string().optional(),
  status_plainte: z.string().optional(),
  type: z.string().optional(),
  type_probleme_aseri: z.string().optional(),
  type_probleme_fresh_food: z.string().optional(),
  type_probleme_agr: z.string().optional(),
  type_probleme_eaps: z.string().optional(),
  type_probleme_crec: z.string().optional(),
  type_probleme_pass: z.string().optional(),
  type_probleme_pirb: z.string().optional(),
});

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
    { name: "hr", type: "text", label: "" },
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

// -------------------- Composant principal --------------------
export default function MassAgent() {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [numeroPlainte, setNumeroPlainte] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedLocalite, setselectedLocaliten] = useState(null);
  const [selectedCommune, setSelectedCommune] = useState(null);

  const { register, handleSubmit, control, watch, setValue, reset, formState } =
    useForm({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        numero: "",
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

  const { errors } = formState; // extraction après

  const projetValue = watch("projet");
  const regionValue = watch("region_aseri");
  const communeValue = watch("commune");
  const values = watch();

  const {
    data: LastNumero,
    error: NumError,
    loading: NumLoading,
    execute: NumExecute,
  } = useAsync(Mass_LastNumero, []);

  const { loading: MassLoading, execute: MassExecute } = useAsync(
    Add_Mass_Project,
    []
  );

   const onSubmit = async (data) => {
    console.log("Données du formulaire soumis :", data);
    try {
      const result = await MassExecute(data, user?.id);

      if (result?.success) {
        toast.success("Enregistrée avec succès !");
      } else {
        toast.error("Erreur lors de l'enregistrement.");
      }

      // 🔥 Reset correct
      reset();
    } catch (err) {
      toast.error("Erreur lors de l'enregistrement de la Mass.");
      console.error(err);
    }
  };


  useEffect(() => {
    NumExecute();
    setValue("numero", LastNumero);
    setValue("date", new Date().toISOString().split("T")[0]);
  }, [NumExecute]);

 
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <ToastContainer position="top-center" />
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
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-800">
              Informations générales
            </h2>
          </div>
          {/* Formulaire */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
            {/* ---------------- Partie Fixe ---------------- */}
            {/* Numéro et Date */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-medium">Numéro :</label>
                <input
                  type="number"
                  readOnly
                  {...register("numero", { valueAsNumber: true })}
                  value={LastNumero || ""} // <-- fallback vide si undefined
                  className="w-full border p-2 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="flex-1">
                <label className="block font-medium">Date :</label>
                <input
                  type="date"
                  readOnly
                  {...register("date")}
                  value={new Date().toISOString().split("T")[0] || ""} // <-- fallback
                  className="w-full border p-2 rounded-lg bg-gray-100 cursor-not-allowed"
                />
                {errors.date && (
                  <p className="text-red-500 text-sm">{errors.date.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Nom du plaignant</label>
                <input
                  {...register("nom")}
                  className="w-full border p-2 rounded-lg"
                />
                {errors.nom && (
                  <p className="text-red-500">{errors.nom.message}</p>
                )}
              </div>
              <div>
                <label className="block font-medium">
                  Nom conjointe/manager
                </label>
                <input
                  {...register("conjointe")}
                  className="w-full border p-2 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium">Numero tel1/tel2</label>
                <input
                  {...register("telephone")}
                  className="w-full border p-2 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium">Date de naissance</label>
                <input
                  type="date"
                  {...register("date_naissance")}
                  className="w-full border p-2 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium">Genre</label>
                <select
                  {...register("genre")}
                  className="w-full border p-2 rounded-lg"
                >
                  <option value="">Sélectionner</option>
                  <option value="Homme">Homme</option>
                  <option value="Femme">Femme</option>
                </select>
              </div>
              <div>
                <label className="block font-medium">CIN</label>
                <input
                  {...register("cin")}
                  className="w-full border p-2 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium">
                  Catégorie de plainte
                </label>
                <select
                  {...register("type_plainte")}
                  className="w-full border p-2 rounded-lg"
                >
                  <option value="doleance">Doléance</option>
                  <option value="plainte">Plainte</option>
                  <option value="information">Information</option>
                </select>
              </div>
              {watch("type_plainte") === "information" && (
                <div className="col-span-2">
                  <label className="block font-medium">Information</label>
                  <textarea
                    {...register("information")}
                    className="w-full border p-2 rounded-lg"
                    rows={4}
                    placeholder="Décrire l'information..."
                  />
                </div>
              )}

              <div>
                <label className="block font-medium">Projet</label>
                <Controller
                  control={control}
                  name="projet"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      className="w-full"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un projet" />
                      </SelectTrigger>
                      <SelectContent className="bg-white w-full">
                        <SelectItem
                          value="purcsa"
                          className="cursor-pointer hover:bg-blue-950 hover:text-white"
                        >
                          PURCSA
                        </SelectItem>
                        <SelectItem
                          value="ps"
                          className="cursor-pointer hover:bg-blue-950 hover:text-white"
                        >
                          PS
                        </SelectItem>
                        <SelectItem
                          value="aseri"
                          className="cursor-pointer hover:bg-blue-950 hover:text-white"
                        >
                          ASERI
                        </SelectItem>
                        <SelectItem
                          value="fresh_food"
                          className="cursor-pointer hover:bg-blue-950 hover:text-white"
                        >
                          Fresh Food
                        </SelectItem>
                        <SelectItem
                          value="agr"
                          className="cursor-pointer hover:bg-blue-950 hover:text-white"
                        >
                          AGR
                        </SelectItem>
                        <SelectItem
                          value="eaps"
                          className="cursor-pointer hover:bg-blue-950 hover:text-white"
                        >
                          EAPS
                        </SelectItem>
                        <SelectItem
                          value="crec"
                          className="cursor-pointer hover:bg-blue-950 hover:text-white"
                        >
                          CREC
                        </SelectItem>
                        <SelectItem
                          value="pass"
                          className="cursor-pointer hover:bg-blue-950 hover:text-white"
                        >
                          PASS
                        </SelectItem>
                        <SelectItem
                          value="pirb"
                          className="cursor-pointer hover:bg-blue-950 hover:text-white"
                        >
                          PIRB
                        </SelectItem>
                        <SelectItem
                          value="hors_projets"
                          className="cursor-pointer hover:bg-blue-950 hover:text-white"
                        >
                          Hors projets
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* ---------------- Champs Dynamiques ---------------- */}
            {projetValue && (
              <div className="mt-6 space-y-4">
                <h2 className="text-lg font-semibold text-green-700">
                  Partie spécifique – {projetValue.toUpperCase()}
                </h2>

                {projectFields[projetValue]?.map((field) => {
                  if (field.condition && !field.condition(values)) return null;

                  // Textarea
                  if (field.type === "textarea") {
                    return (
                      <div key={field.name}>
                        <label className="block font-medium">
                          {field.label}
                        </label>
                        <textarea
                          {...register(field.name)}
                          className="w-full border p-2 rounded-lg"
                        />
                      </div>
                    );
                  }

                  // Champs personnalisés
                  if (field.type === "custom") {
                    // Sélection Région ASERI / autres projets similaires
                    if (field.component === "aseriRegionSelect") {
                      return (
                        <div key={field.name}>
                          <label className="block font-medium">
                            {field.label}
                          </label>
                          <Controller
                            control={control}
                            name="region_aseri"
                            render={({ field }) => (
                              <Select
                                onValueChange={(val) => {
                                  field.onChange(val);
                                  setSelectedRegion(val);
                                  setValue("commune", "");
                                  setValue("quartier", "");
                                }}
                                value={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner une région" />
                                </SelectTrigger>
                                <SelectContent className="bg-white w-full">
                                  {Object.keys(regions).map((region) => (
                                    <SelectItem
                                      key={region}
                                      value={region}
                                      className="cursor-pointer hover:bg-blue-950 hover:text-white"
                                    >
                                      {region}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>
                      );
                    }

                    // Sélection Commune
                    if (field.component === "aseriCommuneSelect") {
                      return (
                        <div key={field.name}>
                          <label className="block font-medium">
                            {field.label}
                          </label>
                          <Controller
                            control={control}
                            name="commune"
                            render={({ field }) => (
                              <Select
                                onValueChange={(val) => {
                                  field.onChange(val);
                                  setSelectedCommune(val);
                                  setValue("quartier", "");
                                }}
                                value={field.value}
                                disabled={regionValue !== "Djibouti-ville"}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner une commune" />
                                </SelectTrigger>
                                <SelectContent className="bg-white w-full">
                                  {communesDjibouti.map((comm) => (
                                    <SelectItem
                                      key={comm}
                                      value={comm}
                                      className="cursor-pointer hover:bg-blue-950 hover:text-white"
                                    >
                                      {comm}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>
                      );
                    }

                    // Sélection Quartier
                    if (field.component === "aseriQuartierSelect") {
                      let quartiers = [];
                      if (communeValue === "Balbala")
                        quartiers = quartiersBalbala;
                      if (communeValue === "Boulaos")
                        quartiers = quartiersBoulaos;
                      if (communeValue === "Ras-Dika")
                        quartiers = quartiersRasdika;
                      return (
                        <div key={field.name}>
                          <label className="block font-medium">
                            {field.label}
                          </label>
                          <Controller
                            control={control}
                            name="quartier"
                            render={({ field }) => (
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                disabled={!communeValue}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner un quartier" />
                                </SelectTrigger>
                                <SelectContent className="bg-white w-full">
                                  {quartiers.map((q) => (
                                    <SelectItem
                                      key={q}
                                      value={q}
                                      className="cursor-pointer hover:bg-blue-950 hover:text-white"
                                    >
                                      {q}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>
                      );
                    }

                    // Sélection Région (PURCSA, PS, PASS, PIRB)
                    if (field.component === "regionSelect") {
                      return (
                        <div key={field.name}>
                          <label className="block font-medium">
                            {field.label}
                          </label>
                          <Controller
                            control={control}
                            name="region"
                            render={({ field }) => (
                              <Select
                                onValueChange={(val) => {
                                  field.onChange(val);
                                  setSelectedRegion(val);
                                  setValue("localite", ""); // reset localité quand région change
                                  setValue("nomdeleguer", ""); // reset délégué aussi
                                  setselectedLocaliten(null);
                                }}
                                value={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner une région" />
                                </SelectTrigger>
                                <SelectContent className="bg-white w-full">
                                  {Object.keys(regionspurcas).map((region) => (
                                    <SelectItem
                                      key={region}
                                      value={region}
                                      className="cursor-pointer hover:bg-blue-950 hover:text-white"
                                    >
                                      {region}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>
                      );
                    }

                    // Sélection Localité dépendant de la région
                    if (field.component === "localiteSelect") {
                      const localites = selectedRegion
                        ? regionspurcas[selectedRegion]
                        : [];
                      return (
                        <div key={field.name}>
                          <label className="block font-medium">
                            {field.label}
                          </label>
                          <Controller
                            control={control}
                            name="localite"
                            render={({ field }) => (
                              <Select
                                onValueChange={(val) => {
                                  field.onChange(val);
                                  setselectedLocaliten(val);
                                  setValue("nomdeleguer", ""); // reset délégué quand localité change
                                }}
                                value={field.value}
                                disabled={!selectedRegion}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner une localité" />
                                </SelectTrigger>
                                <SelectContent className="bg-white w-full">
                                  {localites.map((loc) => (
                                    <SelectItem
                                      key={loc}
                                      value={loc}
                                      className="cursor-pointer hover:bg-blue-950 hover:text-white"
                                    >
                                      {loc}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>
                      );
                    }

                    // Sélection Nom délégué dépendant de la localité
                    if (field.component === "deleguerSelect") {
                      const nomdelguer = selectedLocalite
                        ? Deleguerpurcas[selectedLocalite]
                        : [];
                      return (
                        <div key={field.name}>
                          <label className="block font-medium">
                            {field.label}
                          </label>
                          <Controller
                            control={control}
                            name="nomdeleguer" // ✅ corrigé ici (avant c’était "localite")
                            render={({ field }) => (
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                disabled={!selectedLocalite}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner le délégué" />
                                </SelectTrigger>
                                <SelectContent className="bg-white w-full">
                                  {nomdelguer.map((deleguer) => (
                                    <SelectItem
                                      key={deleguer}
                                      value={deleguer}
                                      className="cursor-pointer hover:bg-blue-950 hover:text-white"
                                    >
                                      {deleguer}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>
                      );
                    }
                  }

                  // Input text / date
                  if (["text", "date"].includes(field.type)) {
                    if (field.name === "hr") {
                      return (
                        <div key={field.name}>
                          <hr />
                          <h1 className="text-xl pt-4 font-semibold w-full text-green-700">
                            Partie Traitement Communautaire
                          </h1>
                        </div>
                      );
                    }
                    return (
                      <div key={field.name}>
                        <label className="block font-medium">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          {...register(field.name)}
                          className="w-full border p-2 rounded-lg"
                        />
                      </div>
                    );
                  }

                  // Select classique
                  if (field.type === "select") {
                    return (
                      <div key={field.name}>
                        <label className="block font-medium">
                          {field.label}
                        </label>
                        <Controller
                          control={control}
                          name={field.name}
                          render={({ field: f }) => (
                            <Select onValueChange={f.onChange} value={f.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Choisir" />
                              </SelectTrigger>
                              <SelectContent className="bg-white w-full">
                                {field.options.map((opt) => (
                                  <SelectItem
                                    key={opt}
                                    value={opt}
                                    className="cursor-pointer hover:bg-blue-950 hover:text-white"
                                  >
                                    {opt}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            )}

            {/* Bouton soumission */}
            {/* Boutons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="text-white flex-1 bg-slate-700 cursor-pointer hover:bg-slate-800 text-lg py-6 font-semibold flex items-center justify-center gap-2"
              >
                {MassLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Chargement...
                  </>
                ) : (
                  "Soumettre"
                )}
              </Button>
            </div>
          </form>
        </div>
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
