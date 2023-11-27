import {test as base,request} from "@playwright/test"
import {GaragePage} from "../pageObjects/GaragePage/GaragePage.js";
import {ProfilePage} from "../pageObjects/ProfilePage/ProfilePage.js";
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
            await ctx.close()
        },
        userProfilePage: async ({browser}, use)=>{
            const ctx = await browser.newContext({
                storageState: STORAGE_STATE_USER_PATH
            })
            const page = await ctx.newPage()
            const profilePage = new ProfilePage(page)
            await profilePage.navigate('/api/users/profile')
            await use(profilePage)
            await ctx.close()
        },
        userAPIClient: async ({},use)=>{
            const ctx = await request.newContext({
                storageState: STORAGE_STATE_USER_PATH
            })
            await use(ctx)
            await ctx.dispose()
        },
})