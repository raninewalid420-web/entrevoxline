import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Home,
  Users,
  ChevronDown,
  ChevronRight,
  LogOut,
  Layers,
  FolderKanban,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function SidebarMenu({ menuItems = [] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openGroups, setOpenGroups] = useState({});
  const { logout } = useAuth();

  const handleLogout = async () => {
    const res = await logout();
  };

  const toggleGroup = (key) => {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Sidebar className="w-64 min-h-screen bg-[#0B1F3A] text-gray-200 flex flex-col shadow-lg rounded-r-3xl">
      {/* HEADER */}
      <SidebarHeader className="border-b border-white/10 p-5 bg-[#0B1F3A]">
        <h1 className="text-lg font-bold text-white tracking-wide text-center flex items-center justify-center gap-2">
          📞 <span className="text-blue-200">CallManager</span>
        </h1>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="flex-1 p-4 space-y-4 overflow-y-auto hide-scrollbar overflow-x-hidden bg-[#0B1F3A]">
        {menuItems.map((section, index) => (
          <React.Fragment key={index}>
            <SidebarGroup>
              {/* Section title */}
              {section.title && (
                <p className="text-xs text-gray-400 uppercase font-semibold mb-2 tracking-wider">
                  {section.title}
                </p>
              )}

              <div className="space-y-1">
                {section.items.map((item, i) => {
                  const hasChildren = item.children && item.children.length > 0;
                  const isOpen = openGroups[item.label];

                  if (hasChildren) {
                    return (
                      <div key={i}>
                        <button
                          onClick={() => toggleGroup(item.label)}
                          className="flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:bg-white/10 transition-all"
                        >
                          <span className="flex items-center gap-2">
                            {item.icon || (
                              <Layers className="w-4 h-4 text-gray-300" />
                            )}{" "}
                            {item.label}
                          </span>
                          {isOpen ? (
                            <ChevronDown className="w-4 h-4 text-gray-300" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-300" />
                          )}
                        </button>

                        {isOpen && (
                          <div className="mt-2 ml-5 space-y-1 border-l border-white/10 pl-3">
                            {item.children.map((subItem, j) => (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                className={`block px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                                  location.pathname === subItem.path
                                    ? "bg-white text-[#0B1F3A] shadow-sm"
                                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                                }`}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  // Item simple sans sous-menu
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        location.pathname === item.path
                          ? "bg-white text-[#0B1F3A] shadow-sm"
                          : "text-gray-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {item.icon || (
                        <FolderKanban className="w-4 h-4 opacity-70" />
                      )}
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </SidebarGroup>

            {index < menuItems.length - 1 && (
              <SidebarSeparator className="border-white/10" />
            )}
          </React.Fragment>
        ))}
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="border-t border-white/10 p-4 bg-[#0B1F3A]">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 cursor-pointer rounded-md bg-white/10 hover:bg-white/20 py-2 text-gray-100 font-medium transition-all shadow-sm"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
