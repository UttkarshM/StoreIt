'use client';

import React, { useEffect, useState } from 'react';

import SearchBar from '../../components/SearchBar';
import { getFiles } from '@/utils/actions';
import { Entries_Type } from '@/utils/supabase/types';
import { useSelector } from 'react-redux';
import { AppState } from '@/redux/store';
import { getUserInfo } from '@/utils/actions';
import { Entries_component } from '@/app/components/Entries';
const Entries = () => {
  const user_state = useSelector((state: AppState) => state.user);

  const [items, setItems] = useState<Entries_Type[]>([]);

  const [searchText, setSearchText] = useState<string>('');
  useEffect(() => {
    const getData = async () => {
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
  }, [searchText]);

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
