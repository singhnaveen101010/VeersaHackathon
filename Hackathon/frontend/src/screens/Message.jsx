import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/message.css';
import { FileUploader } from 'react-drag-drop-files';
import { FaFileArrowUp } from "react-icons/fa6";
// Define allowed file types
const allowedFileTypes = ['PDF', 'DOC', 'JPEG', 'PNG', 'JPG'];

function Message() {
  const [messages, setMessages] = useState([
    { text: "Hello, how can I assist you today?", isUser: false },
    { text: "I have a question about my recent appointment.", isUser: true }
  ]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input || file) {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput('');
      setFile(null); // Reset file after sending
    }
  };

  const handleFileChange = (file) => {
    setFile(file);
  };

  return (
    <>
      <div className="message-container">
        <Navbar currentPage="message" />
        <div className="message-container-body">
          <div className="message-container-heading">
            <h2>Chat With Dr. John</h2>
            <h3>(Dr. John is specialized in Cardiology)</h3>
          </div>

          <div className="message-container-chat">
            <div className="message-container-chat-messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.isUser ? 'user-message' : 'doctor-message'}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            {
                file && <div className="file-name">{file.name}</div>
              }
            <form className="message-container-chat-input" onSubmit={handleSendMessage}>
              <FileUploader
                handleChange={handleFileChange}
                name="file"
                types={allowedFileTypes}
                children={<FaFileArrowUp size={25}/>}
                className="file-uploader"
              />
             
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message"
                className="message-input"
              />
              <button type="submit" className="send-button">Send</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Message;
