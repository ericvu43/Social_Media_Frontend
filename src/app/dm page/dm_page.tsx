import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Friend {
  id: string;
  username: string;
  avatar?: string;
  online?: boolean;
}

const FriendsList: React.FC = () => {
  const navigate = useNavigate();

  const friends: Friend[] = [
    { id: '1', username: 'john_doe', online: true },
    { id: '2', username: 'jane_smith', online: false },
    { id: '3', username: 'bob_jones', online: true },
  ];

  const handleDMClick = (friendId: string) => {
    navigate(`/messages/${friendId}`);
  };

  return (
    <div className="friends-list-container">
      <h1>Friends List</h1>
      
      <div className="friends-list">
        {friends.length === 0 ? (
          <p>No friends found</p>
        ) : (
          friends.map((friend) => (
            <div key={friend.id} className="friend-item">
              <div className="friend-info">
                {friend.avatar && (
                  <img 
                    src={friend.avatar} 
                    alt={`${friend.username}'s avatar`}
                    className="friend-avatar"
                  />
                )}
                <span className="friend-username">{friend.username}</span>
                {friend.online !== undefined && (
                  <span className={`status-dot ${friend.online ? 'online' : 'offline'}`}></span>
                )}
              </div>
              <button
                onClick={() => handleDMClick(friend.id)}
                className="dm-button"
              >
                DM
              </button>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .friends-list-container {
          padding: 30px;
          max-width: 700px;
          margin: 0 auto;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
        }

        h1 {
          color: #2c3e50;
          font-family: 'Segoe UI', sans-serif;
          font-weight: 700;
          text-align: center;
          margin-bottom: 30px;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }

        .friends-list {
          background: white;
          border-radius: 15px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .friend-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }

        .friend-item:hover {
          background: #f8f9fa;
          transform: translateY(-2px);
        }

        .friend-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .friend-avatar {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .friend-username {
          font-size: 18px;
          color: #34495e;
          font-family: 'Segoe UI', sans-serif;
          font-weight: 500;
        }

        .status-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          display: inline-block;
          border: 2px solid #fff;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .online {
          background: #27ae60;
        }

        .offline {
          background: #7f8c8d;
        }

        .dm-button {
          padding: 8px 20px;
          background: linear-gradient(45deg, #3498db, #2980b9);
          color: white;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
        }

        .dm-button:hover {
          background: linear-gradient(45deg, #2980b9, #2471a3);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.25);
        }

        .dm-button:active {
          transform: translateY(0);
          box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default FriendsList;