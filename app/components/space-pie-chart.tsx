'use client';

import { Pie, PieChart } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface PieChartProps {
  data: {
    name: string;
    value: number;
    fill: string;
  }[];
}

const ColorsForChart = {
  Images: '#4f46e5',
  Docs: '#10b981',
  Csv: '#f59e0b',
  Other: '#f59e0b',
};

export default function PieChartComponent() {
  return (
    <div className="flex flex-col justify-center max-w-md mx-auto p-6 rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Space Usage Breakdown
      </h2>
      <ChartContainer
        config={{
          Space: {
            label: 'Total Space',
          },
          Images: {
            label: 'Images',
            color: 'hsl(var(--chart-1))',
          },
          Docs: {
            label: 'Docs',
            color: 'hsl(var(--chart-2))',
          },
          CSV: {
            label: 'Csv',
            color: 'hsl(var(--chart-3))',
          },
          other: {
            label: 'Other',
            color: 'hsl(var(--chart-5))',
          },
        }}
        className="aspect-square min-h-[300px]"
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={[
              { browser: 'Images', visitors: 275, fill: ColorsForChart.Images },
              { browser: 'Docs', visitors: 200, fill: ColorsForChart.Docs },
              { browser: 'Csv', visitors: 187, fill: ColorsForChart.Csv },
              { browser: 'other', visitors: 90, fill: ColorsForChart.Other },
            ]}
            dataKey="visitors"
            nameKey="browser"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
