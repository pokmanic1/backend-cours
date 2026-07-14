import express from 'express'
import { register ,login } from '../controllers/authController.js';



const router = express.Router();
//clean patern controler is a function that is gonna have a handler for when that rout is hit
router.post('/register', register);
router.post('/login', login);

export default router;