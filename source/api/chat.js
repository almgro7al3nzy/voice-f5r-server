import { get, orderByChild, push, query, ref, set, update } from "firebase/database";
import { convertObjectToArray } from "../utils/functions";
import { auth, db, Table } from "./constant";

export const createMessage = async (uid, message, roomId) => {
    try {
        return await push(ref(db, Table.Chat), { uid, message, roomId });
    } catch (error) {
        return error;
    }
}

export default class ChatApi {
    static createMessage = async (uid, message, roomId) => {
        const time = Date.now();
        try {
            const _ref = await push(ref(db, Table.Chat));
            const key = _ref.key;
            await update(ref(db, `${Table.Chat}/${key}`), { uid, message, roomId, time });
            return true;
        } catch (error) {
            return error;
        }
    }
    static getMessageByRoomId = async (roomId) => {
        try {
            const chat = await (await get(ref(db, `${Table.Chat}`, orderByChild(roomId)))).val();
            const resultArray = convertObjectToArray(chat);
            const filteredData = resultArray.filter((value, index) => (value.roomId === roomId))
            return {
                result: filteredData,
                error: null
            }
        } catch (error) {
            return {
                result: null,
                error
            };
        }
    }
}