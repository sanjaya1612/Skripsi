import express from "express";
const router = express.Router()
import {authUser, registerUser, getUserProfile} from '../controllers/userController.js'

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(getUserProfile)



export default router 