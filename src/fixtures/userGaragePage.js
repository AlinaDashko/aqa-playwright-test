import {test as base} from "@playwright/test"
import {GaragePage} from "../pageObjects/GaragePage/GaragePage.js";
import {STORAGE_STATE_USER_PATH} from "../data/dict/storageState.js";


export const test = base.extend({
        userGaragePage: async ({browser}, use)=>{
            const ctx = await browser.newContext({
                storageState: STORAGE_STATE_USER_PATH
            })
            const page = await ctx.newPage()
            const garagePage = new GaragePage(page)
            await garagePage.navigate()
            await use(garagePage)
        },
    }
)