'use client';

import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/app-sidebar';
import { Home, Upload, Settings, LogOut } from 'lucide-react';

const items = [
  { title: 'Home', url: 'dashboard', icon: Home },
  { title: 'Upload', url: '/upload', icon: Upload },
  { title: 'Settings', url: '/profile', icon: Settings },
  { title: 'Logout', url: '/login', icon: LogOut },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [trigger, setTrigger] = useState(true);

  return (
    <div className="flex flex-row min-h-screen min-w-screen">
      <div className="flex flex-row justify-items-start w-[14rem]">
        <SidebarProvider style={{ '--sidebar-width': '10rem' }}>
          <AppSidebar items={items} trigger={trigger} />
          <main>
            <SidebarTrigger onClick={() => setTrigger(!trigger)} />
          </main>
        </SidebarProvider>
      </div>
      {children}
    </div>
  );
};

export default Layout;
