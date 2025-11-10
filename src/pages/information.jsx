import { DataTable } from "../components/dataTables/data-table"
import { columnsInformation } from "../components/dataTables/columninfo"

// ✅ Données
const dataInformation = [
  {
    Nom: "Abdi said ahmed",
    Compagne: "cartin",
    Telephone: "77830074",
    Commentaire:
      "Le client voulait avoir un facture de son colis avec le tampon de cart'in.",
    Date: "2025-10-22 10:34:58",
    CreerPar: "saharla osman rirach",
  },
  {
    Nom: "gouled hassan",
    Compagne: "Ligne 2020",
    Telephone: "77872094",
    Commentaire:
      "Le client voulait des renseignement sur la banque postale de Djibouti et il a dit qu'il est commerçant et il veut un financement pour son projet.",
    Date: "2025-10-21 10:20:04",
    CreerPar: "saharla osman rirach",
  },
  {
    Nom: "gouled hassan",
    Compagne: "Ligne 2020",
    Telephone: "77872094",
    Commentaire:
      "Le client voulait des renseignement sur la banque postale de Djibouti plus précisément la banque citoyen.",
    Date: "2025-10-21 09:50:08",
    CreerPar: "saharla osman rirach",
  },
  {
    Nom: "Abdiaziz Mourad Abdallah",
    Compagne: "Mass",
    Telephone: "77628288",
    Commentaire:
      "Mr Abdiaziz souhaite recevoir de l'aide financiere de notre part,alors il nous a contacter pour connaître l'état d'avancement de sa demande.",
    Date: "2025-10-20 14:18:05",
    CreerPar: "AYAN SAID",
  },
  {
    Nom: "Hassan Mérito Hassan",
    Compagne: "Mass",
    Telephone: "77443099",
    Commentaire:
      "Le délégué a été contacté au nom d'un bénéficiaire souhaitant obtenir du miel.",
    Date: "2025-10-20 08:57:12",
    CreerPar: "LOULA YASSER",
  },
  {
    Nom: "mohamed joumhoue",
    Compagne: "cartin",
    Telephone: "77072337",
    Commentaire:
      "Monsieur Mohamed a contacté pour obtenir des informations concernant la livraison de son colis, son numéro de commande est le suivant (Dj95490)",
    Date: "2025-10-16 14:38:30",
    CreerPar: "soumaya awaleh aouled",
  },
  {
    Nom: "faycay ibrahim",
    Compagne: "Mass",
    Telephone: "77831694",
    Commentaire:
      "Monsieur Faycal cherchait des renseignements concernant la livraison des accessoires de jardinage.",
    Date: "2025-10-16 10:45:57",
    CreerPar: "soumaya awaleh aouled",
  },
  {
    Nom: "Habib Idriss",
    Compagne: "La Poste",
    Telephone: "77878508",
    Commentaire:
      "Le client souhaite connaître les horaires de la fermeture afin de récupérer son colis.",
    Date: "2025-10-15 15:08:43",
    CreerPar: "LOULA YASSER",
  },
  {
    Nom: "Arayta Ali Kamil",
    Compagne: "Mass",
    Telephone: "77877726",
    Commentaire:
      "Le plaignant souhaite connaître l'état d'avancement de sa plainte. Il s'agit de son troisième appel à ce sujet et il demande une réponse concrète.",
    Date: "2025-10-15 14:13:37",
    CreerPar: "LOULA YASSER",
  },
  {
    Nom: "faycal ibrahim darar",
    Compagne: "Mass",
    Telephone: "77831694",
    Commentaire:
      "Le bénéficiaire a exprimé ses remerciements pour la réponse qui lui a été apportée concernant son jardin. Il a manifesté sa satisfaction quant à la prise en compte de sa demande et à l'attention portée à sa situation.",
    Date: "2025-10-08 09:04:32",
    CreerPar: "Radwan hassan omar",
  },
]

export default function InformationData() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Informations Clients
          </h1>
          <p className="text-slate-600">
            Demandes d'information et renseignements clients
          </p>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5">
            <h2 className="text-xl font-semibold text-white">
              Historique des demandes d'information
            </h2>
          </div>
          <div className="p-6">
            <DataTable columns={columnsInformation} data={dataInformation} />
          </div>
        </div>
      </div>
    </div>
  )
}