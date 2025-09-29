import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack, IoSend } from 'react-icons/io5';
import { FaBell } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import './Chat.css';

const Chat = () => {
    const navigate = useNavigate();
    return (
        <div className="chat-container">
            <header className="chat-header">
                <button onClick={() => navigate(-1)}><IoArrowBack size={24} /></button>
                <div className="chat-info">
                    <h3>Chat - Middleman</h3>
                    <span>+91 xxxxxxxxx89</span>
                </div>
                <div className="chat-actions">
                    <button><FaBell size={22} /></button>
                    <button><BsThreeDotsVertical size={22} /></button>
                </div>
            </header>

            <main className="messages-area">
                <div className="message received">Ok. Glad We Can Record This Deal Transparently.</div>
                <div className="message sent">Yes, Now Both Of Us And Buyers Can Get The Fair Price.</div>
                 <div className="message received">That Works . I Will Update The Quantity And Price In The App.</div>
                <div className="message sent">Okay. I Will Confirm The Purchase And Arrange Transport.</div>
            </main>

            <footer className="message-input-area">
                <input type="text" placeholder="Type message here..." />
                <button className="send-btn"><IoSend size={24} /></button>
            </footer>
        </div>
    );
};

export default Chat;