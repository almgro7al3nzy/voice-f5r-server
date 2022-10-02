import Peer from "simple-peer";

export type PeerType = {
  peerId: string;
  peer: Peer.Instance;
  name: string;
  isAnonymous: boolean;
  handState?: boolean;
};

export type UserType = {
  id: string;
  name: string;
  isAnonymous: boolean;
};

export type MessageType = {
  senderName: string;
  isAnonymous: boolean | undefined;
  senderPfp: string | null;
  message: string;
  time: Date;
};
