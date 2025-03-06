import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// Define the User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username:{ type: String, required: true},
    email: { type: String, required: true }, // Ensure email uniqueness
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['user', 'admin'] ,default:"user"}, // Example roles
    resume: { type: mongoose.Schema.Types.ObjectId, ref: "Resume" }, // Reference to Resume
    bio: { type: String },
    phoneNo: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid 10-digit phone number!`
        },
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt timestamps
});

userSchema.pre("save",  function () {
    if (!this.isModified("password")) return;
    this.password =   bcrypt.hashSync(this.password, 10);
});
// Create the User model
const User = mongoose.model('User', userSchema);

export default User;