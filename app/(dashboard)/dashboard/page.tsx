'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SearchBar from '@/app/components/SearchBar';
import PieChartComponent from '@/app/components/space-pie-chart';
import SpaceBarChart from '@/app/components/space-barchart';
import { useEffect, useState } from 'react';
import { getFiles, getUserInfo } from '@/utils/actions';
import { Entries_Type } from '@/utils/supabase/types';
import { Entries_component } from '@/app/components/Entries';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/redux/store';
import { setUser } from '@/redux/userSlice';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const user_state = useSelector((state: AppState) => state.user);
  const [items, setItems] = useState<Entries_Type[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    const getData = async () => {
      const user = await getUserInfo();
      if (user && user.email) {
        dispatch(
          setUser({
            name: user.user_name,
            email: user.email,
            id: user.id,
            created_at: user.created_at,
          })
        );
      }

      const data = (await getFiles(
        { path: user.email },
        searchText
      )) as Entries_Type[];
      setItems(data);
    };

    getData();
  }, [user_state.user?.name, searchText]);

  return (
    <main className="max-w-[1440px] mx-auto px-6 py-10 space-y-10 bg-white">
      {/* Search Bar Top */}
      <div className="flex flex-row w-full mb-6">
        <SearchBar setText={setSearchText} />
        <Link href="/upload">
          <Button className="w-full sm:w-auto hover:bg-[#FCEF91] bg-[#FB9E3A] text-white font-medium rounded-xl px-4 py-2 transition-all">
            Upload File
          </Button>
        </Link>
      </div>

      <section className="bg-white rounded-3xl  ">
        <div className="flex flex-col xl:flex-row items-center justify-center gap-8 w-full">
          {/* Pie Chart */}
          <div className="w-full xl:w-1/2 bg-theme-yellow/20 rounded-2xl flex items-center justify-center">
            <PieChartComponent data={items} />
          </div>

          {/* Bar Chart */}
          <div className="w-full xl:w-1/2 bg-theme-yellow/20 rounded-2xl flex items-center justify-center">
            <SpaceBarChart data={items} />
          </div>
        </div>
      </section>

      {/* File List Section */}
      <section>
        <Entries_component items={items} />
      </section>
    </main>
  );
}
