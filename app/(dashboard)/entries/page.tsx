'use client';

import React, { useEffect, useState } from 'react';

import SearchBar from '../../components/SearchBar';
import { getFiles } from '@/utils/actions';
import { Entries_Type } from '@/utils/supabase/types';

const Entries = () => {

  
  useEffect(() => {
    const getData = async () => {
      const data = (await getFiles()) as Entries_Type[];
      console.log('data', data);
      setItems(data);
    };
    getData();
  }, []);

  const [items, setItems] = useState<Entries_Type[]>([]);
  return (
    <div className="flex flex-col flex-1 p-3">
      <div className="flex w-full h-20 bg-white">
        <SearchBar size={'400px'} />
      </div>
      <div className="flex-1 w-full bg-yellow-300">
        <div className="flex w-full h-full pt-5 bg-slate-100 ">
          <div className="flex flex-col w-full h-full p-5 overflow-y-auto">
            <div
              className="grid gap-[4rem]"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              }}
            >
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-items-start bg-white rounded-lg shadow-md hover:shadow-lg"
                  style={{ width: '250px' }} // Optional: to set a fixed width per card
                >
                  <img
                    src={item.url}
                    alt={item.file_name}
                    className="object-cover w-full h-full"
                  />
                  <div className="flex flex-row items-center justify-around w-full h-full p-2">
                    <p className="mt-2 text-sm text-[20px] mr-5">{item.url}</p>
                    <p className="mt-2 text-sm text-[12px]">{item.file_size}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Entries;
