import React, { useState } from 'react';
import { Search, MoreVertical, Phone, Video, Paperclip, Mic, Send, Check, CheckCheck } from 'lucide-react';
import { cn } from '../lib/utils';

const chats = [
  {
    id: 1,
    name: 'Alice Freeman',
    avatar: 'https://picsum.photos/seed/alice/200',
    lastMessage: 'Hey, are we still on for the meeting?',
    time: '10:42 AM',
    unread: 2,
    online: true,
    messages: [
      { id: 1, text: 'Hi Alice!', sender: 'me', time: '10:30 AM', status: 'read' },
      { id: 2, text: 'Hey, are we still on for the meeting?', sender: 'them', time: '10:42 AM' },
    ]
  },
  {
    id: 2,
    name: 'Tech Support Team',
    avatar: 'https://picsum.photos/seed/tech/200',
    lastMessage: 'Ticket #492 has been resolved.',
    time: 'Yesterday',
    unread: 0,
    online: false,
    messages: [
      { id: 1, text: 'I have an issue with login.', sender: 'me', time: 'Yesterday', status: 'read' },
      { id: 2, text: 'Ticket #492 has been resolved.', sender: 'them', time: 'Yesterday' },
    ]
  },
  {
    id: 3,
    name: 'John Doe',
    avatar: 'https://picsum.photos/seed/john/200',
    lastMessage: 'Thanks for the update!',
    time: 'Yesterday',
    unread: 0,
    online: true,
    messages: [
      { id: 1, text: 'Your order has shipped.', sender: 'me', time: 'Yesterday', status: 'delivered' },
      { id: 2, text: 'Thanks for the update!', sender: 'them', time: 'Yesterday' },
    ]
  },
];

export function Chats() {
  const [selectedChatId, setSelectedChatId] = useState<number>(1);
  const selectedChat = chats.find(c => c.id === selectedChatId) || chats[0];

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Chat List Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 bg-gray-50 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search or start new chat"
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className={cn(
                "flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-50",
                selectedChatId === chat.id ? "bg-gray-50" : ""
              )}
            >
              <div className="relative">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-12 h-12 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{chat.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                  {chat.unread > 0 && (
                    <span className="ml-2 bg-[#25D366] text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-[#efeae2]">
        {/* Header */}
        <div className="bg-white px-6 py-3 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src={selectedChat.avatar}
              alt={selectedChat.name}
              className="w-10 h-10 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div>
              <h2 className="font-semibold text-gray-900">{selectedChat.name}</h2>
              <p className="text-xs text-gray-500">
                {selectedChat.online ? 'Online' : 'Last seen recently'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-500">
            <Search className="w-5 h-5 cursor-pointer hover:text-gray-700" />
            <MoreVertical className="w-5 h-5 cursor-pointer hover:text-gray-700" />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat opacity-90">
          {selectedChat.messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex w-full",
                msg.sender === 'me' ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[70%] px-4 py-2 rounded-lg shadow-sm relative",
                  msg.sender === 'me' 
                    ? "bg-[#d9fdd3] rounded-tr-none" 
                    : "bg-white rounded-tl-none"
                )}
              >
                <p className="text-sm text-gray-900 leading-relaxed">{msg.text}</p>
                <div className="flex justify-end items-center gap-1 mt-1">
                  <span className="text-[10px] text-gray-500">{msg.time}</span>
                  {msg.sender === 'me' && (
                    msg.status === 'read' ? <CheckCheck className="w-3 h-3 text-blue-500" /> :
                    msg.status === 'delivered' ? <CheckCheck className="w-3 h-3 text-gray-400" /> :
                    <Check className="w-3 h-3 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-[#f0f2f5] px-4 py-3 flex items-center gap-3">
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <MoreVertical className="w-6 h-6 rotate-90" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Paperclip className="w-6 h-6" />
          </button>
          <div className="flex-1 bg-white rounded-lg flex items-center px-4 py-2">
            <input
              type="text"
              placeholder="Type a message"
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm placeholder-gray-500"
            />
          </div>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Mic className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
