import { Request, Response } from "express";
import { User } from "../services/Models";
// import {Router, Request, Response, NextFunction} from 'express';
class AuthController {
    //
    async login(req: Request, res: Response) {
        const users = await User.findAll();
        //
        res.send(users);
    }
}
export default new AuthController();
