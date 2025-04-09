import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/app-sidebar';
import { useSidebar } from '@/components/ui/sidebar';
import SearchBar from '../components/SearchBar';
import { Calendar, Home, Inbox, Search, Settings, LogOut } from 'lucide-react';
import React from 'react';

const items = [
  {
    title: 'Home',
    url: '#',
    icon: Home,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
  {
    title: 'Logout',
    url: '/login',
    icon: LogOut,
  },
];

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row min-h-screen min-w-screen">
      <div className="flex flex-row justify-items-start w-[14rem]">
        <SidebarProvider style={{ '--sidebar-width': '14rem' }}>
          <AppSidebar items={items} />
          <main>{/* <SidebarTrigger /> */}</main>
        </SidebarProvider>
      </div>
      {children}
    </div>
  );
};

export default layout;
