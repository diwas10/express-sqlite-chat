import {Application} from "express";
import authController from "./auth.controller";

const authRoutes = (app: Application) => {
    app.route("/auth/token").post(authController.authToken)
}

export default authRoutes
