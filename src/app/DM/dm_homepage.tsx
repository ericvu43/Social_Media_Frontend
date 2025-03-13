import React, { useState, useEffect, useRef } from 'react';
import './DMSystem.css'; // Assuming you'll move the CSS to a separate file

interface Message {
  text: string;
  sender: 'me' | 'them';
  time: string;
}

interface Conversations {
  [key: string]: Message[];
}

const DMSystem: React.FC = () => {
  const [activeContact, setActiveContact] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState<string>('');
  const [conversations, setConversations] = useState<Conversations>({
    user1: [],
    user2: [],
    user3: [],
  });
  const messageAreaRef = useRef<HTMLDivElement>(null);

  const contacts = [
    { id: 'user1', name: 'User 1' },
    { id: 'user2', name: 'User 2' },
    { id: 'user3', name: 'User 3' },
  ];

  const handleContactClick = (contactId: string) => {
    setActiveContact(contactId);
  };

  const sendMessage = () => {
    if (!activeContact || !messageInput.trim()) return;

    const newMessage: Message = {
      text: messageInput,
      sender: 'me',
      time: new Date().toLocaleTimeString(),
    };

    setConversations((prev) => ({
      ...prev,
      [activeContact]: [...prev[activeContact], newMessage],
    }));
    setMessageInput('');

    // Simulate a reply after 1 second
    setTimeout(() => {
      const reply: Message = {
        text: 'This is an automated reply!',
        sender: 'them',
        time: new Date().toLocaleTimeString(),
      };
      setConversations((prev) => ({
        ...prev,
        [activeContact]: [...prev[activeContact], reply],
      }));
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [conversations, activeContact]);

  return (
    <div className="container">
      <div className="contacts">
        <ul className="contact-list">
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className={`contact ${activeContact === contact.id ? 'active' : ''}`}
              onClick={() => handleContactClick(contact.id)}
            >
              {contact.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="messages">
        <div className="message-header">
          {activeContact ? contacts.find((c) => c.id === activeContact)?.name : 'Select a conversation'}
        </div>
        <div className="message-area" ref={messageAreaRef}>
          {activeContact &&
            conversations[activeContact].map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === 'me' ? 'sent' : 'received'}`}
              >
                {msg.text}
              </div>
            ))}
        </div>
        <div className="input-area">
          <input
            type="text"
            className="message-input"
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="send-btn" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default DMSystem;
