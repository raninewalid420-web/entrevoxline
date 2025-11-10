import React from "react";
import { LogOut, User } from "lucide-react";

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        📞 CallManager
      </h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <User className="w-6 h-6 text-gray-600" />
          <div className="text-sm">
            <p className="font-medium text-gray-800">{user?.name || "Utilisateur"}</p>
            <p className="text-gray-500 text-xs">{user?.role || "Employé"}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-all flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </nav>
  );
}
