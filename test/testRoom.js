const axios = require('axios');

const getRooms = () => {
    const getRoomsConfig = {
        method: 'post',
        url: 'http://localhost:4000/api/room/getRooms',
        headers: {}
    };
    axios(getRoomsConfig)
        .then(function (response) {
            console.log("방 목록 가져오기 : ", response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const getRoom = async (roomId) => {
    const getRoomConfig = {
        method: 'post',
        url: 'http://localhost:4000/api/room/getRoom',
        data: {
            roomId
        }
    }
    try {
        const roomObject = await axios(getRoomConfig);
        return roomObject.data;
    }
    catch (error) {
        console.error(error)
        return {}
    }
}


const createRoom = async () => {
    const createRoomConfig = {
        method: 'post',
        url: 'http://localhost:4000/api/room/createRoom',
        data: {
            hostname: "테스트",
            guestList: [],
            roomTitle: "테스트2",
            gameType: "yut",
            play: false,
            secret: false,
            password: "asdfqwer",
            roomLimit: 0,
        }
    };
    try {
        const roomId = await axios(createRoomConfig);
        console.log("생성 id: ", roomId.data);
        return roomId.data;
    }
    catch (error) {
        console.error(error)
        return ""
    }
}

const accessRoom = () => {
    const accessRoomConfig = {
        method: 'post',
        url: 'http://localhost:4000/api/room/accessRoom',
        data: {
            roomId: 'mzi1ffZclHG8puYOiQbI',
            password: 'asdfqwer'
        }
    }
    axios(accessRoomConfig)
        .then(function (response) {
            console.log("roomId and RoomPassword check : ", response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

// getRooms();
const test = async () => {
    // 방 생성
    const roomId = await createRoom();
    // console.log("roomId : ", roomId);
    // roomId 값으로 해당 방 정보 가져오기
    const roomObject = await getRoom(roomId);
    // console.log("room Object: ", roomObject);
}
// test();
// accessRoom();
// checkUserEmail();
// createUser();
// deleteUserFromNickname();