const room = {
    hostname: "",
    guestList: [],
    roomTitle: "",
    gameType: "",
    play: false,
    secret: false,
    password: "",
    roomLimit: 0,
}

const user = {
    nickname: "",
    email: "",
    password: "",
    numberOfGames: {
        win: 0,
        lose: 0,
    },
    report: {
        count: 0,
        time: 0,
    }
}

const user2 = {
    nickname: "", // 닉네임 (중복X)
    email: "", // 로그인용 id (중복X)
    password: "", // 로그인용 password
    usingSns: true,
    sns: {
        provider: 'kakao',
        id: 1889505376,
    },
    numberOfGames: {
        win: 0,
        lose: 0,
    },
    report: {
        count: 0,
        time: 0,
    }
}



module.exports = { room, user }


// 게임시작 눌렀을 때 room 데이터 play = true

// 게임이 끝났을 때 첫번째 인원이 게임 결과 데이터를 서버로 보내주고 
// 서버는 받은 데이터를 기준으로 전적 업데이트와, room을 삭제한다.

// 로그인 : report 값 확인(특정값이 넘으면 로그인 불가)?
// 회원가입 : user 추가
// 회원정보 변경 : update() 사용해서 해보기
// 회원탈퇴 : email기준으로 삭제 

// 방 파기 : 방이름

// 신고기능 : 신고 접수시 해당 user report 값을 가져오고
// report + 1 한 값이 특정값 을 넘으면 영구밴?