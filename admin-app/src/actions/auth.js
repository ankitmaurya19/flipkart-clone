import axiosInstance from "../helpers/axios";
import { authConstants } from "./constants"

export const login = function(user) {

    return async function(dispatch){

        const res = await axiosInstance.post(`/admin/signin` , {
            ...user
        })

        dispatch({
            type : authConstants.LOGIN_REQUEST,
            payload : {
                ...user
            }
        });
    }
}