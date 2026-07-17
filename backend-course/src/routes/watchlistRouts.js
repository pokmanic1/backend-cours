import express from 'express'
import { addToWatchList } from '../controllers/watchlistController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import {addToWatchListSchema} from '../validators/watchlistValidators.js'
const router = express.Router();

router.use(authMiddleware)

//clean patern controler is a function that is gonna have a handler for when that rout is hit
router.post('/',validateRequest(addToWatchListSchema), addToWatchList);
// router.post('/login', login);
// router.post('/logout', logout)
export default router;