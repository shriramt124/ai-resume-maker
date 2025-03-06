import jwt from "jsonwebtoken"

import User from "../models/user.model.js"


export const isAuthenticated = async (req, res,next) => {
    let token;

    // First check for token in cookies
    if (req.cookies?.accessToken) {
        token = req.cookies.accessToken;
    }
    // If no token in cookies, check authorization header
    else if (
        req?.headers?.authorization &&
        req?.headers?.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        
        return res.status(401).json({
            status:false,
            message: "You are not logged in, please login to continue",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userFound = await User.findById(decoded.id);

        if (!userFound) {
            return res.status(404).json({
                status:false,
                message: "User not found",
            });
        }

        
        req.user = userFound;
        next();
    } catch (error) {
        return res.status(500).json({
            status:false,
            message: "Invalid token",
            stack:error.stack
        })
    }
}


export const isAuthorized = async (req, res,next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({
            status: false,
            message:"user is not authorized"
        })
    }
}