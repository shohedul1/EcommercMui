import { Schema, model, models } from "mongoose"

const UserSchema = new Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    profileImagePath: {
        type: Object,
        require: true
    },
    works: {
        type: Array,
        default: [],
    }
})

const User = models.User || model("User", UserSchema)

export default User