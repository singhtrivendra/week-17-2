import React, { FormEvent } from 'react';
import { Users } from 'lucide-react';

interface JoinScreenProps {
  username: string;
  roomId: string;
  setUsername: (username: string) => void;
  setRoomId: (roomId: string) => void;
  handleJoin: (e: FormEvent) => void;
}

const JoinScreen: React.FC<JoinScreenProps> = ({ username, roomId, setUsername, setRoomId, handleJoin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Users className="w-12 h-12 text-purple-600" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">Join Chat Room</h1>
        <form onSubmit={handleJoin} className="space-y-4">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
          />
          <input
            type="text"
            placeholder="Enter room ID or Create Your own room"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-200"
          >
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinScreen;
