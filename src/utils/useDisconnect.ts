import { useEffect } from "react";
import { useAppContext } from "../context/AppProvider";

export const useDisconnect = () => {
  const { dispatchApp, leaveVideoChatTrigger } = useAppContext();
  useEffect(() => {
    dispatchApp({ type: "DISCONNECTED" });
    if (leaveVideoChatTrigger) window.location.reload();
  }, []);
};
