import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "./asyncHandler.js";

const authMiddleware = asyncHandler(async (req, res, next) => {

    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        res.status(401);
        throw new Error("Access denied. No token provided.");
    }

    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    );

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }

    next();

});

export default authMiddleware;