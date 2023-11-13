import m$dialog from "../modules/dialog.module.js";
import response from "../helpers/response.js";
import authorization from "../middlewares/authorization.js";
import { Router } from "express";

const dialogController = Router();

dialogController.get("/:game", async (req, res) => {
    const result = await m$dialog.getDialog(req.params.game);

    return response.sendResponse(res, result);
});

dialogController.put("/update/:id", async (req, res) => {
    const result = await m$dialog.updateDialog(req.params.id, req.body);

    return response.sendResponse(res, result);
});

dialogController.delete("/delete/:id", async (req, res) => {
    const result = await m$dialog.deleteDialogue(req.params.id);

    return response.sendResponse(res, result);
});

dialogController.post("/add", async (req, res) => {
    const result = await m$dialog.addDialog(req.body);

    return response.sendResponse(res, result);
});

dialogController.post("/openai/generate", async (req, res) => {
    const result = await m$dialog.openAiForDialogue(req.body);

    return response.sendResponse(res, result);
});

export default dialogController;
