import { X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { Button } from "../ui/button";
import useAsync from "../../hooks/useAsync";
import {
  AfficherAffecter,
  DesaffecterUserToLigne,
} from "../../api/affectation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useAffecter } from "../../context/AffecterContext";

// ✅ Boîte de confirmation action
const CellAction = ({ id, name }) => {
 
  const {handleDesactiver,DesaLoading} = useAffecter();


  return (
    <Dialog>
      <ToastContainer position="top-center" />
      <DialogTrigger asChild>
        <Button
          className={` bg-red-700 hover:bg-red-900 text-white cursor-pointer`}
        >
          Desaffecter
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Desaffecter {name} ?</DialogTitle>
          <DialogDescription>
            Cette action est irréversible. Voulez-vous vraiment supprimer cet
            élément ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Non</Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={() => handleDesactiver(id)}
            className={` bg-red-700 hover:bg-red-900 text-white cursor-pointer`}
          >
            {DesaLoading ? "Chargement ..." : "Oui"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ✅ Colonnes du tableau adaptées aux données API
export const columnAfficher = [
  { accessorKey: "name", header: "Nom" },
  { accessorKey: "type_ligne", header: "Type de ligne" },
  { accessorKey: "active", header: "Status" },
  { accessorKey: "created_at", header: "Créé le" },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original.id_user;
      const name = row.original.name;
      return <CellAction id={id} name={name} />;
    },
  },
];
