import { Router } from 'express'
import { validateSignin, validateSignup } from '../middlewares/authValidation.js'
import requireAuth from '../middlewares/requireAuth.js'
import { me, signin, signup } from '../controllers/auth.controller.js'

const authRouter = Router()

authRouter.post('/signup', validateSignup, signup)
authRouter.post('/signin', validateSignin, signin)
authRouter.get('/me', requireAuth, me)

export default authRouter
