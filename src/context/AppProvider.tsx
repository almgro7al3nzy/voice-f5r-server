import React, { useReducer } from "react";
import { reducer, ReturnType } from "./reducer";

const AppContext = React.createContext<null | ReturnType>(null);

export type StateType = {
  isMicOn: boolean;
  isVideoOn: boolean;
  leaveVideoChatTrigger: boolean;
  chatRoomTrigger: boolean;
  isSharingScreen: boolean;
};

export const initialState: StateType = {
  isMicOn: true,
  isVideoOn: true,
  leaveVideoChatTrigger: false,
  chatRoomTrigger: false,
  isSharingScreen: false,
};

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ ...state, dispatchApp: dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return React.useContext(AppContext)!;
};

export { AppProvider, useAppContext };
