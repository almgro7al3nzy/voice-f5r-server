import { HomeScreen, RoomDetailScreen, RoomScreen, RoomSettingsScreen, SettingsScreen, SigninScreen, SplashScreen } from "../screens";
import { HOME, ROOM, SIGNIN, SPLASH, ROOMDETAIL, SETTINGS, ROOMSETTINGS } from "./screens";

export const Route = [
    {
        id:0,
        name:SPLASH,
        comp:SplashScreen
    },
    {
        id:1,
        name:SIGNIN,
        comp:SigninScreen
    },
    {
        id:2,
        name:HOME,
        comp:HomeScreen
    },
    {
        id:3,
        name:ROOM,
        comp:RoomScreen
    },
    {
        id:4,
        name:ROOMSETTINGS,
        comp:RoomSettingsScreen
    },
    {
        id:5,
        name:SETTINGS,
        comp:SettingsScreen
    },
]