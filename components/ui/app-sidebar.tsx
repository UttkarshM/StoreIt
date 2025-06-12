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

import Company from '@/public/company.jpg';
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
          <div className="flex flex-col justify-center items-center w-full pt-3 text-[24px] ">
            <img className="h-20 w-20 rounded-[50%]" src="company.jpg"></img>
            <h1 className="text-lg font-semibold">Storeit</h1>
          </div>
        </SidebarHeader>
      )}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex flex-row justify-center">
            {menu_label}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a className="flex flex-row justify-center" href={item.url}>
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
