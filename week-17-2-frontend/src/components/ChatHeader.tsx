import React from 'react';
import { LogOut } from 'lucide-react';

interface ChatHeaderProps {
  roomId: string;
  activeUsers: number;
  handleCopyRoomId: () => void;
  handleLeave: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ roomId, activeUsers, handleCopyRoomId, handleLeave }) => {
  return (
    <div className="bg-purple-600 text-white p-4 shadow-md flex justify-between items-center">
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Room ID: {roomId}</span>
          <button onClick={handleCopyRoomId} className="bg-purple-700 px-2 py-1 rounded text-xs">
            Copy
          </button>
        </div>
        <span className="text-xs">Active Users: {activeUsers}</span>
      </div>
      <button onClick={handleLeave} className="flex items-center space-x-2 bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition duration-200">
        <LogOut className="w-4 h-4" />
        <span>Leave</span>
      </button>
    </div>
  );
};

export default ChatHeader;
