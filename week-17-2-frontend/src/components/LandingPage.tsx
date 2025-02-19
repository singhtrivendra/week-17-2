import { MessageSquare, Shield, UserPlus, Activity } from 'lucide-react';

interface LandingPageProps {
  onJoinChat: () => void;
}

export function LandingPage({ onJoinChat }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-800 to-teal-900 text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-8 h-8" />
            <span className="text-2xl font-bold">ChatSpace</span>
          </div>
          <button
            onClick={onJoinChat}
            className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Join Chat
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-bold mb-8 leading-tight">
              Connect with Friends in Real-Time Chat Rooms
            </h1>
            <p className="text-xl mb-8 text-emerald-100">
              Create private rooms, invite friends, and chat securely. Experience seamless real-time communication with our modern chat platform.
            </p>
            <button
              onClick={onJoinChat}
              className="bg-white text-emerald-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-emerald-100 transition-all duration-300 transform hover:scale-105"
            >
              Start Chatting Now
            </button>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Chat Illustration"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-16">Why Choose ChatSpace?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="bg-emerald-700 p-4 rounded-full mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Secure Rooms</h3>
            <p className="text-emerald-100">Private chat rooms with secure WebSocket connections</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-emerald-700 p-4 rounded-full mb-6">
              <UserPlus className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Invite Friends</h3>
            <p className="text-emerald-100">Easy room sharing with unique room IDs</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-emerald-700 p-4 rounded-full mb-6">
              <Activity className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Real-Time Status</h3>
            <p className="text-emerald-100">See active users and live chat updates</p>
          </div>
        </div>
      </div>
    </div>
  );
}