import express from 'express'
import { addMessage, getMessage } from '../controllers/Messages'
const router = express.Router()
router.post('/addMsg', addMessage)
router.post('/getMsg', getMessage)
module.exports = router