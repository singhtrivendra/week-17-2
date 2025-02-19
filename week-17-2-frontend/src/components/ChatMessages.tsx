import React from 'react';
import { Message } from '../App';

interface ChatMessagesProps {
  messages: Message[];
  userId: string;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, userId, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-auto p-4 space-y-4">
      {messages.map((message, index) => {
        const isOwnMessage = message.userId === userId;
        return (
          <div key={index} className={`w-full flex mb-4 ${isOwnMessage ? 'justify-start' : 'justify-end'}`}>
            {isOwnMessage ? (
              <div className="flex items-center space-x-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: message.color }}
                >
                  {message.avatar}
                </div>
                <div className="rounded-lg px-4 py-2 shadow-sm bg-white">
                  <p className="text-gray-900">{message.text}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="rounded-lg px-4 py-2 shadow-sm bg-gray-200">
                  <p className="text-gray-900">{message.text}</p>
                </div>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: message.color }}
                >
                  {message.avatar}
                </div>
              </div>
            )}
            <span className="self-end text-xs text-gray-600 ml-2">{message.timestamp}</span>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
