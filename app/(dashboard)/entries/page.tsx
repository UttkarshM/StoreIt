'use client';

import React, { useEffect, useState } from 'react';

import SearchBar from '../../components/SearchBar';
import { getFiles } from '@/utils/actions';
import { Entries_Type } from '@/utils/supabase/types';
import { useAppSelector } from '@/redux/hooks';
import { Entries_component } from '@/app/components/Entries';

const Entries = () => {
  const user_state = useAppSelector((state) => state.user);

  const [items, setItems] = useState<Entries_Type[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    const getData = async () => {
      // Check if user exists before accessing email
      if (!user_state.user?.email) {
        console.log('User not logged in or email not available');
        return;
      }

      console.log(searchText);
      console.log(user_state);
      console.log(user_state.user.email);

      const data = (await getFiles(
        { path: user_state.user.email },
        searchText
      )) as Entries_Type[];
      setItems(data);
    };
    getData();
  }, [searchText, user_state.user?.email]);

  return (
    <div className="flex flex-col flex-1 p-3">
      <div className="flex w-full h-20 bg-white">
        <SearchBar setText={setSearchText} />
      </div>

      <Entries_component items={items} />
    </div>
  );
};
export default Entries;
