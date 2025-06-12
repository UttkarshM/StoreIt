'use client';

import { Entries_Type } from '@/utils/supabase/types';

interface SpaceBarChartProps {
  data: Entries_Type[];
}

export default function SpaceBarChart({ data }: SpaceBarChartProps) {
  // Sum total size and size per type
  const total = data.reduce((acc, entry) => acc + entry.file_size, 0);

  const grouped = data.reduce<Record<string, number>>((acc, entry) => {
    acc[entry.file_type] = (acc[entry.file_type] || 0) + entry.file_size;
    return acc;
  }, {});

  const ColorsForChart: Record<string, string> = {
    pdf: '#FCEF91',
    docx: '#FB9E3A',
    pptx: '#E6521F',
    png: '#EA2F14',
    jpg: '#EA2F14',
    // You can add more file types here
  };

  const fixedWidth = 50 * 1024 * 1024; // 50MB

  // Calculate space used by files grouped by type
  const totalUsedSize = Object.values(grouped).reduce(
    (acc, size) => acc + size,
    0
  );

  // Calculate remaining space
  const remainingSize = fixedWidth - totalUsedSize;

  return (
    <div className="flex flex-col bg-white border-none rounded-lg w-full max-w-5xl h-[400px] mx-auto shadow-lg shadow-orange-300/50">
      {/* Title container with light peach background */}
      <div className="bg-[#FFF5E6] p-6 rounded-t-lg">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#FB9E3A] to-[#FCEF91] text-transparent bg-clip-text text-left">
          Space Usage by Type
        </h2>
      </div>

      <div className="flex flex-col w-full h-full justify-start p-6 rounded-b-lg">
        <div className="flex mt-10 mb-10 w-[65%] h-4 overflow-hidden rounded-lg border border-gray-300">
          {Object.entries(grouped).map(([type, size]) => {
            const percentage = (size / fixedWidth) * 100;
            const color = ColorsForChart[type] || '#d1d5db'; // Default gray if type is unknown
            return (
              <div
                key={type}
                className="h-full"
                style={{ width: `${percentage}%`, backgroundColor: color }}
                title={`${type}: ${percentage.toFixed(1)}%`}
              />
            );
          })}

          {/* Render remaining space if any */}
          {remainingSize > 0 && (
            <div
              key="remaining"
              className="h-full"
              style={{
                width: `${(remainingSize / fixedWidth) * 100}%`,
                backgroundColor: '#fdd0a2',
              }} // Gray color for remaining space
              title={`Remaining: ${(remainingSize / fixedWidth) * 100}%`}
            />
          )}
        </div>

        <div className="flex flex-col flex-wrap gap-2 mt-4">
          {Object.entries(grouped).map(([type, size]) => (
            <div key={type} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: ColorsForChart[type] || '#d1d5db' }}
              />
              <span className="text-sm">
                {type} - {parseFloat((size / (1024 * 1024)).toFixed(2))}MB
              </span>
            </div>
          ))}
          <div key="free-space" className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#fdd0a2] rounded-sm" />
            <span className="text-sm">
              Free Space -{' '}
              {parseFloat((remainingSize / (1024 * 1024)).toFixed(2))}MB
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
