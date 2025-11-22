import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { ChartDataPoint } from '../types.ts';

interface SeizureChartProps {
  data: ChartDataPoint[];
}

export const SeizureChart: React.FC<SeizureChartProps> = ({ data }) => {
  return (
    <div className="w-full h-[300px] bg-white p-4 rounded-xl shadow-sm border border-slate-100">
      <h3 className="text-lg font-bold text-slate-800 mb-4 pl-2">Seizure Frequency Trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorFreq" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12, fill: '#64748b' }} 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#64748b' }} 
            axisLine={false}
            tickLine={false}
            label={{ value: 'Episodes/Mo', angle: -90, position: 'insideLeft', style: { fill: '#94a3b8', fontSize: 12 } }}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <ReferenceLine x="Aug 24" stroke="#10b981" label={{ value: "Controlled", fill: "#10b981", fontSize: 12, position: 'top' }} strokeDasharray="3 3" />
          <Area 
            type="monotone" 
            dataKey="frequency" 
            stroke="#ef4444" 
            fillOpacity={1} 
            fill="url(#colorFreq)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};