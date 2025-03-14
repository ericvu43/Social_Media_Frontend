import React, { useState, useEffect, useRef } from 'react';

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
    loadMessages(contactId);
  };

  const sendMessage = async () => {
    if (!activeContact || !messageInput.trim()) return;

    const newMessage: Message = {
      text: messageInput,
      sender: 'me',
      time: new Date().toLocaleTimeString(),
    };

    try {
      const response = await fetch('/api/messages/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ recipient: activeContact, content: messageInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      setConversations((prev) => ({
        ...prev,
        [activeContact]: [...prev[activeContact], newMessage],
      }));
      setMessageInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const loadMessages = async (contactId: string) => {
    try {
      const response = await fetch(`/api/messages/?recipient=${contactId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load messages');
      }

      const data = await response.json();
      const loadedMessages = data.map((msg: any) => ({
        text: msg.content,
        sender: msg.sender === localStorage.getItem('authEmail') ? 'me' : 'them',
        time: new Date(msg.timestamp).toLocaleTimeString()
      }));

      setConversations((prev) => ({
        ...prev,
        [contactId]: loadedMessages,
      }));
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };


  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [conversations, activeContact]);

  // Inline styles
  const styles = {
    body: {
      fontFamily: 'Arial, sans-serif',
      margin: 0,
      padding: 0,
      display: 'flex',
      height: '100vh',
    },
    container: {
      display: 'flex',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      border: '1px solid #e1e8ed',
    },
    contacts: {
      width: '30%',
      borderRight: '1px solid #e1e8ed',
      overflowY: 'auto',
      background: '#fff',
    },
    contactList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    contact: (isActive: boolean) => ({
      padding: '15px',
      borderBottom: '1px solid #e1e8ed',
      cursor: 'pointer',
      background: isActive ? '#e8f0fe' : '#fff',
      ':hover': {
        background: '#f5f8fa',
      },
    }),
    messages: {
      width: '70%',
      display: 'flex',
      flexDirection: 'column',
    },
    messageHeader: {
      padding: '15px',
      borderBottom: '1px solid #e1e8ed',
      background: '#fff',
    },
    messageArea: {
      flex: 1,
      padding: '20px',
      overflowY: 'auto',
      background: '#fff',
    },
    message: (isSent: boolean) => ({
      margin: '10px 0',
      padding: '10px',
      borderRadius: '10px',
      maxWidth: '70%',
      background: isSent ? '#1da1f2' : '#e1e8ed',
      color: isSent ? 'white' : 'black',
      marginLeft: isSent ? 'auto' : '0',
    }),
    inputArea: {
      padding: '15px',
      borderTop: '1px solid #e1e8ed',
      background: '#fff',
      display: 'flex',
      gap: '10px',
    },
    messageInput: {
      flex: 1,
      padding: '10px',
      border: '1px solid #ccd6dd',
      borderRadius: '20px',
      outline: 'none',
    },
    sendBtn: {
      padding: '10px 20px',
      background: '#1da1f2',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer',
      ':hover': {
        background: '#1991da',
      },
    },
  } as const;

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.contacts}>
          <ul style={styles.contactList}>
            {contacts.map((contact) => (
              <li
                key={contact.id}
                style={styles.contact(activeContact === contact.id)}
                onClick={() => handleContactClick(contact.id)}
              >
                {contact.name}
              </li>
            ))}
          </ul>
        </div>
        <div style={styles.messages}>
          <div style={styles.messageHeader}>
            {activeContact ? contacts.find((c) => c.id === activeContact)?.name : 'Select a conversation'}
          </div>
          <div style={styles.messageArea} ref={messageAreaRef}>
            {activeContact &&
              conversations[activeContact].map((msg, index) => (
                <div
                  key={index}
                  style={styles.message(msg.sender === 'me')}
                >
                  {msg.text}
                </div>
              ))}
          </div>
          <div style={styles.inputArea}>
            <input
              type="text"
              style={styles.messageInput}
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button style={styles.sendBtn} onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DMSystem;
