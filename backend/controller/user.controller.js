import User from "../models/user.model.js";
import { uploadToCloudinary } from "../config/claudinary.js";


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    const { _id } = req.user;
    try {
        const user = await User.findById(_id);
        res.status(200).json({
            status: true,
            message: "User found",
            data: user,
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const updateUser = async (req, res) => {
    const { _id } = req.user;
    try {
        if (req.file) {
            const uploadedImage = await uploadToCloudinary(req.file);
            req.body.profileImage = uploadedImage;
            await fs.unlink(req.file.path)
        }
        const updatedUser = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).json({ status: false, message: "User not found" });
        }
        res.status(200).json({ status: true, message: "user found successfully", data: updatedUser });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message || "internal server error" });
    }
}
export const deleteUser = async (req, res) => {
    const { _id } = req.user;
    try {

        const deletedUser = await User.findByIdAndDelete(_id);
        if (!deletedUser) {
            return res.status(404).json({ status: false, message: "User not found" });
        }
        res.status(200).json({ status: true, message: "user deleted successfully", data: deletedUser });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message || "internal server error" });

    }
}