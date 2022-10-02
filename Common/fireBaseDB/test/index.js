
const users = require('./testData/users');
const rooms = require('./testData/rooms');

const fireBaseUser = require('../user');
const fireBaseRoom = require('../room');

exports.test = ({ db }) => {
    // 방에 참석한 사람 추가 제거 (테스트 코드)
    fireBaseRoom.joinRoom({ db, roomId: 'Lz4HdeBKmedo7CB2eAIh', nickname: 'asdfafdsafds' });
    fireBaseRoom.disconnectRoom({ db, roomId: "Lz4HdeBKmedo7CB2eAIh", nickname: '장석찬' })

    // test 데이터로 user 4명 생성 (테스트 코드)
    users.forEach(async user => {
        const a = db.collection("users").doc(user.email)
        const test1 = await a.set(user)
        const test2 = await a.update({ timestamp: FieldValue.serverTimestamp() })
        // console.log(test1, test2)
    });

    // test 데이터로 room 4개 생성 (테스트 코드)
    rooms.forEach(async i => {
        const a = db.collection("rooms")
        const test1 = await a.add({ ...i, timestamp: FieldValue.serverTimestamp() })
        // console.log(test1)
    });

    // 삭제 (테스트 코드)
    fireBaseUser.deleteUser({ db, email: "test1@google.com" });

    // room 리스트 가져오기 (테스트 코드)
    console.log(fireBaseRoom.getListOfRooms());
}