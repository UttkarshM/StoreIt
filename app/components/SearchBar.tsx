'use client';
import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  size?: string;
  setText: (value: string) => void;
}

const SearchBar = ({ size = '400px', setText }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="flex flex-1 items-center justify-center mb-10">
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-300 rounded-lg p-2 sm:w-[70px]"
        style={{ width: size }}
        value={inputValue}
        // onChange={(e) => setInputValue(e.target.value)}
        onChange={(e) => {
          const value = e.target.value;
          setInputValue(value);
          setText(value); // use the latest typed value directly
        }}
      />
      <button className="ml-3 p-3 bg-[#FB9E3A] hover:bg-[#E6521F] text-white rounded-3xl flex items-center justify-center">
        <Search size={20} />
      </button>
    </div>
  );
};

export default SearchBar;
