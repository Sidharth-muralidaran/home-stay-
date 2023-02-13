import express from 'express'
const router = express.Router()
import { staffloginGet, staffloginPost, addguestdata, guestform, guestdetails, roomdata } from './StaffController.js'

//staff login ....
router.get('/', staffloginGet)

// router.get('/staffHome',staffHomeGet)

// staff login checking..........
router.post('/staffloginpost', staffloginPost)


//staff add guest form........
router.get("/addguest/:staffid", guestform)


//staff....adding guest details.......
router.post("/addguestdata/:staffid", addguestdata)

//staff.....guest details.........
router.get("/guestdetails/:staffid", guestdetails)


router.get('/roomdata/:staffid', roomdata)

// router.get('/guestTable',addguestTable)

export default router
