import {
  LayoutDashboard,
  BriefcaseBusiness,
  Activity,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "#",
  },
  // {
  //   title: "Jobs",
  //   icon: BriefcaseBusiness,
  //   href: "#",
  // },
  // {
  //   title: "Metrics",
  //   icon: Activity,
  //   href: "#",
  // },
  // {
  //   title: "Settings",
  //   icon: Settings,
  //   href: "#",
  // },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            J
          </div>

          <div className="flex flex-col">
            <span className="font-semibold">JobFlow</span>
            <span className="text-xs text-muted-foreground">
              Queue Dashboard
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon size={18} />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}