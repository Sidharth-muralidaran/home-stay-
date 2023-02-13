import express from 'express'
const router = express.Router()
import { signup, admindata, login, postlogin, addstaff, staffdata, adminhome, removestaff, addRooms, Roomdata, roomHome, removeroom, addroom, addguestTable, guestdata } from '../Router/AdminController.js'

// admin router localhost 8080.....
router.get('/', signup)
router.post('/admindata', admindata)


//admin router... login after signup.........
router.get('/login', login)


//admin router.. login and checking login details
router.post('/postlogin', postlogin)


//admin router... home.... click add staff.....
router.get('/addstaff', addstaff)


//admin router...form ...adding staff details...
router.post('/staffdata', staffdata)


//admin router ...staff details on admin home...
router.get("/adminhome", adminhome)


//admin router...roomhome...
router.get('/roomHome', roomHome)


//admin router...adding room data...
router.post('/Roomdata', Roomdata)


//admin router...room data on the admin home....
router.get('/addRooms', addRooms)


//admin router...delete staff from admin home...
router.get("/delete/:id", removestaff)

//admin router...delete room from admin home...
router.get("/deleter/:id", removeroom)


router.get("/addroom", addroom)


router.post('addguestTable', addguestTable)

router.get('/guestdata', guestdata)



export default router