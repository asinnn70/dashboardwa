import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: 'up' | 'down' | 'neutral';
}

export function StatsCard({ title, value, change, icon: Icon, trend }: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{value}</h3>
        <div className="flex items-center gap-1">
          <span
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              trend === 'up' ? "bg-green-100 text-green-700" :
              trend === 'down' ? "bg-red-100 text-red-700" :
              "bg-gray-100 text-gray-700"
            )}
          >
            {change}
          </span>
          <span className="text-xs text-gray-400">vs last week</span>
        </div>
      </div>
      <div className="p-3 bg-gray-50 rounded-xl">
        <Icon className="w-5 h-5 text-gray-600" />
      </div>
    </div>
  );
}
