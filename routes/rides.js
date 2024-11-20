import express from "express"
import { createRide, updateRide, deleteRide, getRide, getDriverRides, getAllRides, getFeaturedRide } from "../controllers/rideController.js";
import { verifyUser } from "../utils/verifyToken.js";
import { getAvatar } from '../controllers/fileController.js';
const router=express.Router();


router.post('/create',verifyUser,createRide)
router.put('/update',updateRide)
router.delete('/delete',deleteRide)
router.get('/results',getRide)
router.get('/results/getAllRides', getAllRides);
router.get('/results/featuredRides', getFeaturedRide);
router.get('/results/getavatar',getAvatar)
router.get('/driverrides',getDriverRides)

export default router;