const fireBaseRoom = require('../../../Common/fireBaseDB/room');


exports.getRooms = async (req, res, next) => {
    try {
        const { roomList, success } = await fireBaseRoom.getListOfRooms();
        const users = JSON.stringify({ roomList, success });
        res.send(users)
    } catch (error) {
        next(error)
    }
};

exports.getRoom = async (req, res, next) => {
    try {
        const roomId = req.body['roomId'];
        console.log("getRoom - get room id from request : ", roomId)
        const { roomObject, success } = await fireBaseRoom.getObjectOfRoom({ roomId });
        console.log("getRoom - get room id from request : ", roomObject)

        const roomObjectWithSuccess = JSON.stringify({ roomObject, success });
        res.send(roomObjectWithSuccess)
    } catch (error) {
        next(error)
    }
};


exports.createRoom = async (req, res, next) => {
    try {
        const roomConfig = req.body;
        console.log("check create Room")
        const { roomId, success } = await fireBaseRoom.createRoom({ room: roomConfig });
        if (success) {
            res.send(roomId)
        }
        else {
            res.send("")
        }
    } catch (error) {
        next(error)
    }
};


exports.accessRoom = async (req, res, next) => {
    try {
        const roomId = req.body['roomId'];
        const password = req.body['password'];
        const { correct, success } = await fireBaseRoom.accessRoom({ roomId, password });
        const accessResult = JSON.stringify({ correct, success });
        res.send(accessResult)
    } catch (error) {
        next(error)
    }
};