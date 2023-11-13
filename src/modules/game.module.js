import db from "../db/database.js";
import fs from "fs";
// const db = require("../db/database");
// const fs = require("fs");

//collection name
const gameCollection = "game";

class _game {
    addGame = async (body, file) => {
        const game = {
            name: body.name,
            description: body.description,
            gambar: file ? file.filename : null,
            genres: body.genres.split(","),
            link: body.link,
        };

        const postDoc = db
            .collection(gameCollection)
            .where("name", "==", game.name);
        const docSnapshot = await postDoc.get();

        const dbGame = [];

        docSnapshot.forEach((doc) => {
            const userData = doc.data();
            const userId = doc.id;
            dbGame.push({ id: userId, data: userData });
        });

        if (dbGame > 0) {
            return {
                status: false,
                message: "Game sudah terdaftar",
            };
        }

        const register = await db
            .collection(gameCollection)
            .add(game)
            .then((docRef) => {
                console.log("Document added with ID:", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document:", error);
            });

        return {
            status: true,
            code: 200,
            message: "Add game success",
        };
    };

    getGame = async () => {
        const getData = await db.collection(gameCollection).get();

        const gameData = [];

        getData.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            gameData.push({ id: id, gameData: data });
        });

        if (gameData.length === 0) {
            return {
                status: false,
                message: "Game tidak ada, silakan tambah game dulu",
            };
        }

        return {
            status: true,
            code: 200,
            data: gameData,
        };
    };

    getGameDetail = async (game) => {
        const getData = await db
            .collection(gameCollection)
            .where("name", "==", game)
            .get();

        const data = [];

        getData.forEach((doc) => {
            const dataGame = doc.data();
            data.push(dataGame);
        });

        if (data.length === 0) {
            return {
                status: false,
                message: "Game tidak ada",
            };
        }

        return {
            status: true,
            code: 200,
            data: data,
        };
    };

    updateGame = async (name, body, file) => {
        const updateData = await db
            .collection(gameCollection)
            .where("name", "==", name)
            .get();

        const gameData = [];

        updateData.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            gameData.push({ id, data });
        });

        if (!file) {
            const game = {
                name: body.name,
                description: body.description,
                gambar: body.oldGambar,
                genres: body.genres.split(","),
                link: body.link,
            };

            await db
                .collection(gameCollection)
                .doc(gameData[0].id)
                .update(game);
        } else {
            fs.unlinkSync(`./src/public/${body.oldGambar}`);
            const game = {
                name: body.name,
                description: body.description,
                gambar: file ? file.filename : gameData.gambar,
                genres: body.genres.split(","),
                link: body.link,
            };

            await db
                .collection(gameCollection)
                .doc(gameData[0].id)
                .update(game);
        }

        return {
            status: true,
            code: 200,
            message: "data updated successfully",
        };
    };

    deleteGame = async (name) => {
        const deleteData = await db
            .collection(gameCollection)
            .where("name", "==", name)
            .get();

        const deleteUsersLogData = await db
            .collection("UsersLog")
            .where("game", "==", name)
            .get();

        const deleteQuestData = await db
            .collection("Quest")
            .where("game", "==", name)
            .get();

        const deleteDialgoueData = await db
            .collection("Dialog")
            .where("game", "==", name)
            .get();

        const gameData = [];
        const usersLogData = [];
        const questData = [];
        const dialogueData = [];

        deleteUsersLogData.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            usersLogData.push({ id, data });
        });

        deleteQuestData.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            questData.push({ id, data });
        });

        deleteDialgoueData.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            dialogueData.push({ id, data });
        });

        deleteData.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            gameData.push({ id, data });
        });

        fs.unlinkSync(`./src/public/${gameData[0].data.gambar}`);

        await db.collection(gameCollection).doc(gameData[0].id).delete();

        usersLogData.forEach(async (doc) => {
            await db.collection("UsersLog").doc(doc.id).delete();
        });
        questData.forEach(async (doc) => {
            await db.collection("Quest").doc(doc.id).delete();
        });
        dialogueData.forEach(async (doc) => {
            await db.collection("Dialog").doc(doc.id).delete();
        });

        return {
            status: true,
            code: 200,
            message: "data deleted successfully",
        };
    };
}

export default new _game();
