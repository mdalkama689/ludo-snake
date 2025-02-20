import { Router } from "express";
import { checkRoom, createRoom, getProfile, signIn, signUp } from "../controllers/user-controller";
import { authMiddleware } from "../middleware";



 const router = Router()

 router.post('/signup', signUp)
 router.post('/signin', signIn)
 router.get('/me', authMiddleware,   getProfile)
 router.post('/create-room', authMiddleware,   createRoom)
 router.post('/check-room', authMiddleware,   checkRoom)
export default router