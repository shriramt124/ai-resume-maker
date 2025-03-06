


import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/nodemail.js';
import bcrypt from "bcryptjs"

const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "15m" });
};
const generateResetToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "5m" });
}
// Generate refresh token
const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const register = async (req, res) => {
    try {
        
        const { name, email, username, password,role } = req.body;

        // Validate required fields
        if (!name || !email || !username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already taken" });
        }

        // Create new user
        const user = await User.create({
            name,
            email,
            username,
            password,
            role:role ?? "user"
           
        });
        

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // Set tokens in cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // Return success response with user info
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                role: user.role,
              
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
export const login = async (req, res) => {
    try {
        const { email, password,username } = req.body;
        console.log(req.body)
        // Validate required fields
        if ((!email && !username) || (!password)) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Find user by email or username
        const user = await User.findOne({ $or: [{ email: email }, { username: username }] });
        // Find user by email
        console.log(user) 
        if (!user) {
         return res.status(401).json({ message: "User not found" });
        }
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate tokens
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // Set tokens in cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // Return success response with user info
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                role: user.role ?? "user"
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};




export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user || !user.refreshToken !== refreshToken) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const accessToken = generateAccessToken(user._id);
        const newRefreshToken = generateRefreshToken(user._id);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.status(200).json({
            message: "Token refreshed successfully",
            success:true
        });

    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.status(200).json({
            message: "Logout successful",
            success: true
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        if(!email){
            return res.status(400).json({
                message: "Email is required"
            })
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        //generate the reset token
        const resetPasswordToken = await generateResetToken(user._id);
        console.log("generated reset token ", resetPasswordToken);

        res.cookie('resetPasswordToken', resetPasswordToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 5 * 60 * 1000 // 5 min
        });
        
        const resetUrl = `http://localhost:3000/api/reset-password/${resetPasswordToken}`;
        //send the reset password link to the user's email
         
        // console.log(mailOptions)
        await sendEmail({
            to: user.email,
            subject: "Reset Password",
            text: `Click the following link to reset your password: ${resetUrl}` 
        });
        res.status(200).json({
            message: "Reset token generated successfully",
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message || "Internal server error",
        })
    }

}


export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        
        const resetPasswordToken = req.cookies.resetPasswordToken;
        if (!resetPasswordToken || token !== resetPasswordToken) {
            return res.status(400).json({
                message: "Reset token is required"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        //update the user's password
        user.password = newPassword;
        await user.save();
        res.status(200).json({
            message: "Password reset successfully",
            success: true
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:erorr.message || "Internal server error",
        })
    }
}




export const isLoggedIn = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        const accessToken = req.cookies.accessToken;
        if (!refreshToken || !accessToken) {
            return res.status(401).json({
                message: "Unauthorized",
                status: false,
                isLoggedIn:false
            })
        }
        let userId;
        let tokenType = '';
        if (accessToken) {
            try {
                const decodedAccess = jwt.verify(accessToken, process.env.JWT_SECRET);
              userId = decodedAccess.id;
                tokenType = 'access';
            } catch (accessError) {
                if (refreshToken) {
                   const decodedRefresh = jwt.verify(accessToken, process.env.JWT_SECRET);
                   userId = decodedRefresh.id;
                   tokenType = 'refresh';
                
               } 
            }
        } else if (refreshToken) {
            const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_SECRET);
            userId = decodedRefresh.id;
            tokenType ='refresh';
        }
        const user = await User.findById(userId).select("-password")
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
                status: false,
                isLoggedIn:false
            })
        }
        if (tokenType === 'refresh' && req.cookies.refreshToken !== refreshToken) {
            return res.status(401).json({
                message: "Unauthorized",
                status: false,
                isLoggedIn:false
            })
        }
        if (tokenType === 'refresh' || !accessToken) {
            const newAccessToken = generateAccessToken(user._id);
            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 15 * 60 * 1000 // 15 minutes
            });

           return res.status(200).json({
                success: true,
                isLoggedIn: true,
                user:user
            })
        }
    } catch (error) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return res.status(401).json({
            message: "Unauthorized",
            status: false,
            isLoggedIn:false
        })
    }
}

