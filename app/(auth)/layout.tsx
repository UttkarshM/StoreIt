import React from 'react';
import Image from 'next/image';
import faviIcon from '../favicon.ico';
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row min-h-screen">
      <section className="flex-1 flex flex-row">
        <div className="hidden md:flex items-center justify-center w-full h-[100%] bg-gray-800">
          {/* <Image src={faviIcon} alt="logo" width={16} height={16} /> */}
        </div>
        <div className="flex flex-col justify-center items-center w-full h-full ">
          <div className="w-[80%] h-[80%] bg-white rounded-2xl p-5">
            {children}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Layout;
