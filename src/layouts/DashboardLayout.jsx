
import SidebarMenu from "../components/sideBarMenu"
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <SidebarMenu />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}