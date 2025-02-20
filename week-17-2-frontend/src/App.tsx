// In App.tsx
import { useEffect, useState, useRef, FormEvent } from 'react';
import { JoinScreen } from './components/JoinScreen';
import {ChatHeader} from './components/ChatHeader';
import {ChatMessages} from './components/ChatMessages';
import {MessageInput} from './components/MessageInput';
import { LandingPage } from './components/LandingPage';

export interface Message {
  text: string;
  color: string;
  timestamp: string;
  username: string;
  avatar: string;
  userId: string;
}

function App() {
  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState("");
  const [userId, setUserId] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [activeUsers, setActiveUsers] = useState<number>(1);
  const [isLanding, setIsLanding] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [joinError, setJoinError] = useState('');

  // Refs
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Unique properties for the client:
  const userColor = useRef(
    `#${Math.floor(Math.random() * 16777215).toString(16)}`
  );
  const clientAvatar = useRef(
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Copy room id to clipboard
  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId).then(() => {
      alert("Room ID copied to clipboard!");
    }, () => {
      alert("Failed to copy Room ID.");
    });
  };

  const connectToRoom = (name: string, room: string) => {
    // Generate a unique id if not already set
    if (!userId) {
      const newId = Math.random().toString(36).substr(2, 9);
      setUserId(newId);
    }
    // Connect to the backend WebSocket (assumes port 8080)
    const ws = new WebSocket("https://week-17-2.onrender.com");
    
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: 'join',
          payload: { roomId: room, username: name }
        })
      );
      setIsJoined(true);
      setIsJoining(false); // stop loading once joined
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "userCount" && data.payload && data.payload.activeUsers !== undefined) {
          setActiveUsers(data.payload.activeUsers);
          return;
        }
        let parsed = data;
        if (parsed.payload && parsed.payload.message) {
          parsed = JSON.parse(parsed.payload.message);
        }
        if (
          parsed &&
          typeof parsed.text === 'string' &&
          parsed.text.trim().startsWith('{') &&
          parsed.text.trim().endsWith('}')
        ) {
          parsed = JSON.parse(parsed.text);
        }
        if (
          parsed &&
          parsed.text &&
          parsed.username &&
          parsed.avatar &&
          parsed.userId
        ) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { ...parsed, timestamp: new Date().toLocaleTimeString() }
          ]);
        } else {
          console.log('Ignored non-chat message:', parsed);
        }
      } catch (error) {
        console.error('Error parsing message:', event.data, error);
      }
    };

    ws.onclose = () => {
      // If the connection closes before joining successfully, show error
      if (!isJoined) {
        setJoinError("Failed to join chat. Please try again.");
        setIsJoining(false);
      }
      setIsJoined(false);
    };

    wsRef.current = ws;
  };

  const handleJoin = (e: FormEvent) => {
    e.preventDefault();
    if (username.trim() && roomId.trim()) {
      setIsJoining(true);
      setJoinError('');
      const newId = Math.random().toString(36).substr(2, 9);
      setUserId(newId);
      connectToRoom(username, roomId);
    }
  };

  const handleLeave = () => {
    wsRef.current?.close();
    setIsJoined(false);
    setMessages([]);
    setIsLanding(true);
  };

  if (isLanding) {
    return <LandingPage onJoinChat={() => setIsLanding(false)} />;
  }

  if (!isJoined) {
    return (
      <JoinScreen 
        username={username}
        roomId={roomId}
        setUsername={setUsername}
        setRoomId={setRoomId}
        handleJoin={handleJoin}
        isJoining={isJoining}
        error={joinError}
      />
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <ChatHeader 
        roomId={roomId}
        activeUsers={activeUsers}
        handleCopyRoomId={handleCopyRoomId}
        handleLeave={handleLeave}
      />
      <ChatMessages 
        messages={messages}
        userId={userId}
        messagesEndRef={messagesEndRef}
      />
      <MessageInput 
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSubmit={(e) => {
          e.preventDefault();
          if (inputMessage.trim() && wsRef.current) {
            const messageObj = {
              text: inputMessage,
              color: userColor.current,
              username,
              avatar: clientAvatar.current,
              userId,
            };
            wsRef.current.send(
              JSON.stringify({
                type: 'chat',
                payload: { message: JSON.stringify(messageObj) }
              })
            );
            setInputMessage('');
          }
        }}
      />
    </div>
  );
}

export default App;
