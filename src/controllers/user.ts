import mongoose from "mongoose";
import { Request, Response } from "express";
import { UserSchema } from "../models/user";

const User = mongoose.model("User", UserSchema);

export const getUsers = (_req: Request, res: Response) => {
    User.find({}, (err: Error, users: any) => {
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
  };