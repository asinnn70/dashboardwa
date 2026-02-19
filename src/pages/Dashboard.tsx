import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { MessageCircle, Users, Clock, Activity } from 'lucide-react';
import { StatsCard } from '../components/StatsCard';

const messageData = [
  { name: 'Mon', sent: 4000, received: 2400 },
  { name: 'Tue', sent: 3000, received: 1398 },
  { name: 'Wed', sent: 2000, received: 9800 },
  { name: 'Thu', sent: 2780, received: 3908 },
  { name: 'Fri', sent: 1890, received: 4800 },
  { name: 'Sat', sent: 2390, received: 3800 },
  { name: 'Sun', sent: 3490, received: 4300 },
];

const activityData = [
  { name: '00:00', users: 120 },
  { name: '04:00', users: 50 },
  { name: '08:00', users: 800 },
  { name: '12:00', users: 1200 },
  { name: '16:00', users: 1500 },
  { name: '20:00', users: 900 },
];

export function Dashboard() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Export Report
          </button>
          <button className="px-4 py-2 bg-[#25D366] text-white rounded-lg text-sm font-medium hover:bg-[#128C7E] transition-colors shadow-sm shadow-green-200">
            New Campaign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Messages"
          value="128,430"
          change="+12.5%"
          trend="up"
          icon={MessageCircle}
        />
        <StatsCard
          title="Active Users"
          value="45,231"
          change="+4.2%"
          trend="up"
          icon={Users}
        />
        <StatsCard
          title="Avg. Response Time"
          value="1m 42s"
          change="-8.1%"
          trend="up" // Good thing
          icon={Clock}
        />
        <StatsCard
          title="Delivery Rate"
          value="99.8%"
          change="+0.2%"
          trend="neutral"
          icon={Activity}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Message Volume</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={messageData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6B7280', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6B7280', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="sent" 
                  stroke="#25D366" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#25D366', strokeWidth: 2, stroke: '#fff' }} 
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="received" 
                  stroke="#128C7E" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#128C7E', strokeWidth: 2, stroke: '#fff' }} 
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Active Users by Hour</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6B7280', fontSize: 12 }} 
                  dy={10}
                />
                <Tooltip 
                  cursor={{ fill: '#F3F4F6' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar 
                  dataKey="users" 
                  fill="#25D366" 
                  radius={[4, 4, 0, 0]} 
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
