import {ErrorRes, SuccessRes} from "./utils/response";
import {v4 as uuid} from "uuid";
import {createToken} from "./utils/create-token";
import {messages, users} from "../index";
import express from "express";

const router=express.Router()

router.get("/", (req, res) => {
    res.render("index.ejs", {
        text: "Text"
    })
});

router.post("/auth/token", (req, res) => {

})

router.get("/chat/users", (req, res) => {

    // const {}=decodeToken(req.headers.Authorization)

    let filteredUser: Array<string> = [];
    if (req.query?.user) {
        users.forEach(user => {
            if (user. !== req.query?.user) filteredUser.push(user.user)
        })
    } else res.status(200).send(ErrorRes({message: "Please Send the current User"}))

    res.status(200).send(SuccessRes({data: filteredUser, message: "Users Fetched Successfully"}))
});

router.get("/chat/getAll/:user/:withUser", (req, res) => {
    const {user, withUser} = req.params;

    if (!user || !withUser) res.status(404).send(ErrorRes({message: "User Not Found"}));

    const filteredMessages = messages.filter(message => {
        return (message.from === user && message.to === withUser) || (message.from === withUser && message.to === user)
    });

    res.status(200).send(SuccessRes({data: filteredMessages, message: "Message Fetched Successfully"}));
});
