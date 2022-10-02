import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { height } from "./variable";

export const convertObjectToArray = (data) => {
    const array = [];

    Object.keys(data).forEach((key) => {
        array.push(data[key]);
    });

    return array;
};

export const generateRandomColor=()=> {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export const fontScale = (fSize) => {
    let value =  RFValue(fSize, height);
    return value;
};