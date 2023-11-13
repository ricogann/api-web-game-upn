import db from "../db/database.js";
import OpenAI from "openai";
import { BingChat } from "bing-chat";

//collection name
const dialogCollection = "Dialog";

class _dialog {
    addDialog = async (body) => {
        try {
            const add = await db
                .collection(dialogCollection)
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

    getDialog = async (game) => {
        try {
            const getData = await db
                .collection(dialogCollection)
                .where("game", "==", game)
                .get();

            const dialogData = [];

            getData.forEach((doc) => {
                const data = doc.data();
                const id = doc.id;
                dialogData.push({ id: id, gameData: data });
            });

            return {
                status: true,
                code: 200,
                dialogData,
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

    updateDialog = async (id, body) => {
        const updateData = await db.collection(dialogCollection).doc(id).get();

        const questData = updateData.data();

        await db.collection(dialogCollection).doc(id).update(body);

        return {
            status: true,
            code: 200,
            message: "data updated successfully",
        };
    };

    deleteDialogue = async (id) => {
        try {
            await db.collection(dialogCollection).doc(id).delete();

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

    openAiForDialogue = async (body) => {
        const prompt = `
            Saya sedang membuat game dengan game berbasis cerita, berikan saya 1 pesan dengan maksimal 100 kata per-paragrafnya, dengan jumlah paragraf ${
                body.jumlahParagraf
            } dengan topik acuannya adalah ${body.topikAcuan}
            serta untuk sub-topik acuannya per paragraf adalah ${body.subTopikAcuan.map(
                (element, index) => {
                    return `Paragraf ${
                        index + 1
                    } dengan sub topik acuan ${element}`;
                }
            )}
        `;
        const openai = new OpenAI({
            apiKey: "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",
        });
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: prompt,
                },
            ],
            model: "gpt-3.5-turbo",
        });
        return {
            status: true,
            code: 200,
            message: completion.choices[0].message.content,
        };
    };
}

export default new _dialog();
