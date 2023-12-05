import BaseController from "./BaseController.js";

export class CarController extends BaseController{
    #GET_USER_CARS_PATH = '/cars'
    #GET_USER_CAR_BRANDS_PATH = '/cars/brands'
    #GET_USER_CAR_BRAND_BY_ID_PATH = '/cars/brands/#'
    #GET_USER_CAR_MODELS_PATH = '/cars/models'
    #GET_USER_CAR_MODEL_BY_ID_PATH = '/cars/models/#'
    #GET_USER_CARS_BY_ID_PATH = '/cars/#'
    #CREATE_CAR_PATH = '/cars'
    #EDIT_USER_CARS_BY_ID_PATH = '/cars/#'
    #DELETE_USER_CARS_PATH = '/cars/#'


    constructor(options) {
        super(options)
    }

    async getUserCars(){
        return this._client.get(this.#GET_USER_CARS_PATH)
    }
    async getUserCarBrands(){
        return this._client.get(this.#GET_USER_CAR_BRANDS_PATH)
    }
    async getUserCarBrandsById(id){
        return this._client.get(this.#GET_USER_CAR_BRAND_BY_ID_PATH.replace('#', id))
    }
    async getUserCarModels(){
        return this._client.get(this.#GET_USER_CAR_MODELS_PATH)
    }
    async getUserCarModelsById(id){
        return this._client.get(this.#GET_USER_CAR_MODEL_BY_ID_PATH.replace('#', id))
    }
    async getUserCarById(id){
        return this._client.get(this.#GET_USER_CARS_BY_ID_PATH.replace('#', id))
    }
    async createUserCar(data){
        return this._client.post(this.#CREATE_CAR_PATH, data)
    }
    async editUserCarById(id,data){
        return this._client.put(this.#EDIT_USER_CARS_BY_ID_PATH.replace('#', id),data)
    }
    async deleteCar(id){
        return this._client.delete(this.#DELETE_USER_CARS_PATH.replace('#', id))
    }
}