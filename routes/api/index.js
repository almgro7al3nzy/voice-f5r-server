const router = require('express').Router()
// const authMiddleware = require('../../middlewares/auth')
const user = require('./user')
const room = require('./room')
const auth = require('./auth');


// router.use('/user', authMiddleware)
router.use('/user', user)
router.use('/room', room)
router.use('/auth', auth)

module.exports = router