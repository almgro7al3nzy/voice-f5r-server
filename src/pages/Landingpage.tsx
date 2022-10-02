import { FC, useEffect, useRef } from "react";
import { FiMic, FiMicOff, FiVideo, FiVideoOff } from "react-icons/fi";

import { AiOutlineEnter } from "react-icons/ai";
import "../styles/landing.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAppContext } from "../context/AppProvider";
import { RiChatVoiceLine } from "react-icons/ri";

const Landingpage: FC = () => {
  const vidRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream>();
  const history = useHistory();

  const { isMicOn, isVideoOn, dispatchApp } = useAppContext();

  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks()[0].enabled = isMicOn;
      streamRef.current.getVideoTracks()[0].enabled = isVideoOn;
    }
  }, [isMicOn, isVideoOn]);

  useEffect(() => {
    const getMediaDevices = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        streamRef.current = stream;
        if (vidRef.current) vidRef.current.srcObject = streamRef.current;
      } catch (error) {}
    };
    getMediaDevices();
  }, []);

  interface JoinRoom {
    room: string;
  }

  interface JoinChatRoom {
    room: string;
  }

  const {
    register: joinRegister,
    handleSubmit: joinHandleSubmit,
    formState: { errors: joinErrors },
  } = useForm<JoinRoom>();

  const {
    register: joinChatRoomRegister,
    handleSubmit: makeRoomHandleSubmit,
    formState: { errors: chatRoomErrors },
  } = useForm<JoinChatRoom>();

  const joinSubmitHandler: SubmitHandler<JoinRoom> = (data, e) => {
    history.push(`/room/${data.room.toLowerCase()}`);

    e?.target.reset();
  };

  const joinChatRoomSubmitHandler: SubmitHandler<JoinChatRoom> = (data, e) => {
    history.push(`/chatroom/${data.room.toLowerCase()}`);
    e?.target.reset();
  };

  return (
    <>
      <Navbar />
      <main id="landing">
        <div className="video-container">
          {!isVideoOn && <div className="no-vid"></div>}
          <video ref={vidRef} autoPlay muted playsInline></video>
          <div className="controls">
            <button
              id="audio-btn"
              onClick={() => dispatchApp({ type: "MIC-TOGGLE" })}
            >
              {isMicOn ? <FiMic /> : <FiMicOff className="off" />}
            </button>
            <button
              id="video-btn"
              onClick={() => dispatchApp({ type: "VIDEO-TOGGLE" })}
            >
              {isVideoOn ? <FiVideo /> : <FiVideoOff className="off" />}
            </button>
          </div>
        </div>
        <div className="room-container">
          <div className="form-clamp">
            <form
              onSubmit={joinHandleSubmit(joinSubmitHandler)}
              autoComplete="off"
            >
              <input
                type="text"
                placeholder="Enter Code To Join The Call"
                {...joinRegister("room", {
                  required: "Enter The Room Code To Join",
                  pattern: {
                    value: /^[a-zA-Z0-9-]+$/,
                    message: "only alphanumeric character and hypen allowed",
                  },
                  maxLength: {
                    value: 25,
                    message:
                      "Room Code must be less than 25 characters long :(",
                  },
                })}
              />
              <button>
                <AiOutlineEnter /> Join Meet
              </button>
            </form>
            {joinErrors.room && (
              <p className="error">{joinErrors.room.message}</p>
            )}
            <form
              onSubmit={makeRoomHandleSubmit(joinChatRoomSubmitHandler)}
              autoComplete="off"
            >
              <input
                type="text"
                placeholder="Join Just The Chat Room"
                {...joinChatRoomRegister("room", {
                  required: "Enter The Room Code To Join",
                  pattern: {
                    value: /^[a-zA-Z0-9-]+$/,
                    message: "only alphanumeric character and hypen allowed",
                  },
                  maxLength: {
                    value: 25,
                    message:
                      "Room Code must be less than 25 characters long :(",
                  },
                })}
              />
              <button>
                <RiChatVoiceLine /> Join Chat
              </button>
            </form>
            {chatRoomErrors.room && (
              <p className="error">{chatRoomErrors.room.message}</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Landingpage;
