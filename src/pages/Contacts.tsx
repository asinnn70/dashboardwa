import React from 'react';
import { Search, MoreVertical, UserPlus, Filter } from 'lucide-react';

const contacts = [
  { id: 1, name: 'Alice Freeman', phone: '+1 (555) 123-4567', tags: ['Client', 'VIP'] },
  { id: 2, name: 'Bob Smith', phone: '+1 (555) 987-6543', tags: ['Lead'] },
  { id: 3, name: 'Charlie Brown', phone: '+1 (555) 555-5555', tags: ['Partner'] },
  { id: 4, name: 'David Lee', phone: '+1 (555) 111-2222', tags: ['Client'] },
  { id: 5, name: 'Eva Green', phone: '+1 (555) 333-4444', tags: ['Lead', 'New'] },
];

export function Contacts() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-500 mt-1">Manage your customer database.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg text-sm font-medium hover:bg-[#128C7E] transition-colors shadow-sm shadow-green-200">
          <UserPlus className="w-4 h-4" />
          Add Contact
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium border border-gray-200">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-gray-700 font-medium">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Phone Number</th>
              <th className="px-6 py-3">Tags</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {contacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{contact.name}</td>
                <td className="px-6 py-4">{contact.phone}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {contact.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
