import authController from "./src/controllers/auth.controller.js";
import gameController from "./src/controllers/game.controller.js";
import userController from "./src/controllers/user.controller.js";
import dialogController from "./src/controllers/dialog.controller.js";
import questController from "./src/controllers/quest.controller.js";

const routes = (app) => {
    const _routes = [
        ["auth", authController],
        ["game", gameController],
        ["users", userController],
        ["dialog", dialogController],
        ["quest", questController],
    ];

    _routes.forEach((route) => {
        const [url, controller] = route;

        app.use(`/api/${url}`, controller);
    });
};

export default routes;
