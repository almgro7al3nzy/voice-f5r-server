import { useParams } from "react-router-dom";
import { FC, useState } from "react";
import VideoChat from "../components/VideoChats";
import TextChat from "../components/ChatLibrary";
import "../styles/room.scss";
import { BiChat } from "react-icons/bi";
import { FiMic, FiMicOff, FiVideo, FiVideoOff } from "react-icons/fi";
import { MdCallEnd, MdScreenShare, MdStopScreenShare } from "react-icons/md";
import { RiChatVoiceLine } from "react-icons/ri";
import { useAppContext } from "../context/AppProvider";
import { ToastContainer } from "react-toastify";
import useSound from "use-sound";

import leaveSoundEffect from "../assets/discord-leave.mp3";
import { __prod__ } from "../utils/const";
import { io } from "socket.io-client";

type UrlParams = {
  roomId: string;
};

const socket = __prod__
  ? io("https://engage-clone-server.herokuapp.com/")
  : io("http://localhost:5000");

// const socket = io("https://engage-clone-server.herokuapp.com/");

const Room: FC = () => {
  const { isMicOn, isVideoOn, dispatchApp, isSharingScreen } = useAppContext();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [handsUp, setHandsUp] = useState(false);

  const [leaveSound] = useSound(leaveSoundEffect, {
    soundEnabled: true,
  });

  let { roomId } = useParams<UrlParams>();
  roomId = roomId.toLowerCase();

  return (
    <main id="room">
      <div className="video-grid">
        <VideoChat roomId={roomId} socket={socket} handsUp={handsUp} />
      </div>
      <TextChat
        roomId={roomId}
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
      />
      <div className="controls">
        <button onClick={() => dispatchApp({ type: "MIC-TOGGLE" })}>
          {isMicOn ? <FiMic /> : <FiMicOff className="off" />}
          <p className="tool-tip">Mic</p>
        </button>
        <button onClick={() => dispatchApp({ type: "VIDEO-TOGGLE" })}>
          {isVideoOn ? <FiVideo /> : <FiVideoOff className="off" />}
          <p className="tool-tip">Video</p>
        </button>
        <button
          onClick={() => {
            leaveSound();
            dispatchApp({ type: "GO-TO-CHAT-ROOM" });
          }}
        >
          <RiChatVoiceLine className="redirect" />
          <p className="tool-tip">Chat Room</p>
        </button>
        <button
          onClick={() => {
            leaveSound();
            dispatchApp({ type: "DECONNECT-FROM-VIDEO" });
          }}
        >
          <MdCallEnd className="off" />
          <p className="tool-tip">Bye</p>
        </button>
        <button
          onClick={() => {
            setIsChatOpen((s) => !s);
          }}
        >
          <BiChat />
          <p className="tool-tip">Chat</p>
        </button>
        <button
          onClick={() => {
            socket.emit("hands", { id: socket.id, state: !handsUp });
            setHandsUp((v) => !v);
          }}
        >
          {handsUp ? "✊🏼" : "✋🏼"}
          <p className="tool-tip">Ask</p>
        </button>
        <button
          onClick={() => {
            dispatchApp({ type: "SHARE-SCREEN" });
          }}
        >
          {isSharingScreen ? <MdStopScreenShare /> : <MdScreenShare />}
          <p className="tool-tip">Screen</p>
        </button>
      </div>
      <ToastContainer onClick={() => setIsChatOpen(true)} />
    </main>
  );
};

export default Room;
