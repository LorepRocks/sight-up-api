import { Schema, Model, Types } from "mongoose";

interface Category {
    name: string,
    color: string,
    emoji: string,
}

interface Task {
    description: string,
    due_date: Date,
    category_name?: string,
    state: {
        name: string,
        color: string,
        emoji: string,
    }
}

interface WishList {
    name: string,
    emoji: string,
    color: string,
    wishes: Types.DocumentArray<Task>
}

interface User {
    _id: Types.ObjectId,
    googleId: string,
    name: string,
    email: string,
    avatar?: string,
    categories: Types.DocumentArray<Category>,
    tasks: Types.DocumentArray<Task>,
    wishList: Types.DocumentArray<WishList>,
    created_date: Date,
}

export const UserSchema = new Schema<User, Model<User>>({
  googleId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String
  },
  email: {
    type: String,
  },
  categories: [{
    name: String,
    color: String,
    emoji: String,
  }],
  tasks: [{
    description: String,
    due_date: Date,
    category_name: String,
    state: {
        name: String,
        color: String,
        emoji: String
    }
  }],
  wishList: [{
    name: String,
    emoji: String,
    wishes: [{
        description: String,
        due_date: Date,
        category_name: String,
        state: {
            name: String,
            color: String,
            emoji: String
        }
    }]
  }],
  created_date: {
    type: Date,
    default: Date.now(),
  },
});
