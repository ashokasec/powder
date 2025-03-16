"use client";

import React, { useState } from 'react';
import { useChat } from '@/hooks/use-chat';

const ChatPage: React.FC = () => {
  const { response, askPowder, isGeneratingResponse } = useChat();
  const [userInput, setUserInput] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await askPowder({ userInput, chatId: 'OBWEL1YFw7jA' });
  };

  return (
    <div>
      <h1>Chat with AI</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter your prompt"
        />
        <button type="submit" disabled={isGeneratingResponse}>
          {isGeneratingResponse ? 'Generating...' : 'Send'}
        </button>
      </form>
      <div>
        <h2>Response:</h2>
        <pre>{response ? JSON.stringify(response, null, 2) : 'No response yet'}</pre>
      </div>
    </div>
  );
};

export default ChatPage;