import * as React from "react"
import { 
  LayoutDashboard, 
  BrainCircuit, 
  Network, 
  FileText, 
  Settings, 
  LogOut,
  Zap
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Study Architect",
    url: "/dashboard/architect",
    icon: BrainCircuit,
  },
  {
    title: "Knowledge Web",
    url: "/dashboard/web",
    icon: Network,
  },
  {
    title: "Lecture Synthesis",
    url: "/dashboard/synthesis",
    icon: FileText,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="h-16 flex items-center justify-center border-b border-border/50">
        <Link href="/dashboard" className="flex items-center gap-3 px-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tighter group-data-[collapsible=icon]:hidden">
            SYNAPSE <span className="text-primary">ALPHA</span>
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] uppercase tracking-[0.2em] font-medium text-muted-foreground/60">Systems</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    tooltip={item.title}
                    className="h-11 px-4 transition-all duration-300 premium-out"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className={`w-5 h-5 ${pathname === item.url ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarSeparator className="mb-4 opacity-50" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-11 px-4 text-muted-foreground hover:text-foreground">
              <Settings className="w-5 h-5" />
              <span>Preferences</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-11 px-4 text-muted-foreground hover:text-destructive transition-colors">
              <LogOut className="w-5 h-5" />
              <span>Disconnect</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
