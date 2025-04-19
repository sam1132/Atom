import React from "react";

const Chat = () => {
  return (
    <>
      <div className="chat chat-start">
        <div className="chat-header text-white">
          Obi-Wan Kenobi
          {/* receiver name */}
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble rounded-2xl max-w-[39%] break-words">You were the Chosen One!</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-header text-white">
         you {/* sender name */}
          <time className="text-xs opacity-50">12:46</time>
        </div>
        <div className="chat-bubble rounded-2xl">I hate you!</div>
      </div>
    </>
  );
};

export default Chat;
