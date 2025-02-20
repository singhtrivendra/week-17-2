// In JoinScreen.tsx
import React, { FormEvent } from 'react';
import { Users } from 'lucide-react';

interface JoinScreenProps {
  username: string;
  roomId: string;
  setUsername: (username: string) => void;
  setRoomId: (roomId: string) => void;
  handleJoin: (e: FormEvent) => void;
  isJoining: boolean;     
  error?: string;         
}

export const JoinScreen: React.FC<JoinScreenProps> = ({
  username,
  roomId,
  setUsername,
  setRoomId,
  handleJoin,
  isJoining,
  error
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-emerald-950 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Users className="w-12 h-12 text-emerald-600" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">Join Chat Room</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleJoin} className="space-y-4">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
          />
          <input
            type="text"
            placeholder="Enter room ID or Create Your own room"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
          />
          <button
            type="submit"
            disabled={isJoining}
            className={`w-full py-3 rounded-lg transition duration-200 flex items-center justify-center ${
              isJoining
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
            } text-white`}
          >
            {isJoining ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Joining Chat...
              </>
            ) : (
              "Join Chat"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

