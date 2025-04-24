import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {ChatProvider} from "./Context/ChatContext.jsx";
import { SocketProvider } from "./Context/SocketContext.jsx";
import { AuthProvider } from "./pages/auth/Context.jsx";
createRoot(document.getElementById("root")).render(
  <AuthProvider>  
    <ChatProvider>
      <SocketProvider>
      <App />
      </SocketProvider>
    </ChatProvider>
  </AuthProvider>
);
