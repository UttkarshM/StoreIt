import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { User } from 'lucide-react';
// Menu items.

interface SidebarItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface AppSidebarProps {
  items?: SidebarItem[];
}

interface Props {
  items?: SidebarItem[];
  menu_label?: string;
  trigger?: boolean;
}

export function AppSidebar({
  items = [],
  menu_label = '',
  trigger = true,
}: Props) {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      {trigger && (
        <SidebarHeader>
          <div className="flex flex-col justify-center items-start w-full pt-5 ml-5 text-[24px] ">
            <User className="w-12 h-12 text-blue-600 mb-7 border border-slate-700 rounded-[50%]" />
            <h1 className="text-lg font-semibold">Storeit</h1>
          </div>
        </SidebarHeader>
      )}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{menu_label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
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
