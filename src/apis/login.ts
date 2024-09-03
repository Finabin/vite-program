import request from "../utils/request";

export const Login = (value: any)  => {
    return request.post("/login/userlogin", value);
}

export const LogOut = (value: any)  => {
    return request.post("/login/userlogout", value);
}


