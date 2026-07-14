import express from 'express'
import { register } from '../controllers/authController.js';



const router = express.Router();
//clean patern controler is a function that is gonna have a handler for when that rout is hit
router.get('/register', register);

export default router;