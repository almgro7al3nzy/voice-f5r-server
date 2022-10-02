const router = require('express').Router()
const controller = require('./user.controller')
const { isLoggedIn, isNotLoggedIn, haveNickname } = require('../../middleWare');

router.get('/getUser', isLoggedIn, haveNickname, controller.getUser);
router.get('/getUserFromNickname', controller.getUserFromNickname);
router.post('/register', isNotLoggedIn, controller.register);

router.post('/deleteUserFromEmail', isLoggedIn, controller.deleteUserFromEmail);
router.post('/deleteUserFromNickname', isLoggedIn, controller.deleteUserFromNickname);

router.get('/checkEmailDuplication', controller.checkEmailDuplication);
router.get('/checkNicknameDuplication', controller.checkNicknameDuplication);

router.get('/joinSns', isLoggedIn, haveNickname, controller.joinSns)
router.post('/setNickname', isLoggedIn, controller.setNickname)


// router.post('/joinSns', isLoggedIn,
//     (req, res, next) => {
//         console.log(req.user);

//         next();
//     }
// );


module.exports = router