import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { tr } from "zod/v4/locales";
import { toast, ToastContainer } from "react-toastify";
import { PartialUpdateMass } from "../../api/mass";
import { useAuth } from "../../context/AuthContext";

// ✅ Composant d’action (boîte de confirmation)

const CellAction = ({ nom, id, description, information, cin ,updated_at}) => {
  const { user } = useAuth();

  const [newDescription, setNewDescription] = useState(description);
  const [newInformation, setNewInformation] = useState(information);
  const [newCin, setNewCin] = useState(cin);

  if (user?.role != "chefCentre") {
    return null;
  }

  const handleSave = async () => {
    const Donnee = {
      cin:newCin,
      description: newDescription,
      information: newInformation,
      quartier: "",
      updated_by:user?.id,
      updated_at: new Date().toISOString(),

    };
    try {
      const response = await PartialUpdateMass(Donnee, id);
      if (response.success) {
        toast.success("Mise à jour réussie");
      } else {
        toast.error("Échec de la mise à jour partielle :", response.message);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour partielle :", error);
    }
  };

  return (
    <Dialog>
      <ToastContainer position="top-center" />
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-1">
          <Pencil className="w-4 h-4" />
          Modifier
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Modifier la plainte de <strong>{nom}</strong>
          </DialogTitle>
          <DialogDescription>
            ID de la plainte : <strong>{id}</strong>
          </DialogDescription>
           {updated_at && (
            <p className="text-sm text-gray-500">
              Dernière modification :{" "}
              <strong>
                {new Date(updated_at).toLocaleDateString("fr-FR")}
              </strong>
            </p>
          )}
        </DialogHeader>
        {/* ✅ CIN */}
        <div>
          <label className="text-sm font-semibold">CIN</label>
          <input
            type="text"
            value={newCin}
            onChange={(e) => setNewCin(e.target.value)}
            className="mt-1 w-full border rounded-md px-3 py-2"
          />
        </div>
        {/* description */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold">Description</label>
            <Textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Information</label>
            <Textarea
              value={newInformation}
              onChange={(e) => setNewInformation(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="secondary">Annuler</Button>
            </DialogClose>
            <Button onClick={handleSave}>Enregistrer</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CellAction;

// colonnes purcsa//
export const columnPurcsa = [
  { header: "Numéro plainte", accessorKey: "numero" },
  { header: "Date saisi", accessorKey: "date" },
  { header: "Nom", accessorKey: "nom" },
  { header: "Nom conjointe(e)", accessorKey: "Nomconjointe" },
  { header: "Téléphone", accessorKey: "telephone" },
  { header: "Date Naissance", accessorKey: "Date_naissance" },
  { header: "CIN", accessorKey: "cin" },
  {
    header: "Genre",
    accessorKey: "genre",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          row.original.genre === "Femme"
            ? "bg-blue-100 text-blue-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {row.original.genre}
      </span>
    ),
  },
  { header: "Région", accessorKey: "region" },
  { header: "Localité", accessorKey: "localite" },
  {
    header: "Description plainte",
    accessorKey: "description",
    cell: ({ row }) => (
      <div className="min-w-[500px] max-w-[700px] whitespace-pre-wrap">
        {row.original.description}
      </div>
    ),
  },
  {
    header: "Information",
    accessorKey: "information",
    cell: ({ row }) => (
      <div className="min-w-[500px] max-w-[700px] whitespace-pre-wrap">
        {row.original.information}
      </div>
    ),
  },
  { header: "Nom deleguer", accessorKey: "nomdeleguer" },
  { header: "Date de depot", accessorKey: "date_depot" },
  { header: "Date resolution CL", accessorKey: "date_resolution" },
  {
    header: "Resolution commite local",
    accessorKey: "Resolution_comite_local",
    cell: ({ row }) => (
      <div className="min-w-[250px] max-w-[350px] truncate">
        {row.original.Resolution_comite_local}
      </div>
    ),
  },
  {
    header: "Categorie",
    accessorKey: "categorie",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          row.original.categorie === "solvable"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {row.original.categorie}
      </span>
    ),
  },
  {
    header: "Plainte",
    accessorKey: "type_plainte",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          row.original.type_plainte === "Ouvrage"
            ? "bg-purple-100 text-purple-700"
            : "bg-orange-100 text-orange-700"
        }`}
      >
        {row.original.type_plainte}
      </span>
    ),
  },
  {
    header: "Satisfaction",
    accessorKey: "Satisfaction",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          row.original.Satisfaction === "Oui"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {row.original.Satisfaction}
      </span>
    ),
  },
  {
    header: "Status de plainte",
    accessorKey: "Status_de_plainte",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          row.original.Status_de_plainte === "Fermé"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {row.original.Status_de_plainte}
      </span>
    ),
  },
  { header: "Creer par ", accessorKey: "agent" },
   {
    header: "Dernière modification",
    accessorKey: "updated_at",
    cell: ({ row }) => {
      const date = row.original.updated_at;
      if (!date) return <span className="text-gray-400">—</span>;
      return (
        <span className="text-sm text-gray-700">
          {new Date(date).toLocaleDateString("fr-FR")}
        </span>
      );
    },
  },

  {
    header: "Actions",
    cell: ({ row }) => {
      const nom = row?.original.nom;
      const id = row?.original.id;
      const cin = row?.original.cin;
      const description = row?.original.description;
      const information = row?.original.information;
      const updated_at = row?.original.updated_at;
      return (
        <CellAction
          nom={nom}
          id={id}
          description={description}
          information={information}          
          updated_at={updated_at}          

          cin={cin}
        />
      );
    },
  },
];
