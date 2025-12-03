import { createContext, use, useContext, useEffect, useState } from "react";
import useAsync from "../hooks/useAsync";
import {
  AffecterUserToLigne,
  AfficherAffecter,
  DesaffecterUserToLigne,
} from "../api/affectation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AffecterContext = createContext();

export const AffecterProvider = ({ children }) => {
  const [selectedUsers2020, setSelectedUsers2020] = useState([]);
  const [selectedUsersEAB, setSelectedUsersEAB] = useState([]);
  const [selectedUsersDjibTel, setSelectedUsersDjibTel] = useState([]);

  const { loading: DesaLoading, execute: DesaExecute } = useAsync(
    DesaffecterUserToLigne,
    []
  );

  const { loading: AffecterLoading, execute: AffecterExecute } = useAsync(
    AffecterUserToLigne,
    []
  );

  const {
    data: AfficherData,
    error: AfficherError,
    loading: AfficherLoading,
    execute: AfficherExecute,
  } = useAsync(AfficherAffecter, []);

  useEffect(() => {
    AfficherExecute();
  }, [AfficherAffecter]);

  // 🔥 Fonction REFRESH utilisable partout
  const refresh = () => {
    AfficherExecute();
  };

  // Handlers pour ligne 2020
  const handleSubmit2020 = async (e) => {
    e.preventDefault();
    const Data = {
      users: selectedUsers2020,
      ligne: "ligne_2020",
    };
    try {
      const data = await AffecterExecute(Data);
      if (data.success) {
        toast.success("Affectation réussie !");
        refresh(); // ➜ Mise à jour auto
      } else {
        toast.error("Échec de l'affectation.");
      }
    } catch (error) {
      console.error("Erreur lors de l'affectation :", error);
    }
  };

  // Handlers pour ligne EAB
  const handleSubmitEAB = async (e) => {
    e.preventDefault();
    const Data = {
      users: selectedUsersEAB,
      ligne: "ligne_EAB",
    };
    try {
      const data = await AffecterExecute(Data);
      if (data.success) {
        toast.success("Affectation réussie !");
        refresh(); // ➜ Mise à jour auto
      } else {
        toast.error("Échec de l'affectation.");
      }
    } catch (error) {
      console.error("Erreur lors de l'affectation :", error);
    }
  };

  // Handlers pour ligne Djib Tel
  const handleSubmitDjibTel = async (e) => {
    e.preventDefault();
    const Data = {
      users: selectedUsersDjibTel,
      ligne: "ligne_djib_tel",
    };
    try {
      const data = await AffecterExecute(Data);
      if (data.success) {
        toast.success("Affectation réussie !");
        refresh(); // ➜ Mise à jour auto
      } else {
        toast.error("Échec de l'affectation.");
      }
    } catch (error) {
      console.error("Erreur lors de l'affectation :", error);
    }
  };

  // 🟦 Désaffecter + rafraîchir automatiquement
  const handleDesactiver = async (id) => {
    try {
      const data = await DesaExecute(id);

      if (data.success) {
        toast.success("Désaffectation réussie !");
        refresh(); // ➜ Mise à jour auto
      } else {
        toast.error("Échec de la désaffectation.");
      }
    } catch (error) {
      console.error("Erreur lors de la désaffectation :", error);
    }
  };

  return (
    <AffecterContext.Provider
      value={{
        AfficherData,
        AfficherError,
        AfficherLoading,
        AfficherExecute,
        refresh, // 🔥 Fonction publique

        // Actions améliorées
        handleDesactiver,
        handleSubmit2020,
        handleSubmitEAB,
        handleSubmitDjibTel,
        selectedUsers2020,
        setSelectedUsers2020,
        selectedUsersEAB,
        setSelectedUsersEAB,
        selectedUsersDjibTel,
        setSelectedUsersDjibTel,

        DesaLoading,
        AffecterLoading,
      }}
    >
      {children}
    </AffecterContext.Provider>
  );
};

export const useAffecter = () => useContext(AffecterContext);
