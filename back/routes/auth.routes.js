import { Router } from 'express'
import { validateSignin, validateSignup } from '../middlewares/authValidation.js'
import { signin, signup } from '../controllers/auth.controller.js'

const authRouter = Router()

authRouter.post('/signup', validateSignup, signup)
authRouter.post('/signin', validateSignin, signin)

export default authRouter
