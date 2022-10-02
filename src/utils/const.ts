export const __prod__ = process.env.NODE_ENV === "production";

export const iceServers: RTCIceServer[] = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun2.l.google.com:19302" },
  { urls: "stun:stun4.l.google.com:19302" },
  {
    urls: "turn:numb.viagenie.ca",
    username: "nishitdua175@gmail.com",
    credential: "password",
  },
];

export const UserMediaConstraints: MediaStreamConstraints = {
  video: {
    height: {
      min: 144,
      ideal: 360,
      max: 720,
    },
    facingMode: {
      exact: "user",
    },
  },
  audio: true,
};
