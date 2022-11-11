import {PunishmentCategory, PunishmentCategoryPatch} from "./src/models/Punishments";
import fetch from 'cross-fetch';
import * as console from "console";
import {readFileSync} from "fs";

const API_URL = "http://localhost:3000";

const loadFromFile = async (fileName: string): Promise<PunishmentCategoryPatch[]> => {
    return JSON.parse(readFileSync(fileName, 'utf-8'));
}

const getCategories = async (): Promise<PunishmentCategory[]> => {
    return await fetch(API_URL + "/v1/punishment-category").then((res) => res.json())
        .catch(console.error)
}

const modifyCategory = async (category: PunishmentCategoryPatch) => {
    return await fetch(API_URL + "/v1/punishment-category/" + category.short, {
        method: "PATCH",
        body: JSON.stringify(category),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then((res) => res.json()).catch(console.error)
}

const createCategory = async (category: PunishmentCategory) => {
    return await fetch(API_URL + "/v1/punishment-category/", {
        method: "POST",
        body: JSON.stringify(category),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then((res) => res.json()).catch(console.error);
}

const deprecateCategory = async (identifier: string) => {
    const update: PunishmentCategoryPatch = {
        short: identifier,
        deprecated: true
    }

    return await modifyCategory(update);
}

(async () => {
    const puns = await loadFromFile("./patches/modify.json");
    for (const pun of puns) {
        let response = await modifyCategory(pun.short);
        console.info(JSON.stringify(response, null, 2));
    }
})();
