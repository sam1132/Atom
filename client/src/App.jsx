import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { toastStyle } from "./utils/toastStyle";
import { AuthProvider } from "./pages/auth/Context";
import Stars from "./pages/layout/Background";
import Signup from "./pages/auth/Signup";
import SetupProfile from "./pages/auth/SetupProfile";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import User from "./pages/layout/User";
import Explore from "./pages/components/Explore";
import Message from "./pages/components/sidebar/directMessages/Message";
import Settings from "./pages/components/sidebar/userDashboard/Settings";
import MindMuffins from "./pages/components/sidebar/userDashboard/MindMuffins";
import DiscoverServer from "./pages/components/sidebar/DiscoverServer";
import Docket from "./pages/components/sidebar/userDashboard/Docket";
import Planner from "./pages/components/sidebar/userDashboard/Planner";
import { ProtectedProfileRoute } from "./pages/auth/ProtectedProfileRoute";
import { ProtectedAuthRoute } from "./pages/auth/ProtectedAuthRoute";
import Resources from "./pages/components/sidebar/userDashboard/Resources";
import Server from "./pages/components/sidebar/servers/Server";
import AudioChannel from "./pages/components/sidebar/servers/channels/AudioChannel";
import TextChannel from "./pages/components/sidebar/servers/channels/TextChannel";
import VideoChannel from "./pages/components/sidebar/servers/channels/VideoChannel";
import ServerLanding from "./pages/components/sidebar/servers/ServerLanding";
import LandingPage from "./pages/layout/LandingPage";
function App() {
  return (
    <div className="bg-[#150A26] p-[12.5px] h-screen">
      <Stars />
      <AuthProvider>
        <Toaster {...toastStyle} />
        <Router>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<LandingPage />} />
            <Route element={<ProtectedAuthRoute />}>
              <Route path="/setup-profile" element={<SetupProfile />} />
            </Route>

            <Route element={<ProtectedProfileRoute />}>
              <Route path="/user" element={<User />}>
                <Route index element={<Explore />} />
                <Route path="message/:shortId" element={<Message />} />
                <Route path="discover" element={<DiscoverServer />} />
                <Route path="server/:serverId" element={<Server />}>
                  <Route index element={<ServerLanding />} />
                  <Route path="text/:channelId" element={<TextChannel />} />
                  <Route path="audio/:channelId" element={<AudioChannel />} />
                  <Route path="video/:channelId" element={<VideoChannel />} />
                </Route>

                <Route path="settings" element={<Settings />} />
                <Route path="resources" element={<Resources />} />
                <Route path="docket" element={<Docket />} />
                <Route path="planner" element={<Planner />} />
                <Route path="mind-muffins" element={<MindMuffins />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}
export default App;
