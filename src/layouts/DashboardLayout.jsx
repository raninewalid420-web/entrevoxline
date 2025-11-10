import { Outlet } from "react-router-dom";
import SidebarMenu from "../components/sideBarMenu";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";

export default function Layout() {
  return (
    <SidebarProvider>
      <SidebarMenu />
      <main className="w-full overflow-x-hidden">
        <SidebarTrigger />
        <Outlet /> {/* <-- C’est ici que les pages enfants s’affichent */}
      </main>
    </SidebarProvider>
  );
}
