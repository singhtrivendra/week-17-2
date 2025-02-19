import React, { FormEvent } from 'react';
import { Send } from 'lucide-react';

interface MessageInputProps {
  inputMessage: string;
  setInputMessage: (msg: string) => void;
  handleSubmit: (e: FormEvent) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ inputMessage, setInputMessage, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
      <div className="flex space-x-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-200"
        >
          <Send className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
