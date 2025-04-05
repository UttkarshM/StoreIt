import { Search } from 'lucide-react';

const SearchBar = ({ size = '200px' }: { size: string }) => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <input
        type="text"
        placeholder="Search..."
        className={`border border-gray-300 rounded-lg p-2 sm:w-[70px]`}
        style={{ width: size }}
      />
      <button className="ml-2 p-2 bg-blue-500 text-white rounded-3xl flex items-center justify-center">
        <Search size={20} />
      </button>
    </div>
  );
};

export default SearchBar;
