import mongoose from "mongoose";
import { Request, Response } from "express";
import { UserSchema } from "../models/user";

const User = mongoose.model("User", UserSchema);

interface GoogleUser {
    id: String,
    displayName: String,
    picture: String,
    email: String,
}

export const getUsers = (_req: Request, res: Response) => {
    User.find({}, (err: Error, users: any) => {
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
};

export const saveUser = async (user:GoogleUser) => {
    try {
        const newUser = new User({
            googleId: user.id,
            name: user.displayName,
            email: user.email,
            avatar: user.picture || '',
            categories: [],
            tasks: [],
        })
    
        return await newUser.save();

    }catch(err){
        throw new Error(`There was an error saving user ${err}`)
    }
}

export const getUserByGoogleId = async (id: string) => {
    try{
        const user = await User.findOne({ googleId: id}).exec();
        return user;
    }catch(err){
        throw new Error(`There was an error searching the user by google id ${err}`)
    }
}