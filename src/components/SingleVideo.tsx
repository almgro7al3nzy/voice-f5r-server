import { useRef, useEffect, useState } from "react";
import hark from "hark";
import Peer from "simple-peer";

export const Video = ({
  peer,
  name,
  isAnonymous,
  handState,
}: {
  peer: Peer.Instance;
  name: string;
  isAnonymous: boolean;
  handState?: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    peer.on("stream", (stream) => {
      const speakingEvents = hark(stream);
      videoRef.current!.srcObject = stream;

      speakingEvents.on("speaking", () => {
        setIsSpeaking(true);
      });

      speakingEvents.on("stopped_speaking", () => {
        setIsSpeaking(false);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // we dont need to add peer as a dependency array because we manually cleanup
  // the disconneted users so after the repaint the components unmounts itself

  return (
    <div className={`video-container ${isSpeaking ? "speaking" : ""}`}>
      <video playsInline autoPlay ref={videoRef} />
      <p>{`${name} ${!!isAnonymous ? "(Guest)" : ""}`}</p>
      <div className={`hand ${!handState ? "invisible" : ""}`}>✋🏼</div>
    </div>
  );
};
