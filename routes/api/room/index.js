const router = require('express').Router()
const controller = require('./room.controller')
const { isLoggedIn, isNotLoggedIn, haveNickname } = require('../../middleWare');

router.post('/getRooms', controller.getRooms);
router.post('/getRoom', isLoggedIn, haveNickname, controller.getRoom);
router.post('/createRoom', isLoggedIn, haveNickname, controller.createRoom);
router.post('/accessRoom', isLoggedIn, haveNickname, controller.accessRoom);

module.exports = router