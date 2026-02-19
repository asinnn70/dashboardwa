/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Chats } from './pages/Chats';
import { Contacts } from './pages/Contacts';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-[#f0f2f5]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 transition-all duration-300">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'chats' && <Chats />}
        {activeTab === 'analytics' && <div className="p-8 text-center text-gray-500">Analytics Module Coming Soon</div>}
        {activeTab === 'contacts' && <Contacts />}
        {activeTab === 'settings' && <div className="p-8 text-center text-gray-500">Settings Module Coming Soon</div>}
      </main>
    </div>
  );
}
