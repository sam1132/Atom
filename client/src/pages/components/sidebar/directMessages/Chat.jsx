import React, { useState } from "react";
import { useChat } from "../../../../Context/ChatContext";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../auth/Context";

const Chat = () => {
  const { activeChatUser } = useChat();
  const { backendUser, currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = await currentUser.getIdToken();
        const response = await axios.get(
          `http://localhost:3000/api/message/get/${activeChatUser.shortId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (activeChatUser) {
      fetchMessages();
    }
  }, [activeChatUser]);

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  const closeModal = () => {
    setSelectedFile(null);
  };

  return (
    <>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`chat ${
            msg.senderId === backendUser._id ? "chat-end" : "chat-start"
          }`}
        >
          <div className="chat-header text-white">
            {msg.senderName}
            <time className="text-xs opacity-50 ml-2">
              {new Date(msg.createdAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "2-digit",
              })}{" "}
              {new Date(msg.createdAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </time>
          </div>
          <div className="chat-bubble rounded-2xl max-w-[39%] break-words">
            {msg.message}
            {msg.files &&
              msg.files.map((file) => (
                <div key={file._id}>
                  {file?.fileType?.startsWith("image/") ? (
                    <img
                      src={file.fileUrl}
                      alt={file.originalName}
                      style={{ maxWidth: "200px", cursor: "pointer" }}
                      onClick={() => handleFileClick(file)} // Open modal on click
                    />
                  ) : (
                    <a
                      href={file.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline mt-2 block"
                    >
                      {file.originalName}
                    </a>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
      {selectedFile && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative">
            <img
              src={selectedFile.fileUrl}
              alt={selectedFile.originalName}
              className="max-w-full max-h-screen rounded-lg"
            />
            <button
              className="absolute top-2 right-2 text-black cursor-pointer text-2xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
