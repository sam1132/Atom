import React from "react";
import { useChat } from "../../../../Context/ChatContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../auth/Context";
const Chat = () => {
  const { activeChatUser } = useChat();
  const {backendUser,currentUser} = useAuth();
  const [messages, setMessages] = useState([]);

  useEffect(() => { 
    const fetchMessages = async () => {

      try {
        const token = await currentUser.getIdToken();
        const response = await axios.get(`http://localhost:3000/api/message/get/${activeChatUser.shortId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (activeChatUser) {
      fetchMessages();
    }
  },[activeChatUser]);
  return (
    <>
{/* getting backenduser as updated user to compare id below */}
{messages.map((msg, index) => (
        <div
          key={index}
          className={`chat ${msg.senderId === backendUser._id ? "chat-end" : "chat-start"}`}
        >
          <div className="chat-header text-white">
            {msg.senderName}
            <time className="text-xs opacity-50 ml-2">{new Date(msg.createdAt).toLocaleTimeString()}</time>
          </div>
          <div className="chat-bubble rounded-2xl max-w-[39%] break-words">
            {msg.message}
          </div>
        </div>
      ))}
    </>
  );
};

export default Chat;
