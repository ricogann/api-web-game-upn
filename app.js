import express, { json, urlencoded } from "express";
import cors from "cors";
import routes from "./routes.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    res.status(200).json({
        message: "ya, this works.",
    });
});

routes(app);

// app.use("/assets", static(`./src/public`));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
