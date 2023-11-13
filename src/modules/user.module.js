import db from "../db/database.js";
// const db = require("../db/database");

//collection name
const usersLogCollection = "UsersLog";
const usersCollection = "Users";

class _user {
    getAllDataUser = async () => {
        try {
            const getData = await db.collection(usersLogCollection).get();

            const usersLogData = [];

            getData.forEach((doc) => {
                const data = doc.data();
                const id = doc.id;
                usersLogData.push({ id: id, gameData: data });
            });

            if (usersLogData.length === 0) {
                return {
                    status: false,
                    message: "Masih belum ada yang main game",
                };
            }

            return {
                status: true,
                code: 200,
                data: usersLogData,
            };
        } catch (error) {
            console.error("request getAllData module Error: ", error);
            return {
                status: false,
                message:
                    "Error, check the console log of the backend for what happened",
            };
        }
    };

    updateDataUser = async (body, id) => {
        try {
            const updateData = await db
                .collection(usersLogCollection)
                .doc(id)
                .get();

            const usersLog = updateData.data();

            await db.collection(usersLogCollection).doc(id).update(body);

            return {
                status: true,
                code: 200,
                message: "data updated successfully",
            };
        } catch (error) {
            console.error("request updateData module Error: ", error);
            return {
                status: false,
                message:
                    "Error, check the console log of the backend for what happened",
            };
        }
    };

    deleteDataUser = async (id) => {
        try {
            const deleteData = await db.collection(usersLogCollection).doc(id);

            await deleteData.delete();

            return {
                status: true,
                code: 200,
                data: "data deleted successfully",
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

    deleteInventory = async (id, body) => {
        try {
            const deleteData = await db
                .collection(usersLogCollection)
                .doc(id)
                .get();

            const usersLog = deleteData.data();

            usersLog.Inventory.splice(body.index, 1);

            await db.collection(usersLogCollection).doc(id).update(usersLog);

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

    getSpesificDataUser = async (id) => {
        try {
            const getData = await db
                .collection(usersLogCollection)
                .where("Username", "==", id)
                .get();

            const data = [];

            getData.forEach((doc) => {
                const dataUser = doc.data();
                data.push({ id, dataUser });
            });

            return {
                status: true,
                code: 200,
                data,
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

    getDataBasedGame = async (game) => {
        try {
            const getData = await db
                .collection(usersLogCollection)
                .where("game", "==", game)
                .get();

            const data = [];

            getData.forEach((doc) => {
                const dataUser = doc.data();
                data.push({ id: doc.id, dataUser });
            });

            return {
                status: true,
                code: 200,
                data,
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

    getStudent = async () => {
        try {
            const getData = await db
                .collection(usersCollection)
                .where("role", "==", "student")
                .get();

            const studentData = [];

            getData.forEach((doc) => {
                const data = doc.data();
                const id = doc.id;
                studentData.push({ id: id, gameData: data });
            });

            return {
                status: true,
                code: 200,
                data: studentData,
            };
        } catch (error) {
            console.error("request getAllData module Error: ", error);
            return {
                status: false,
                message:
                    "Error, check the console log of the backend for what happened",
            };
        }
    };

    deleteStudent = async (id) => {
        try {
            const deleteData = await db.collection(usersCollection).doc(id);

            await deleteData.delete();

            return {
                status: true,
                code: 200,
                data: "data deleted successfully",
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

    logUser = async (id) => {
        try {
            const getData = await db
                .collection(usersLogCollection)
                .where("Username", "==", id)
                .get();

            const data = [];

            getData.forEach((doc) => {
                const dataUser = doc.data();
                data.push({ id, dataUser });
            });

            return {
                status: true,
                code: 200,
                data,
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

export default new _user();
