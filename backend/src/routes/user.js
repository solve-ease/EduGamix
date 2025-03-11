import express from 'express'
import { addUser, getUser } from '../controllers/userController.js'

const router = express.Router()

router.post('/add-user', addUser)
router.get('/get-user/:id', getUser)

export default router
