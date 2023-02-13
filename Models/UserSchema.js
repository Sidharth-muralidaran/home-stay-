import mongoose from "mongoose"
const schema3 = mongoose.Schema
const user_schema = new schema3({
    Name: String,
    Contact_Number: Number,
    Age: Number,
    Nationality: String,
    ID_Proof: String,
    ID_Number: Number,
    Payment_Method: String,
    Payment_ID: Number,
    Room_No: Number,
    Guest_Number: Number,
    admin: { type: mongoose.Types.ObjectId, ref: "Admin" }
})
const UserModel = mongoose.model("User", user_schema)
export default UserModel