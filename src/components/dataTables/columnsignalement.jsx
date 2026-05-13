import React, { useState } from "react";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";
// ⚠️ Remplace par ta vraie fonction d'update signalement
import { PartialUpdateSignalement } from "../../api/signalement";

// ✅ Composant d'action — même structure que CellAction de l'AGR
const CellActionSignalement = ({
  id,
  nom,
  tel,
  nom_commerce,
  produit,
  prix_depart,
  prix_actuel,
  details,
  updated_at,
}) => {
  const [newNom, setNewNom] = useState(nom);
  const [newTel, setNewTel] = useState(tel);
  const [newNomCommerce, setNewNomCommerce] = useState(nom_commerce);
  const [newProduit, setNewProduit] = useState(produit);
  const [newPrixDepart, setNewPrixDepart] = useState(prix_depart);
  const [newPrixActuel, setNewPrixActuel] = useState(prix_actuel);
  const [newDetails, setNewDetails] = useState(details);

  const { user } = useAuth();

  if (user?.role !== "chefCentre") {
    return null;
  }

  const handleSave = async () => {
    const donnee = {
      nom: newNom,
      tel: newTel,
      nom_commerce: newNomCommerce,
      produit: newProduit,
      prix_depart: newPrixDepart,
      prix_actuel: newPrixActuel,
      details: newDetails,
      updated_by: user?.id,
      updated_at: new Date().toISOString(),
    };

    // console.log("DONNÉE ENVOYÉE :", donnee);

    try {
      const response = await PartialUpdateSignalement(donnee, id);
      if (response?.success) {
        toast.success("Mise à jour réussie ✅");
      } else {
        toast.error("Échec : " + (response?.error || "Erreur inconnue"));
        console.log(response?.details)
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-1">
          <Pencil className="w-4 h-4" />
          Modifier
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Modifier le signalement de <strong>{nom}</strong>
          </DialogTitle>
          <DialogDescription>
            ID du signalement : <strong>{id}</strong>
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

        <div className="space-y-4">
          {/* Nom */}
          <div>
            <label className="text-sm font-semibold">Nom</label>
            <input
              type="text"
              value={newNom}
              onChange={(e) => setNewNom(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Téléphone */}
          <div>
            <label className="text-sm font-semibold">Téléphone</label>
            <input
              type="text"
              value={newTel}
              onChange={(e) => setNewTel(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Nom du commerce */}
          <div>
            <label className="text-sm font-semibold">Nom du commerce</label>
            <input
              type="text"
              value={newNomCommerce}
              onChange={(e) => setNewNomCommerce(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Produit concerné */}
          <div>
            <label className="text-sm font-semibold">Produit concerné</label>
            <input
              type="text"
              value={newProduit}
              onChange={(e) => setNewProduit(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Prix départ */}
          <div>
            <label className="text-sm font-semibold">Prix départ</label>
            <input
              type="number"
              value={newPrixDepart}
              onChange={(e) => setNewPrixDepart(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Prix actuel */}
          <div>
            <label className="text-sm font-semibold">Prix actuel</label>
            <input
              type="number"
              value={newPrixActuel}
              onChange={(e) => setNewPrixActuel(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Commentaire / Détails */}
          <div>
            <label className="text-sm font-semibold">Commentaire</label>
            <Textarea
              value={newDetails}
              onChange={(e) => setNewDetails(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="secondary">Annuler</Button>
            <Button onClick={handleSave}>Enregistrer</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ✅ Colonnes du tableau Signalement
export const Signalementcolumns = [
  { accessorKey: "date", header: "Date" },
  { accessorKey: "nom", header: "Nom" },
  { accessorKey: "tel", header: "Téléphone" },
  { accessorKey: "nature", header: "Nature" },
  { accessorKey: "commune", header: "Commune" },
  { accessorKey: "zone", header: "Quartier" },
  { accessorKey: "commerce", header: "Type Commerce" },
  { accessorKey: "nom_commerce", header: "Nom commerce" },
  { accessorKey: "prix_depart", header: "Prix départ" },
  { accessorKey: "prix_actuel", header: "Prix actuel" },
  { accessorKey: "comparaison", header: "Comparaison" },
  {
    accessorKey: "details",
    header: "Commentaire",
    cell: ({ row }) => (
      <div className="min-w-[500px] max-w-[700px] whitespace-pre-wrap">
        {row.original.details}
      </div>
    ),
  },
  {
    accessorKey: "anonyme",
    header: "Anonyme",
    cell: ({ row }) => {
      const value = row.original.anonyme;
      const isAnonyme = value === true || value === 1 || value === "1";
      return (
        <span className={`font-semibold ${isAnonyme ? "text-green-600" : "text-red-600"}`}>
          {isAnonyme ? "Oui" : "Non"}
        </span>
      );
    },
  },
  {
    accessorKey: "Agent",
    header: "Creer par",
  },
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
    cell: ({ row }) => (
      <CellActionSignalement
        id={row.original.id}
        nom={row.original.nom}
        tel={row.original.tel}
        nom_commerce={row.original.nom_commerce}
        produit={row.original.produit}
        prix_depart={row.original.prix_depart}
        prix_actuel={row.original.prix_actuel}
        details={row.original.details}
        updated_at={row.original.updated_at}
      />
    ),
  },
];
