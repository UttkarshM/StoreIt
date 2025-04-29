// 'use client';

// import { Entries_Type } from '@/utils/supabase/types';

// interface SpaceBarChartProps {
//   data: Entries_Type[];
// }

// export default function SpaceBarChart({ data }: SpaceBarChartProps) {
//   // Sum total size and size per type
//   const total = data.reduce((acc, entry) => acc + entry.file_size, 0);

//   const grouped = data.reduce<Record<string, number>>((acc, entry) => {
//     acc[entry.file_type] = (acc[entry.file_type] || 0) + entry.file_size;
//     return acc;
//   }, {});

//   //   const colors = [
//   //     'bg-blue-500',
//   //     'bg-green-500',
//   //     'bg-yellow-500',
//   //     'bg-pink-500',
//   //     'bg-purple-500',
//   //   ];

//   const ColorsForChart = {
//     pdf: '#4f46e5',
//     docx: '#10b981',
//     pptx: '#3b82f6',
//     png: '#f59e0b',
//     // others: '#ef4444',
//   };

//   let totalSize = 50 * 1024 * 1024; //50mb
//   const fixedWidth = totalSize;
//   return (
//     <div className="flex flex-col items-center justify-center mx-auto h-full min-w-[400px] rounded-lg border border-gray-200">
//       <div className="flex flex-col w-full h-full justify-start">
//         <h2 className="text-xl font-semibold mb-2 underline">
//           Space Usage by Type
//         </h2>
//         <div className="flex mt-10 mb-10 w-[65%] h-4 overflow-hidden rounded-lg border border-gray-300">
//           {Object.entries(grouped).map(([type, size], index) => {
//             totalSize -= size;
//             const percentage = (size / fixedWidth) * 100;
//             return (
//               <div
//                 key={type}
//                 className={`${ColorsForChart[type]} h-full`}
//                 style={{ width: `${percentage}%` }}
//                 title={`${type}: ${percentage.toFixed(1)}%`}
//               />
//             );
//           })}

//           {/* Render remaining space if any */}
//           {(() => {
//             const usedSize = Object.values(grouped).reduce(
//               (acc, size) => acc + size,
//               0
//             );
//             const remaining = totalSize;
//             console.log('remaining', remaining);
//             if (remaining > 0) {
//               return (
//                 <div
//                   key="remaining"
//                   className="bg-gray-600 h-full"
//                   style={{ width: `${(remaining / fixedWidth) * 100}%` }}
//                   title={`Remaining: ${((remaining / fixedWidth) * 100).toFixed(1)}%`}
//                 />
//               );
//             }
//             return null;
//           })()}
//         </div>

//         <div className="flex flex-col flex-wrap gap-2 mt-4">
//           {Object.entries(grouped).map(([type, size], index) => (
//             <div key={type} className="flex items-center gap-2">
//               <div
//                 className={`w-4 h-4 ${colors[index % colors.length]} rounded-sm`}
//               />
//               <span className="text-sm">
//                 {type} - {parseFloat((size / (1024 * 1024)).toFixed(2))}mb
//               </span>
//             </div>
//           ))}
//           <div key="free-space" className="flex items-center gap-2">
//             <div className={`w-4 h-4 bg-gray-600 rounded-sm`} />
//             <span className="text-sm">
//               free-space - {parseFloat((totalSize / (1024 * 1024)).toFixed(2))}mb
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
    pdf: '#4f46e5',
    docx: '#10b981',
    pptx: '#3b82f6',
    png: '#f59e0b',
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
    <div className="flex flex-col items-center justify-center mx-auto h-full min-w-[400px] rounded-lg border border-gray-200">
      <div className="flex flex-col w-full h-full justify-start">
        <h2 className="text-xl font-semibold mb-2 underline">
          Space Usage by Type
        </h2>

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
                backgroundColor: '#6b7280',
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
                style={{ backgroundColor: ColorsForChart[type] || '#d1d5db' }} // Default gray if type is unknown
              />
              <span className="text-sm">
                {type} - {parseFloat((size / (1024 * 1024)).toFixed(2))}MB
              </span>
            </div>
          ))}
          <div key="free-space" className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-600 rounded-sm" />
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
