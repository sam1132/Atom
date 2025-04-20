import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [activeChatUser, setActiveChatUser] = useState(null);

  return (
    <ChatContext.Provider value={{ activeChatUser, setActiveChatUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};
