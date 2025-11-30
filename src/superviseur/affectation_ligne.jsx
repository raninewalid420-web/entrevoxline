import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AffectationLigne() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUsers2020, setSelectedUsers2020] = useState([]);
  const [selectedUsersEAB, setSelectedUsersEAB] = useState([]);
  const [selectedUsersDjibTel, setSelectedUsersDjibTel] = useState([]);

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

  // Handlers pour ligne 2020
  const handleSubmit2020 = (e) => {
    e.preventDefault();
    console.log("Affectation Ligne 2020 - Agents sélectionnés:", selectedUsers2020);
    // Ajoutez ici votre logique d'envoi API
  };

  // Handlers pour ligne EAB
  const handleSubmitEAB = (e) => {
    e.preventDefault();
    console.log("Affectation Ligne EAB - Agents sélectionnés:", selectedUsersEAB);
    // Ajoutez ici votre logique d'envoi API
  };

  // Handlers pour ligne Djib Tel
  const handleSubmitDjibTel = (e) => {
    e.preventDefault();
    console.log("Affectation Ligne Djib Tel - Agents sélectionnés:", selectedUsersDjibTel);
    // Ajoutez ici votre logique d'envoi API
  };

  // Gestion des cases à cocher
  const handleCheckboxChange = (userId, ligne) => {
    if (ligne === "2020") {
      setSelectedUsers2020(prev =>
        prev.includes(userId)
          ? prev.filter(id => id !== userId)
          : [...prev, userId]
      );
    } else if (ligne === "EAB") {
      setSelectedUsersEAB(prev =>
        prev.includes(userId)
          ? prev.filter(id => id !== userId)
          : [...prev, userId]
      );
    } else if (ligne === "DjibTel") {
      setSelectedUsersDjibTel(prev =>
        prev.includes(userId)
          ? prev.filter(id => id !== userId)
          : [...prev, userId]
      );
    }
  };

  const handleSelectAll = (ligne) => {
    const allUserIds = users.map(user => user.id);
    if (ligne === "2020") {
      setSelectedUsers2020(selectedUsers2020.length === users.length ? [] : allUserIds);
    } else if (ligne === "EAB") {
      setSelectedUsersEAB(selectedUsersEAB.length === users.length ? [] : allUserIds);
    } else if (ligne === "DjibTel") {
      setSelectedUsersDjibTel(selectedUsersDjibTel.length === users.length ? [] : allUserIds);
    }
  };

  // Composant de liste d'utilisateurs réutilisable
  const UsersList = ({ onSubmit, buttonText, buttonColor, ligne, selectedUsers }) => (
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
                        checked={selectedUsers.length === users.length && users.length > 0}
                        onChange={() => handleSelectAll(ligne)}
                        className="w-4 h-4 rounded border-slate-300 cursor-pointer"
                      />
                    </th>
                    <th className="px-4 py-3 text-left font-bold text-slate-700">Nom</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id} className="border-t hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleCheckboxChange(user.id, ligne)}
                            className="w-4 h-4 rounded border-slate-300 cursor-pointer"
                          />
                        </td>
                        <td className="px-4 py-3 font-medium text-slate-800">{user.name}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-8 text-slate-500">
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
              {buttonText}
            </Button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 w-full">
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
      </Tabs>
    </div>
  );
}