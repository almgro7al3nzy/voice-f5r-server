import React from "react"
import Home from "./Home"
import Room from './Room'
import RoomSettings from "./Room/Settings"
import Signin from "./Signin"
import Splash from "./Splash"
import Settings from "./Settings"

export const SplashScreen = () => <Splash />
export const SigninScreen = () => <Signin />
export const HomeScreen = () => <Home />
export const RoomScreen = () => <Room />
export const RoomSettingsScreen = () => <RoomSettings/>
export const SettingsScreen = () => <Settings/>