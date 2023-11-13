import db from "../db/database.js";
// const db = require("../db/database");

//collection name
const questCollection = "Quest";

class _quest {
    addQuest = async (body) => {
        try {
            const add = await db
                .collection(questCollection)
                .add(body)
                .then((docRef) => {
                    console.log("Document added with ID:", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding document:", error);
                });

            return {
                status: true,
                code: 200,
                message: "data added successfully",
            };
        } catch (error) {
            console.error("request addData module Error: ", error);
            return {
                status: false,
                message:
                    "Error, check the console log of the backend for what happened",
            };
        }
    };

    getQuest = async (id) => {
        try {
            const getData = await db
                .collection(questCollection)
                .where("game", "==", id)
                .get();

            const questData = [];

            getData.forEach((doc) => {
                const data = doc.data();
                const id = doc.id;
                questData.push({ id, data });
            });

            return {
                status: true,
                code: 200,
                questData,
            };
        } catch (error) {
            console.error("request getData module Error: ", error);
            return {
                status: false,
                message:
                    "Error, check the console log of the backend for what happened",
            };
        }
    };

    updateQuest = async (id, body) => {
        const updateData = await db.collection(questCollection).doc(id).get();

        const questData = updateData.data();

        await db.collection(questCollection).doc(id).update(body);

        return {
            status: true,
            code: 200,
            message: "data updated successfully",
        };
    };

    deleteQuest = async (id, body) => {
        console.log(body);
        try {
            const deleteData = await db
                .collection(questCollection)
                .doc(id)
                .get();

            const questData = deleteData.data();

            if (body.field === "Description") {
                questData.Description.splice(body.index, 1);
            } else if (body.field === "Goals") {
                questData.Goals.splice(body.index, 1);
            } else {
                return {
                    status: false,
                    message: "field not found",
                };
            }

            await db.collection(questCollection).doc(id).update(questData);

            return {
                status: true,
                code: 200,
                message: "data deleted successfully",
            };
        } catch (error) {
            console.error("request deleteData module Error: ", error);
            return {
                status: false,
                message:
                    "Error, check the console log of the backend for what happened",
            };
        }
    };

    getDetail = async (game) => {
        console.log(game);
        try {
            const getData = await db
                .collection(questCollection)
                .where("game", "==", game)
                .get();

            const data = [];

            getData.forEach((doc) => {
                const dataQuest = doc.data();
                data.push(dataQuest);
            });

            return {
                status: true,
                code: 200,
                data,
            };
        } catch (error) {
            console.error("request getData module Error: ", error);
            return {
                status: false,
                message:
                    "Error, check the console log of the backend for what happened",
            };
        }
    };

    destroyQuest = async (id) => {
        try {
            await db.collection(questCollection).doc(id).delete();

            return {
                status: true,
                code: 200,
                message: "data deleted successfully",
            };
        } catch (error) {
            console.error("request deleteData module Error: ", error);
            return {
                status: false,
                message:
                    "Error, check the console log of the backend for what happened",
            };
        }
    };
}

export default new _quest();
