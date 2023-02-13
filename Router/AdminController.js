import AdminModel from "../Models/AdminSchema.js"
import bcrypt from "bcrypt"
import StaffModel from "../Models/StaffSchema.js"
import RoomModel from "../Models/RoomSchema.js"
import UserModel from "../Models/UserSchema.js"

let err = false
let notUser = false
let temp_admin = {}


// admin router localhost 8080
export const signup = (req, res) => {
    res.render("adminsignup")
}

// admin router storing signup details .....
export const admindata = async (req, res) => {
    console.log(req.body)
    let { name, email, password, homestay, address } = req.body

    password = bcrypt.hashSync(password, 10)
    const admindetails2 = new AdminModel({
        Name: name,
        Email: email,
        password: password,
        Homestay: homestay,
        Address: address
    })
    await admindetails2.save()
    res.redirect('/login')
}

// admin router login.... after signup.......
export const login = (req, res) => {
    res.render('login', { err, notUser })
}


//admin router login checking...............
export const postlogin = async (req, res) => {
    let { email, password } = req.body
    console.log("checking", email, password)
    var admindetails2 = await AdminModel.findOne({ Email: email })
    if (admindetails2 != null) {
        notUser = false
        console.log("Admin ");
        if (bcrypt.compareSync(password, admindetails2.password)) {
            err = false
            temp_admin.id = admindetails2._id
            res.redirect("/adminhome")
        }
        else {
            err = true
            res.redirect('/login')
        }
    }
    else {
        notUser = true
        res.redirect('/login')
    }
}


// admin router... form for adding staff details.........
export const addstaff = (req, res) => {
    res.render('addstaff')
}

//admin router...adding staff details....
export const staffdata = async (req, res) => {
    let { Name, Gender, Email_ID, Contact_Number, Date_Of_Birth, Qualification, Address, Password } = req.body
    const staffdetails2 = new StaffModel({
        Name: Name,
        Gender: Gender,
        Email: Email_ID,
        Contact_Number: Contact_Number,
        Date_Of_Birth: Date_Of_Birth,
        Qualification: Qualification,
        Address: Address,
        Password: Password,
        admin: temp_admin.id
    })
    await staffdetails2.save()
    let staff = await StaffModel.findOne({ Email: Email_ID })
    let admin = await AdminModel.findByIdAndUpdate(temp_admin.id, { $push: { staffs: staff._id } })
    console.log("updated admin", admin);
    console.log(staffdetails2)
    res.redirect('/adminhome')
}


// admin router...staff details on the admin home...
export const adminhome = async (req, res) => {

    let staffdetails = await AdminModel.findById(temp_admin.id).populate("staffs").lean()
    //let staffdetails=adminDetails.staffs
    console.log("staff", staffdetails.staffs);
    res.render('adminhome', { staffdetails: staffdetails.staffs })
    console.log("staffs", staffdetails);
}



//admin router..adding room data........
export const Roomdata = async (req, res) => {
    let { RoomNumber, RoomType, GuestNumber, Availability } = req.body
    let roomdetails = new RoomModel({
        RoomNumber: RoomNumber,
        RoomType: RoomType,
        GuestNumber: GuestNumber,
        Availability: Availability,
        admin: temp_admin.id
    })
    await roomdetails.save()
    let room = await RoomModel.findOne({ admin: temp_admin.id })
    let admin = await AdminModel.findByIdAndUpdate(temp_admin.id, { $push: { rooms: room._id } })
    console.log("updated_admin", admin);
    await admin.save()
    console.log(roomdetails)
    res.redirect('/addroom')
}


//admin router....roome home.........
export const roomHome = async (req, res) => {
    let roomdetails = await AdminModel.findById(temp_admin.id).populate("rooms").lean()
    console.log("rooms", roomdetails)
    res.render('roomHome', { roomdetails })
}


export const addRooms = (req, res) => {
    res.render('addRooms')
}

//admin router...remove staff from admin home
export const removestaff = async (req, res) => {
    let id = req.params.id
    console.log(id)
    await StaffModel.findByIdAndRemove(id)
    res.redirect('/adminhome')
}


export const addroom = async (req, res) => {
    let roomdetails = await AdminModel.findById(temp_admin.id).populate("rooms").lean()
    if (roomdetails.rooms != null) {
        console.log("rooms", roomdetails);
        res.render('roomHome', { roomdetails: roomdetails.rooms })
    }
    else {
        res.render('roomHome')
    }

}

//admin router...add room....
export const removeroom = async (req, res) => {
    let id = req.params.id
    console.log("roomid.........", id)
    await RoomModel.findByIdAndRemove(id)
    res.redirect('/addroom')
}


export const addguestTable = (req, res) => {
    res.render("addguestform")
}

export const guestdata = async(req, res) => {
    let admin_details=await AdminModel.findById(temp_admin.id).populate("guests").lean()
    res.render('guest',{guestdetails:admin_details.guests})
}



