// columns.jsx - Configuration des colonnes pour la grille d'évaluation

// Configuration des équipes
export const equipes = [
  {
    name: "Équipe Matin",
    value: "matin",
    horaire: "8h-16h"
  },
  {
    name: "Équipe Soir",
    value: "soir",
    horaire: "16h-22h"
  }
];

// Créneaux horaires par équipe
export const timeSlotsConfig = {
  matin: [
    "8h-9h",
    "9h-10h",
    "10h-11h",
    "11h-12h",
    "12h-13h",
    "13h-14h",
    "14h-15h",
    "15h-16h"
  ],
  soir: [
    "16h-17h",
    "17h-18h",
    "18h-19h",
    "19h-20h",
    "20h-21h",
    "21h-22h"
  ]
};

// Nombre d'appels possibles (1 à 4)
export const nombreAppels = [1, 2, 3, 4];

export const evaluationCriteria = [
  {
    id: 1,
    description: "Accueil : Le téléconseiller souhaite la bienvenue et présente le service avec un bonjour enthousiaste.",
    maxScore: 7,
    category: "Accueil"
  },
  {
    id: 2,
    description: "PRISE EN CHARGE ET RASSURANCE : À respecter la structure d'appel et de l'appel transféré faire correctement l'accueil et valider avec le client s'il a d'autres questions",
    maxScore: 10,
    category: "Prise en charge"
  },
  {
    id: 3,
    description: "Identification de l'appelant : Demander au minimum le nom de votre interlocuteur pour fluidifier la conversation.",
    maxScore: 5,
    category: "Identification"
  },
  {
    id: 4,
    description: "Déterminer la raison de l'appel : Écouter et questions ouvertes, et fermées (Aide à formuler la demande).",
    maxScore: 7,
    category: "Identification"
  },
  {
    id: 5,
    description: "Comprendre la demande : Reformuler (Si j'ai bien compris...)",
    maxScore: 10,
    category: "Identification"
  },
  {
    id: 6,
    description: "TON, COURTOISIE ET PROFESSIONNALISME",
    maxScore: 10,
    category: "Comportement"
  },
  {
    id: 7,
    description: "GESTION DE STRESS",
    maxScore: 10,
    category: "Comportement"
  },
  {
    id: 8,
    description: "CONNAISSANCE DES PRODUITS ET SERVICES",
    maxScore: 10,
    category: "Compétences"
  },
  {
    id: 9,
    description: "Respect de la procédure de mise en attente (aviser le client de la raison et du délai de mise en attente)",
    maxScore: 3,
    category: "Procédures"
  },
  {
    id: 10,
    description: "Répondre aux questions posées : Donner la réponse adéquate, clarté des informations apportées.",
    maxScore: 5,
    category: "Procédures"
  },
  {
    id: 11,
    description: "Valider la compréhension des réponses données",
    maxScore: 5,
    category: "Procédures"
  },
  {
    id: 12,
    description: "Temps de la réponse",
    maxScore: 3,
    category: "Procédures"
  },
  {
    id: 13,
    description: "Proactivité dans la résolution des problèmes",
    maxScore: 5,
    category: "Engagement"
  },
  {
    id: 14,
    description: "Collaboration avec les autres départements",
    maxScore: 3,
    category: "Engagement"
  },
  {
    id: 15,
    description: "Valider si l'interlocuteur a d'autres questions : Si Oui répondre aux questions, si Non passer à l'étape suivante.",
    maxScore: 5,
    category: "Clôture"
  },
  {
    id: 16,
    description: "Prise de congé : Remercier avec une formule de politesse adaptée et personnalisée.",
    maxScore: 2,
    category: "Clôture"
  }
];

export const applicableOptions = ["A", "NA", "RAS"];

// Colonnes pour le tableau de liste des évaluations
export const evaluationListColumns = [
  {
    accessorKey: "dateEval",
    header: "Date",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("dateEval")}</div>
    ),
  },
  {
    accessorKey: "equipe",
    header: "Équipe",
    cell: ({ row }) => {
      const equipe = row.getValue("equipe");
      const bgColor = equipe === "matin" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700";
      return (
        <div className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${bgColor}`}>
          {equipe === "matin" ? "Matin (8h-16h)" : "Soir (16h-22h)"}
        </div>
      );
    },
  },
  {
    accessorKey: "agent",
    header: "Agent",
    cell: ({ row }) => (
      <div className="font-semibold text-slate-900">{row.getValue("agent")}</div>
    ),
  },
  {
    accessorKey: "nombreAppels",
    header: "Nb Appels",
    cell: ({ row }) => (
      <div className="text-center font-bold text-blue-600">{row.getValue("nombreAppels")}</div>
    ),
  },
  {
    accessorKey: "callIds",
    header: "IDs Appels",
    cell: ({ row }) => {
      const ids = row.getValue("callIds") || [];
      return (
        <div className="text-xs text-slate-600 max-w-[200px]">
          {ids.filter(id => id).map((id, idx) => (
            <div key={idx} className="truncate">
              {idx + 1}. {id}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "evalType",
    header: "Type",
    cell: ({ row }) => (
      <div className="text-sm">{row.getValue("evalType")}</div>
    ),
  },
  {
    accessorKey: "generalAverage",
    header: "Moyenne",
    cell: ({ row }) => {
      const avg = parseFloat(row.getValue("generalAverage"));
      const color = avg >= 80 ? "text-green-600" : avg >= 60 ? "text-yellow-600" : "text-red-600";
      return (
        <div className={`font-bold ${color}`}>
          {avg.toFixed(1)}%
        </div>
      );
    },
  },
  {
    accessorKey: "timestamp",
    header: "Créé le",
    cell: ({ row }) => (
      <div className="text-xs text-slate-500">
        {new Date(row.getValue("timestamp")).toLocaleString("fr-FR")}
      </div>
    ),
  },
];