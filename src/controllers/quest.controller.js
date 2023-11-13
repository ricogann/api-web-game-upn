import m$quest from "../modules/quest.module.js";
import response from "../helpers/response.js";
import authorization from "../middlewares/authorization.js";
import { Router } from "express";

const questController = Router();

questController.post("/add", async (req, res) => {
    const result = await m$quest.addQuest(req.body);

    return response.sendResponse(res, result);
});

questController.get("/:id", async (req, res) => {
    const result = await m$quest.getQuest(req.params.id);

    return response.sendResponse(res, result);
});

questController.put("/update/:id", async (req, res) => {
    const result = await m$quest.updateQuest(req.params.id, req.body);

    return response.sendResponse(res, result);
});

questController.put("/delete/:id", async (req, res) => {
    const result = await m$quest.deleteQuest(req.params.id, req.body);

    return response.sendResponse(res, result);
});

questController.delete("/destroy/:id", async (req, res) => {
    const result = await m$quest.destroyQuest(req.params.id);

    return response.sendResponse(res, result);
});

questController.get("/detail/:game", async (req, res) => {
    const result = await m$quest.getDetail(req.params.game);

    return response.sendResponse(res, result);
});

export default questController;
