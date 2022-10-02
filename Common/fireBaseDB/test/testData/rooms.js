
const rooms = [
    {
        hostname: "장석찬",
        guestList: [],
        roomTitle: "너만 오면 고",
        gameType: "YUT",
        play: false,
        roomSecret: {
            secret: true,
            password: "1234"
        },
        roomLimit: 4,
    },
    {
        hostname: "이종찬",
        guestList: [],
        gameType: "AVALON",
        roomTitle: "너만 오면 고",
        gameType: "",
        play: false,
        roomSecret: {
            secret: true,
            password: "1234"
        },
        roomLimit: 8,
    },
    {
        hostname: "정진",
        guestList: [],
        roomTitle: "너만 오면 고",
        gameType: "YACHT",
        play: false,
        roomSecret: {
            secret: true,
            password: "1234"
        },
        roomLimit: 2,
    },
    {
        hostname: "조석영",
        guestList: [],
        roomTitle: "너만 오면 고",
        gameType: "YACHT",
        play: false,
        roomSecret: {
            secret: false,
            password: ""
        },
        roomLimit: 2,
    },
]

module.exports = rooms;