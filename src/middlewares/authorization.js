import jwt from "jsonwebtoken";
import db from "../db/database.js";
// const jwt = require("jsonwebtoken");
// const db = require("../db/database");

const usersCollection = "Users";

const auth = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, "jwt-secret-code");

            if (decoded.role === "student") {
                res.status(401).json({
                    status: false,
                    error: "Unauthorized",
                });
            }

            const auth = await db
                .collection(usersCollection)
                .doc(decoded.id)
                .get();

            if (auth.exists) {
                req.auth = {
                    id: decoded.id,
                    email: decoded.email,
                    username: decoded.username,
                    role: decoded.role,
                };
                next();
            } else {
                res.status(401).json({
                    status: false,
                    error: "Unauthorized",
                });
            }
        } catch (error) {
            console.log("auth middleware error: ", error);
            res.status(401).json({
                status: false,
                error: "Unauthorized",
            });
        }
    }

    if (!token) {
        res.status(401).json({
            status: false,
            error: "Unauthorized",
        });
    }
};

export default auth;
