import React, { useState, useEffect } from 'react';
import { Search, MoreVertical, UserPlus, Filter, FileSpreadsheet, Loader2, Settings, Copy, Check } from 'lucide-react';
import { exportToGoogleSheetViaScript, GOOGLE_SCRIPT_TEMPLATE } from '../lib/google';
import { cn } from '../lib/utils';

const contacts = [
  { id: 1, name: 'Alice Freeman', phone: '+1 (555) 123-4567', tags: ['Client', 'VIP'] },
  { id: 2, name: 'Bob Smith', phone: '+1 (555) 987-6543', tags: ['Lead'] },
  { id: 3, name: 'Charlie Brown', phone: '+1 (555) 555-5555', tags: ['Partner'] },
  { id: 4, name: 'David Lee', phone: '+1 (555) 111-2222', tags: ['Client'] },
  { id: 5, name: 'Eva Green', phone: '+1 (555) 333-4444', tags: ['Lead', 'New'] },
];

export function Contacts() {
  const [isExporting, setIsExporting] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [scriptUrl, setScriptUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedUrl = localStorage.getItem('gas_script_url');
    if (savedUrl) setScriptUrl(savedUrl);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(GOOGLE_SCRIPT_TEMPLATE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveConfig = () => {
    localStorage.setItem('gas_script_url', scriptUrl);
    setShowConfig(false);
  };

  const handleExport = async () => {
    if (!scriptUrl) {
      setShowConfig(true);
      return;
    }

    try {
      setIsExporting(true);
      
      // Prepare data for export
      const header = ['Name', 'Phone', 'Tags'];
      const rows = contacts.map(c => [c.name, c.phone, c.tags.join(', ')]);
      const data = [header, ...rows];
      
      const url = await exportToGoogleSheetViaScript(scriptUrl, data, `WhatsApp Contacts - ${new Date().toLocaleDateString()}`);
      
      // Open the new sheet
      window.open(url as string, '_blank');
    } catch (error: any) {
      console.error('Export failed:', error);
      alert('Export failed. Please check your Script URL and ensure the script is deployed as "Anyone".\n\nError: ' + error.message);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="p-8 space-y-6 relative">
      {/* Configuration Modal */}
      {showConfig && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Configure Google Sheets Export</h2>
              <button onClick={() => setShowConfig(false)} className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-5 h-5 rotate-45" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
                  <div className="flex-1">
                    <p className="text-gray-700 font-medium mb-2">Copy this Google Apps Script code</p>
                    <div className="relative">
                      <pre className="bg-gray-50 p-4 rounded-lg text-xs font-mono text-gray-600 overflow-x-auto h-32 border border-gray-200">
                        {GOOGLE_SCRIPT_TEMPLATE}
                      </pre>
                      <button 
                        onClick={handleCopyCode}
                        className="absolute top-2 right-2 p-2 bg-white rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-500" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                  <div>
                    <p className="text-gray-700 font-medium">Deploy the script</p>
                    <ol className="list-decimal list-inside text-sm text-gray-600 mt-1 space-y-1 ml-1">
                      <li>Go to <a href="https://script.google.com/home" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">script.google.com</a> and create a new project.</li>
                      <li>Paste the code and save.</li>
                      <li>Click <strong>Deploy</strong> &gt; <strong>New deployment</strong>.</li>
                      <li>Select type: <strong>Web app</strong>.</li>
                      <li>Set "Who has access" to <strong>Anyone</strong>.</li>
                      <li>Click Deploy and copy the URL.</li>
                    </ol>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
                  <div className="flex-1">
                    <p className="text-gray-700 font-medium mb-2">Paste the Web App URL here</p>
                    <input
                      type="text"
                      value={scriptUrl}
                      onChange={(e) => setScriptUrl(e.target.value)}
                      placeholder="https://script.google.com/macros/s/..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#25D366] focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
              <button 
                onClick={() => setShowConfig(false)}
                className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveConfig}
                disabled={!scriptUrl}
                className="px-4 py-2 bg-[#25D366] text-white font-medium rounded-lg hover:bg-[#128C7E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-500 mt-1">Manage your customer database.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowConfig(true)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Configure Google Sheets"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <FileSpreadsheet className="w-4 h-4 text-green-600" />
            )}
            {isExporting ? 'Exporting...' : 'Export to Sheets'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg text-sm font-medium hover:bg-[#128C7E] transition-colors shadow-sm shadow-green-200">
            <UserPlus className="w-4 h-4" />
            Add Contact
          </button>
        </div>
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
