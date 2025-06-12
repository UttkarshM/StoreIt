'use client';

import { Pie, PieChart } from 'recharts';
import { Entries_Type } from '@/utils/supabase/types';

interface PieChartProps {
  data: Entries_Type[];
}

const ColorsForChart = {
  pdf: '#FCEF91',
  docx: '#FB9E3A',
  pptx: '#E6521F',
  images: '#EA2F14',
  others: '#ef4444',
};

const LabelsForChart = {
  pdf: 'PDF',
  docx: 'DOCX',
  pptx: 'PPTX',
  images: 'Images',
  others: 'Others',
};

const isImage = (type: string) =>
  ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'].includes(type.toLowerCase());

export default function PieChartComponent({ data }: PieChartProps) {
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

  const totalSize = Object.values(grouped).reduce((sum, val) => sum + val, 0);

  const chartData = Object.entries(grouped).map(([key, value]) => ({
    name: LabelsForChart[key as keyof typeof LabelsForChart],
    value: parseFloat((value / (1024 * 1024)).toFixed(2)), // in MB
    percent: (value / totalSize) * 100,
    fill: ColorsForChart[key as keyof typeof ColorsForChart] || '#ccc',
  }));

  return (
    <div className="flex flex-col bg-white border-none rounded-lg w-full max-w-5xl mx-auto h-[400px] shadow-lg shadow-orange-300/50">
      {/* Title Container with light peach background */}
      <div className="bg-[#FFF5E6] p-6 rounded-t-lg">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#FB9E3A] to-[#FCEF91] text-transparent bg-clip-text text-left">
          Types of Files
        </h2>
      </div>

      {/* Chart and Legend */}
      <div className="flex p-6 rounded-b-lg">
        <div className="w-1/2 flex flex-col justify-center gap-2 pr-8">
          {chartData.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.fill }}
              ></span>
              <span className="font-medium">{entry.name}</span> –{' '}
              <span>{entry.percent.toFixed(0)}%</span>
            </div>
          ))}
        </div>

        <div className="w-1/2 flex justify-center items-center">
          <PieChart width={300} height={300}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={60}
              fill="#8884d8"
              labelLine={false}
              isAnimationActive={false}
              paddingAngle={5}
              cornerRadius={5}
            />
          </PieChart>
        </div>
      </div>
    </div>
  );
}
