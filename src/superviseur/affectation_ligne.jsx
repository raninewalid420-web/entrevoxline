import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAsync from "../hooks/useAsync";
import {
  AffecterUserToLigne,
  AfficherAffecter,
  DesaffecterUserToLigne,
} from "../api/affectation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataTable } from "../components/dataTables/Tables/data-table";
import { columnAfficher } from "../components/dataTables/columnAffficheAffecter";
import { useAffecter } from "../context/AffecterContext";

export default function AffectationLigne() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    handleSubmit2020,
    handleSubmitEAB,
    handleSubmitDjibTel,
    AfficherLoading,
    AffecterLoading,
    AfficherData,
    setSelectedUsersEAB,
    selectedUsersDjibTel,
    setSelectedUsersDjibTel,
    selectedUsers2020,
    setSelectedUsers2020,
    selectedUsersEAB,
    selectedUsers2020Eab,
    setSelectedUsers2020Eab,
    selectedUsersEABDjibtel,
    setSelectedUsersEABDjibtel,
    selectedUsersDjibTel2020,
    setSelectedUsersDjibTel2020,
    selectedUsersAllLigne,
    setSelectedUsersDjibTelAllLigne,
    handleSubmit2020Eab,
    handleSubmitEABDjibtel,
    handleSubmitDjibTel2020,
    handleSubmitAllLigne,
  } = useAffecter();

  // Récupération des utilisateurs
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://192.168.100.4:8080/CallCentre/callmanager/api.php?method=AllUser"
      );
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Erreur lors du chargement des utilisateurs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Gestion des cases à cocher
  const handleCheckboxChange = (userId, ligne) => {
    if (ligne === "2020") {
      setSelectedUsers2020((prev) =>
        prev.includes(userId)
          ? prev.filter((id) => id !== userId)
          : [...prev, userId]
      );
    } else if (ligne === "EAB") {
      setSelectedUsersEAB((prev) =>
        prev.includes(userId)
          ? prev.filter((id) => id !== userId)
          : [...prev, userId]
      );
    } else if (ligne === "DjibTel") {
      setSelectedUsersDjibTel((prev) =>
        prev.includes(userId)
          ? prev.filter((id) => id !== userId)
          : [...prev, userId]
      );
    } else if (ligne === "mixe2020EAB") {
      setSelectedUsers2020Eab((prev) =>
        prev.includes(userId)
          ? prev.filter((id) => id !== userId)
          : [...prev, userId]
      );
    } else if (ligne === "mixeEABDjibTel") {
      setSelectedUsersEABDjibtel((prev) =>
        prev.includes(userId)
          ? prev.filter((id) => id !== userId)
          : [...prev, userId]
      );
    } else if (ligne === "mixe2020DjibTel") {
      setSelectedUsersDjibTel2020((prev) =>
        prev.includes(userId)
          ? prev.filter((id) => id !== userId)
          : [...prev, userId]
      );
    } else if (ligne === "mixeAllLignes") {
      setSelectedUsersDjibTelAllLigne((prev) =>
        prev.includes(userId)
          ? prev.filter((id) => id !== userId)
          : [...prev, userId]
      );
    }
  };

  const handleSelectAll = (ligne) => {
    const allUserIds = users.map((user) => user.id);
    if (ligne === "2020") {
      setSelectedUsers2020(
        selectedUsers2020.length === users.length ? [] : allUserIds
      );
    } else if (ligne === "EAB") {
      setSelectedUsersEAB(
        selectedUsersEAB.length === users.length ? [] : allUserIds
      );
    } else if (ligne === "DjibTel") {
      setSelectedUsersDjibTel(
        selectedUsersDjibTel.length === users.length ? [] : allUserIds
      );
    } else if (ligne === "mixe2020EAB") {
      setSelectedUsers2020Eab(
        selectedUsers2020Eab.length === users.length ? [] : allUserIds
      );
    } else if (ligne === "mixeEABDjibTel") {
      setSelectedUsersEABDjibtel(
        selectedUsersEABDjibtel.length === users.length ? [] : allUserIds
      );
    } else if (ligne === "mixe2020DjibTel") {
      setSelectedUsersDjibTel2020(
        selectedUsersDjibTel2020.length === users.length ? [] : allUserIds
      );
    } else if (ligne === "mixeAllLignes") {
      setSelectedUsersDjibTelAllLigne(
        selectedUsersAllLigne.length === users.length ? [] : allUserIds
      );
    }
  };

  // Composant de liste d'utilisateurs réutilisable
  const UsersList = ({
    onSubmit,
    buttonText,
    buttonColor,
    ligne,
    selectedUsers,
  }) => (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">
        Liste des agents
      </h3>
      {loading ? (
        <div className="text-center py-8 text-slate-600">
          Chargement des agents...
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-600">{error}</div>
      ) : (
        <>
          <div className="border rounded-lg overflow-hidden mb-5">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={
                          selectedUsers.length === users.length &&
                          users.length > 0
                        }
                        onChange={() => handleSelectAll(ligne)}
                        className="w-4 h-4 rounded border-slate-300 cursor-pointer"
                      />
                    </th>
                    <th className="px-4 py-3 text-left font-bold text-slate-700">
                      Nom
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-t hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() =>
                              handleCheckboxChange(user.id, ligne)
                            }
                            className="w-4 h-4 rounded border-slate-300 cursor-pointer"
                          />
                        </td>
                        <td className="px-4 py-3 font-medium text-slate-800">
                          {user.name}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-8 text-slate-500"
                      >
                        Aucun agent trouvé
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">
              {selectedUsers.length} agent(s) sélectionné(s)
            </span>
            <Button
              onClick={onSubmit}
              disabled={selectedUsers.length === 0}
              className={`${buttonColor} text-white px-8 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all rounded-xl disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {AffecterLoading ? "Chargement....." : buttonText}
            </Button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 w-full">
      <ToastContainer position="top-center" />
      <Tabs defaultValue="ligne2020" className="w-full max-w-7xl mx-auto">
        {/* Onglets */}
        <TabsList className="flex justify-around bg-white rounded-xl mb-6 p-1.5 shadow-md border border-slate-200">
          <TabsTrigger
            value="ligne2020"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-slate-600 hover:text-slate-900 transition-all rounded-lg px-6 py-3 font-semibold"
          >
            Ligne 2020
          </TabsTrigger>
          <TabsTrigger
            value="ligneEAB"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white text-slate-600 hover:text-slate-900 transition-all rounded-lg px-6 py-3 font-semibold"
          >
            Ligne EAB
          </TabsTrigger>
          <TabsTrigger
            value="ligneDjibTel"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white text-slate-600 hover:text-slate-900 transition-all rounded-lg px-6 py-3 font-semibold"
          >
            Ligne Djib Tel
          </TabsTrigger>
          <TabsTrigger
            value="mixe2020EAB"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-500 data-[state=active]:to-slate-600 data-[state=active]:text-white text-slate-600 hover:text-slate-900 transition-all rounded-lg px-6 py-3 font-semibold"
          >
            Mixe ligne 2020 & EAB
          </TabsTrigger>
          <TabsTrigger
            value="MixeEABDjibTel"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-lime-500 data-[state=active]:to-lime-600 data-[state=active]:text-white text-slate-600 hover:text-slate-900 transition-all rounded-lg px-6 py-3 font-semibold"
          >
            Mix ligne EAB & Djib Tel
          </TabsTrigger>
          <TabsTrigger
            value="Mixe2020DjibTel"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white text-slate-600 hover:text-slate-900 transition-all rounded-lg px-6 py-3 font-semibold"
          >
            Mixe ligne 2020 & Djib Tel
          </TabsTrigger>
          <TabsTrigger
            value="MixeAllLignes"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-500 data-[state=active]:to-fuchsia-600 data-[state=active]:text-white text-slate-600 hover:text-slate-900 transition-all rounded-lg px-6 py-3 font-semibold"
          >
            Mix toutes les lignes
          </TabsTrigger>
          <TabsTrigger
            value="AfficherAffecter"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white text-slate-600 hover:text-slate-900 transition-all rounded-lg px-6 py-3 font-semibold"
          >
            Afficher les affectés
          </TabsTrigger>
        </TabsList>

        {/* Onglet Ligne 2020 */}
        <TabsContent value="ligne2020">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-purple-100">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-slate-800">
                Affectation Ligne 2020
              </h2>
            </div>

            <UsersList
              onSubmit={handleSubmit2020}
              buttonText="Affecter la ligne 2020"
              buttonColor="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
              ligne="2020"
              selectedUsers={selectedUsers2020}
            />
          </div>
        </TabsContent>

        {/* Onglet Ligne EAB */}
        <TabsContent value="ligneEAB">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-green-100">
              <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-slate-800">
                Affectation Ligne EAB
              </h2>
            </div>

            <UsersList
              onSubmit={handleSubmitEAB}
              buttonText="Affecter la ligne EAB"
              buttonColor="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              ligne="EAB"
              selectedUsers={selectedUsersEAB}
            />
          </div>
        </TabsContent>

        {/* Onglet Ligne Djib Tel */}
        <TabsContent value="ligneDjibTel">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-100">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-slate-800">
                Affectation Ligne Djib Tel
              </h2>
            </div>

            <UsersList
              onSubmit={handleSubmitDjibTel}
              buttonText="Affecter la ligne Djib Tel"
              buttonColor="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              ligne="DjibTel"
              selectedUsers={selectedUsersDjibTel}
            />
          </div>
        </TabsContent>
        {/* Onglet Ligne Djib Tel */}
        <TabsContent value="mixe2020EAB">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-100">
              <div className="w-1 h-8 bg-gradient-to-b from-slate-500 to-slate-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-slate-800">
                Affectation Ligne 2020 & EAB
              </h2>
            </div>

            <UsersList
              onSubmit={handleSubmit2020Eab}
              buttonText="Affecter Ligne 2030 & EAB"
              buttonColor="bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700"
              ligne="mixe2020EAB"
              selectedUsers={selectedUsers2020Eab}
            />
          </div>
        </TabsContent>
        {/* Onglet Ligne Djib Tel */}
        <TabsContent value="MixeEABDjibTel">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-100">
              <div className="w-1 h-8 bg-gradient-to-b from-lime-500 to-lime-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-slate-800">
                Affectation Ligne EAB & Djib Tel
              </h2>
            </div>

            <UsersList
              onSubmit={handleSubmitEABDjibtel}
              buttonText="Affecter Ligne EAB & Djib Tel"
              buttonColor="bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700"
              ligne="mixeEABDjibTel"
              selectedUsers={selectedUsersEABDjibtel}
            />
          </div>
        </TabsContent>
        {/* Onglet Ligne Djib Tel */}
        <TabsContent value="Mixe2020DjibTel">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-100">
              <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-cyan-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-slate-800">
                Affectation Ligne 2020 & Djib Tel
              </h2>
            </div>

            <UsersList
              onSubmit={handleSubmitDjibTel2020}
              buttonText="Affecter la ligne Djib Tel"
              buttonColor="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700"
              ligne="mixe2020DjibTel"
              selectedUsers={selectedUsersDjibTel2020}
            />
          </div>
        </TabsContent>
        {/* Onglet Ligne Djib Tel */}
        <TabsContent value="MixeAllLignes">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-100">
              <div className="w-1 h-8 bg-gradient-to-b from-fuchsia-500 to-fuchsia-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-slate-800">
                Affectation Tous Les Lignes
              </h2>
            </div>

            <UsersList
              onSubmit={handleSubmitAllLigne}
              buttonText="Affecter Tous Les Lignes"
              buttonColor="bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 hover:from-fuchsia-600 hover:to-fuchsia-700"
              ligne="mixeAllLignes"
              selectedUsers={selectedUsersAllLigne}
            />
          </div>
        </TabsContent>

        {/* Onglet Affichage */}
        <TabsContent value="AfficherAffecter">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-100">
              <div className="w-1 h-8 bg-gradient-to-b from-yellow-500 to-yellow-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-slate-800">
                Afficher les affectés
              </h2>
            </div>
            {AfficherLoading ? (
              <div className="text-center py-8 text-slate-600">
                Chargement des affectations...
              </div>
            ) : (
              <DataTable
                columns={columnAfficher}
                data={AfficherData || []}
                TypeFilter="name"
              />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
