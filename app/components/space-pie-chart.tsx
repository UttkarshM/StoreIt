// 'use client';

// import { Pie, PieChart } from 'recharts';

// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from '@/components/ui/chart';
// import { Entries_Type } from '@/utils/supabase/types';

// interface PieChartProps {
//   data: Entries_Type[];
// }

// const ColorsForChart = {
//   Images: '#4f46e5',
//   Docs: '#10b981',
//   Csv: '#f59e0b',
//   Other: '#f59e0b',
// };

// export default function PieChartComponent() {
//   return (
//     <div className="flex flex-col justify-center max-w-md mx-auto p-6 rounded-lg border border-gray-200">
//       <h2 className="text-xl font-semibold mb-4 text-center">
//         Space Usage Breakdown
//       </h2>
//       <ChartContainer
//         config={{
//           Space: {
//             label: 'Total Space',
//           },
//           pdf: {
//             label: 'pdf',
//             color: 'hsl(var(--chart-1))',
//           },
//           pptx: {
//             label: 'pptx',
//             color: 'hsl(var(--chart-2))',
//           },
//           docx: {
//             label: 'docx',
//             color: 'hsl(var(--chart-3))',
//           },
//           images: {
//             label: 'images',
//             color: 'hsl(var(--chart-5))',
//           },
//           others: {
//             label: 'others',
//             color: 'hsl(var(--chart-6))',
//           },
//         }}
//         className="aspect-square min-h-[300px]"
//       >
//         <PieChart>
//           <ChartTooltip content={<ChartTooltipContent hideLabel />} />
//           <Pie
//             data={[
//               { browser: , visitors: 275, fill: ColorsForChart.Images },
//               { browser: 'Docs', visitors: 200, fill: ColorsForChart.Docs },
//               { browser: 'Csv', visitors: 187, fill: ColorsForChart.Csv },
//               { browser: 'other', visitors: 90, fill: ColorsForChart.Other },
//             ]}
//             dataKey="visitors"
//             nameKey="browser"
//             cx="50%"
//             cy="50%"
//             outerRadius={80}
//             label
//           />
//         </PieChart>
//       </ChartContainer>
//     </div>
//   );
// }

'use client';

import { Pie, PieChart } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Entries_Type } from '@/utils/supabase/types';

interface PieChartProps {
  data: Entries_Type[];
}

const ColorsForChart = {
  pdf: '#4f46e5',
  docx: '#10b981',
  pptx: '#3b82f6',
  images: '#f59e0b',
  others: '#ef4444',
};

const isImage = (type: string) =>
  ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'].includes(type.toLowerCase());

export default function PieChartComponent({ data }: PieChartProps) {
  // Group file sizes by type
  const grouped = data.reduce<Record<string, number>>((acc, entry) => {
    const ext = entry.file_type.toLowerCase();
    let key: string;

    if (['pdf', 'docx', 'pptx'].includes(ext)) {
      key = ext;
    } else if (isImage(ext)) {
      key = 'images';
    } else {
      key = 'others';
    }

    acc[key] = (acc[key] || 0) + entry.file_size;
    return acc;
  }, {});

  // Format data for the chart
  const chartData = Object.entries(grouped).map(([key, value]) => ({
    browser: key,
    visitors: parseFloat((value / (1024 * 1024)).toFixed(2)), // in mb
    fill: ColorsForChart[key as keyof typeof ColorsForChart] || '#ccc',
  }));

  return (
    <div className="flex flex-col justify-center mx-auto pl-6 h-full min-w-[400px] rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Types of Files in Space in mb
      </h2>
      <ChartContainer
        config={{
          pdf: { label: 'PDF', color: ColorsForChart.pdf },
          docx: { label: 'DOCX', color: ColorsForChart.docx },
          pptx: { label: 'PPTX', color: ColorsForChart.pptx },
          images: { label: 'Images', color: ColorsForChart.images },
          others: { label: 'Others', color: ColorsForChart.others },
        }}
        className="aspect-square min-h-[400px]"
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={chartData}
            dataKey="visitors"
            nameKey="browser"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
            labelLine={false}
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
