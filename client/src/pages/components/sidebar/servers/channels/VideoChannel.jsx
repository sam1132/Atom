import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";

const VideoChannel = () => {
  const { serverId, channelId } = useParams();
  const meetingRef = useRef(null);

  useEffect(() => {
    // Dynamically load VideoSDK script
    const script = document.createElement("script");
    script.src =
      "https://sdk.videosdk.live/rtc-js-prebuilt/0.3.8/rtc-js-prebuilt.js";
    script.async = true;

    script.onload = () => {
      // Initialize VideoSDK meeting after script loads
      if (window.VideoSDKMeeting) {
        const meeting = new window.VideoSDKMeeting();
        meetingRef.current = meeting;

        const config = {
          name: "John Doe", // You can dynamically set this using auth context
          apiKey: "48bc2766-5e12-47be-8e77-fcf610e6afff", // Replace with your actual API key
          meetingId: channelId, // Use channelId as meetingId for uniqueness

          containerId: "videosdk-container",
          redirectOnLeave: `${window.location.origin}/user/server/${serverId}`, // Redirect to server-specific URL

          micEnabled: true,
          webcamEnabled: true,
          participantCanToggleSelfWebcam: true,
          participantCanToggleSelfMic: true,

          chatEnabled: true,
          screenShareEnabled: true,
          pollEnabled: true,
          whiteboardEnabled: true,
          raiseHandEnabled: true,

          recordingEnabled: true,
          recordingWebhookUrl: "https://www.videosdk.live/callback",
          recordingAWSDirPath: `/meeting-recordings/${channelId}/`,
          autoStartRecording: true,

          brandingEnabled: true,
          brandLogoURL: "https://picsum.photos/200",
          brandName: "Awesome startup",
          poweredBy: true,

          participantCanLeave: true,

          livestream: {
            autoStart: true,
            outputs: [],
          },

          permissions: {
            askToJoin: false,
            toggleParticipantMic: true,
            toggleParticipantWebcam: true,
            drawOnWhiteboard: true,
            toggleWhiteboard: true,
            toggleRecording: true,
            removeParticipant: true,
            endMeeting: true,
          },

          joinScreen: {
            visible: true,
            title: "Video Channel",
            meetingUrl: window.location.href,
          },

          pin: {
            allowed: true,
            layout: "SPOTLIGHT",
          },

          leftScreen: {
            actionButton: {
              label: "Video SDK Live",
              href: "https://videosdk.live/",
            },
          },

          notificationSoundEnabled: true,
          maxResolution: "hd",
        };

        meeting.init(config);
      }
    };

    script.onerror = () => {
      console.error("Failed to load VideoSDK script");
    };

    document.head.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      document.head.removeChild(script);
      meetingRef.current = null;
    };
  }, [serverId, channelId]);

  return (
    <div className="h-full w-full bg-[#1a0e33] text-[#eee] flex flex-col">
      <div id="videosdk-container" className="flex-1 w-full bg-black/50"></div>
    </div>
  );
};

export default VideoChannel;
