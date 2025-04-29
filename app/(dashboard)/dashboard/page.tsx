'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SearchBar from '@/app/components/Sidebar';
import PieChartComponent from '@/app/components/space-pie-chart';
import { useEffect, useState } from 'react';
import { getFiles } from '@/utils/actions';
import { Entries_Type } from '@/utils/supabase/types';
import { Entries_component } from '@/app/components/Entries';
import SpaceBarChart from '@/app/components/space-barchart';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/redux/store';
import { setUser } from '@/redux/userSlice';
import { getUserInfo } from '@/utils/actions';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const user_state = useSelector((state: AppState) => state.user);
  const isAuthenticated = useSelector(
    (state: AppState) => state.user.isAuthenticated
  );
  const [items, setItems] = useState<Entries_Type[]>([]);

  useEffect(() => {
    const getData = async () => {
      const user = await getUserInfo();

      console.log('User:', user);
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
      console.log('User state:', user_state);
      // setUserState(user);

      const data = (await getFiles(user.email)) as Entries_Type[];
      // console.log('data', data);
      setItems(data);
    };
    getData();
  }, [user_state.user?.name]);

  return (
    <main className="p-6 w-[100%]  mx-auto">
      <div className="flex flex-row max-md:flex-col justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold mb-4">Welcome back!</h1>
        </div>
        <SearchBar />
        <div className="flex items-center gap-2 p-2 mt-2">
          <Link href="/upload">
            <Button>Upload File</Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-between items-start min-w-[500px] max-min[1200px] mb-6 bg-slate-200 p-4 rounded-lg">
        <div className="w-full border-b border-slate-500">
          <h1 className="text-[30px] font-bold p-1 ">Analytics</h1>
        </div>
        <div className="flex flex-col 2xl:flex-row justify-around items-center 2xl:h-[500px] lg:min-w-[400px] w-full h-[900px] p-10 bg-slate-200">
          <PieChartComponent data={items} />
          <SpaceBarChart data={items} />
        </div>
      </div>
      <Entries_component items={items} />
    </main>
  );
}
