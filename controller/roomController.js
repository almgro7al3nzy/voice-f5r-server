const Room = require("../model/roomModel");
const mongoose = require("mongoose");

async function getRoomList(_req, res) {
    const rooms = await Room.find({});
    res.status(200).json(rooms);
}

async function createNewRoom(_req, res) {
    const roomData = {
        users: [],
        voiceUsers: [],
        messageHistory: []
    }
    try {
        const room = await Room.create(roomData);
        res.status(201).json(room);
    } catch (err) {
        res.status(400).json(err.message);
    }
}

async function getSingleRoom(req, res) {
    const { roomID } = req.params;
    if (!mongoose.Types.ObjectId.isValid(roomID)) {
        return res.status(404).json({ error: "no room found" });
    }
    const roomFound = await Room.findById(roomID);
    if (!roomFound) {
        return res.status(404).json({ error: "no room found" });
    }
    res.status(200).json(roomFound);
}

async function deleteRoom(req, res) {
    const { roomID } = req.params;
    if (!mongoose.Types.ObjectId.isValid(roomID)) {
        return res.status(404).json({ error: "no room found" });
    }
    const roomFound = await Room.findOneAndDelete({ _id: roomID });
    if (!roomFound) {
        return res.status(404).json({ error: "no room found" });
    }
    const rooms = await Room.find({});
    res.status(200).json(rooms);
}

async function newUserJoin(req, res) {
    const { roomID } = req.params;
    if (!mongoose.Types.ObjectId.isValid(roomID)) {
        return res.status(404).json({ error: "no room found" });
    }
    const roomFound = await Room.findOneAndUpdate({ _id: roomID }, { $push: { users: req.body } }, { new: true });
    if (!roomFound) {
        return res.status(404).json({ error: "no room found" });
    }
    try {
        res.status(200).json(roomFound);
    } catch (err) {
        res.status(400).json(err.message);
    }
}

async function newVoiceUserJoin(req, res) {
    const { roomID } = req.params;
    if (!mongoose.Types.ObjectId.isValid(roomID)) {
        return res.status(404).json({ error: "no room found" });
    }
    const roomFound = await Room.findOneAndUpdate({ _id: roomID }, { $push: { voiceUsers: req.body } }, { new: true });
    if (!roomFound) {
        return res.status(404).json({ error: "no room found" });
    }
    try {
        res.status(200).json(roomFound);
    } catch (err) {
        res.status(400).json(err.message);
    }
}

async function userLeft(req, res) {
    const { roomID, userID } = req.params;
    if (!mongoose.Types.ObjectId.isValid(roomID)) {
        return res.status(404).json({ error: "no room found" });
    }
    const userFound = await Room.findOneAndUpdate({ _id: roomID }, { $pull: { users: { userID: userID }, voiceUsers: { userID: userID } } }, { new: true });
    const room = await Room.findById(roomID);
    if (!userFound) {
        return res.status(404).json({ error: "no user found" });
    }
    try {
        res.status(200).json(room);
    } catch (err) {
        res.status(400).json(err.message);
    }
}


async function postMessage(req, res) {
    const { roomID } = req.params;
    if (!mongoose.Types.ObjectId.isValid(roomID)) {
        return res.status(404).json({ error: "no room found" });
    }
    const roomFound = await Room.findOneAndUpdate({ _id: roomID }, { $push: { messageHistory: req.body } }, { new: true });
    if (!roomFound) {
        return res.status(404).json({ error: "no room found" });
    }
    try {
        res.status(200).json(roomFound);
    } catch (err) {
        res.status(400).json(err.message);
    }
}

async function deleteMsg(req, res) {
    const { roomID, msgID } = req.params;
    if (!mongoose.Types.ObjectId.isValid(roomID)) {
        return res.status(404).json({ error: "no room found" });
    }
    if (!mongoose.Types.ObjectId.isValid(msgID)) {
        return res.status(404).json({ error: "no message found" });
    }
    const msgFound = await Room.findOneAndUpdate({ _id: roomID }, { $pull: { messageHistory: { _id: msgID } } }, { new: true });
    if (!msgFound) {
        return res.status(404).json({ error: "no message found" });
    }
    try {
        res.status(200).json(msgFound);
    } catch (err) {
        res.status(400).json(err.message);
    }
}

module.exports = { newVoiceUserJoin, getRoomList, createNewRoom, getSingleRoom, newUserJoin, deleteRoom, userLeft, postMessage, deleteMsg };