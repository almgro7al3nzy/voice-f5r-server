const { checkRoomStructure } = require('./Constant/checkStructure');
const { isString, isObject, isBoolean, isArray } = require('./Constant/checkTypeOrEmpty');
const admin = require('firebase-admin');


const db = admin.firestore();

const FieldValue = admin.firestore.FieldValue;
const crypto = require('crypto')
const config = require('../../config');

exports.createRoom = async ({ room }) => {
    try {
        if (checkRoomStructure(room)) {
            const {
                hostname,
                guestList,
                roomTitle,
                gameType,
                play,
                secret,
                password,
                roomLimit,
            } = room;
            const res = db.collection("rooms");
            const encrypted = crypto.createHmac('sha1', config.secret)
                .update(password)
                .digest('base64')
            const addReturn = await res.add({
                hostname,
                guestList,
                roomTitle,
                gameType,
                play,
                secret,
                password: encrypted,
                roomLimit,
                timestamp: FieldValue.serverTimestamp()
            })
            console.log("check room")
            return { roomId: addReturn.id, success: true };
        } else {
            return { roomId: "", success: false };
        }
    }
    catch {
        console.error("createRoom catch error");
        console.log(error)
    }
}

exports.deleteRoom = async ({ roomId }) => {
    if (isString(roomId)) {
        const result = await db.collection('rooms').doc(roomId).delete();
        console.log(result)
    }
    else {
        console.error("deleteRoom error");
    }
}

exports.getListOfRooms = async () => {
    const result = await db.collection('rooms').get()
    const roomList = result.docs.map(doc => {
        const { password, ...room } = doc.data();
        return { ...room, roomId: doc.id }
    })
    return { roomList, success: !result.empty };
}

exports.getObjectOfRoom = async ({ roomId }) => {
    let success = false;
    let room = {};
    if (isString(roomId)) {
        const result = await db.collection('rooms').doc(roomId).get();
        const { password, ...roomWithoutPassword } = result.data();
        room = roomWithoutPassword;
        if (!result.empty) {
            success = true;
        }
        // console.log("get Object Of Room : ", result)
    }
    else {
        console.error("getObjectOfRoom error");
    }
    return { roomObject: room, success };
}



exports.joinRoom = async ({ roomId, nickname }) => {
    try {
        if (isString(roomId) &&
            isString(nickname)) {
            result = await db.collection('rooms').doc(roomId).update({
                guestList: FieldValue.arrayUnion(nickname)
            });
            return { success: true };
        }
        else {
            console.error("joinRoom error");
            return { success: false };
        }
    }
    catch (error) {
        console.error(error);
        return { success: false };
    }
}

exports.disconnectRoom = async ({ roomId, nickname }) => {
    try {
        if (isString(roomId) &&
            isString(nickname)) {
            result = await db.collection('rooms').doc(roomId).update({
                guestList: FieldValue.arrayRemove(nickname)
            });
            return { success: true };
        }
        else {
            console.error("disconnectRoom error");
            return { success: false };
        }
    }
    catch (error) {
        console.error(error);
        return { success: false };
    }
}

exports.accessRoom = async ({ roomId, password }) => {
    let correct = false;
    let success = false;
    if (isString(roomId) &&
        isString(password)) {
        const encrypted = crypto.createHmac('sha1', config.secret)
            .update(password)
            .digest('base64')
        const result = await db.collection('rooms').doc(roomId).get();
        const { password: roomPassword } = result.data();
        if (!result.empty) {
            success = true;
            if (encrypted === roomPassword) {
                correct = true;
            }
        }
        // console.log("get Object Of Room : ", result)
    }
    else {
        console.error("getObjectOfRoom error");
    }
    return { correct, success };
}