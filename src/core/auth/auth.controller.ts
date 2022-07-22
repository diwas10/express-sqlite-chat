import {Request, Response} from "express";
import {ErrorRes, SuccessRes} from "../../utils/response";
import {users} from "../../../index";
import {v4 as uuid} from "uuid";
import {createToken} from "../../utils/create-token";

class AuthController {
    authToken = async (req: Request, res: Response) => {
        const {username, password} = req.body;
        if (!username || !password) return res.status(401).send(ErrorRes({message: "Both Password and Username is Required"}));

        let user = users.find(user => user.username === username);

        let resData = {};

        if (user) {
            resData = {type: "login"}
        } else {
            user = {username, password, id: uuid()};
            users.push(user);
            resData = {
                ...user,
                type: "register",
            }
        }
        resData = {...res, ...user, token: createToken(user),}

        res.status(200).send(SuccessRes({message: "Logged in successfully", data: resData}));
    }
}

export default new AuthController();