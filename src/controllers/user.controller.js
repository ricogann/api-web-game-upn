import m$user from "../modules/user.module.js";
import response from "../helpers/response.js";
import authorization from "../middlewares/authorization.js";
import { Router } from "express";
// const m$user = require("../modules/user.module");
// const response = require("../helpers/response");

// const authorization = require("../middlewares/authorization");

// const { Router } = require("express");

const userController = Router();

userController.get("/", async (req, res) => {
    const result = await m$user.getAllDataUser();

    return response.sendResponse(res, result);
});

userController.put("/update/:id", async (req, res) => {
    const result = await m$user.updateDataUser(req.body, req.params.id);

    return response.sendResponse(res, result);
});

userController.get("/detail/:id", async (req, res) => {
    const result = await m$user.getSpesificDataUser(req.params.id);

    return response.sendResponse(res, result);
});

userController.delete("/delete/:id", async (req, res) => {
    const result = await m$user.deleteDataUser(req.params.id);

    return response.sendResponse(res, result);
});

userController.put("/delete/inventory/:id", authorization, async (req, res) => {
    const result = await m$user.deleteInventory(req.params.id, req.body);

    return response.sendResponse(res, result);
});

userController.get("/usersLog/:game", async (req, res) => {
    const result = await m$user.getDataBasedGame(req.params.game);

    return response.sendResponse(res, result);
});

userController.get("/student", async (req, res) => {
    const result = await m$user.getStudent();

    return response.sendResponse(res, result);
});

userController.delete("/student/delete/:id", async (req, res) => {
    const result = await m$user.deleteStudent(req.params.id);

    return response.sendResponse(res, result);
});

userController.get("/log/:id", async (req, res) => {
    const result = await m$user.getSpesificDataUser(req.params.id);

    return response.sendResponse(res, result);
});

export default userController;
