'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  Upload,
  Settings,
  LogOut,
  Files,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const items = [
  { title: 'Home', url: '/dashboard', icon: Home },
  { title: 'Files', url: '/entries', icon: Files },
  { title: 'Upload', url: '/upload', icon: Upload },
  { title: 'Settings', url: '/profile', icon: Settings },
  { title: 'Logout', url: '/login', icon: LogOut },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen min-h-[700px] w-screen overflow-hidden bg-white text-theme-red">
      <aside
        className={cn(
          'h-full transition-all duration-300 bg-theme-yellow border-r',
          collapsed ? ' w-20' : 'w-64'
        )}
      >
        <div
          className={cn(
            collapsed ? 'flex flex-col px-4 py-4' : 'flex flex-row px-4 py-4 '
          )}
        >
          <h1
            className={cn(
              collapsed
                ? 'flex flex-col text-xl font-bold tracking-tight transition-opacity duration-300 opacity-0 pointer-events-none'
                : 'flex flex-row w-full justify-center text-xl font-bold tracking-tight transition-opacity duration-300'
            )}
          >
            MyDrive
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              collapsed &&
                'flex flex-row w-full justify-centerrounded-full hover:bg-theme-orange/30'
            )}
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5 text-theme-deep-orange" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-theme-deep-orange" />
            )}
          </Button>
        </div>

        <nav className="mt-4 space-y-1 px-2">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className={cn(
                'flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-theme-orange/20 transition-all font-medium',
                collapsed
                  ? 'justify-center text-[#FB9E3A]'
                  : 'hover:text-[#FB9E3A]'
              )}
            >
              <item.icon className="w-5 h-5 text-theme-red" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      <main
        className={cn(
          'transition-all duration-300 flex-1 p-6 overflow-y-auto',
          collapsed ? 'ml-20' : 'ml-10'
        )}
        style={{ minWidth: '320px' }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
