import BaseController from "./BaseController.js";

export class AuthController extends BaseController {
    #SIGN_IN_PATH = "/api/auth/signin";
    #SIGN_UP_PATH = "/auth/signup";

    constructor(options) {
        super(options);
    }

    async signUp(userData){
        return this._client.post(this.#SIGN_UP_PATH, userData)
    }

    async signIn({ email, password, remember = false }) {
        return this._client.post(this.#SIGN_IN_PATH, {
            email,
            password,
            remember,
        });
    };
}