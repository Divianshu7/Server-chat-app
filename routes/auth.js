import express from 'express'
import { register, login, setAvatar, allUsers } from '../controllers/auth'
const router = express.Router()
router.post('/auth/register', register)
router.post('/auth/login', login)
router.post('/auth/setAvatar/:userId', setAvatar)
router.get('/auth/allUsers/:userId', allUsers)
module.exports = router