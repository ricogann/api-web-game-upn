import m$auth from "../modules/auth.module.js";
import response from "../helpers/response.js";
import { Router } from "express";

const authController = Router();

authController.post("/register", async (req, res) => {
    const result = await m$auth.register(req.body);

    return response.sendResponse(res, result);
});

authController.post("/login", async (req, res) => {
    const result = await m$auth.login(req.body);

    return response.sendResponse(res, result);
});

export default authController;
