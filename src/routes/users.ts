import { getUsers } from '../controllers/user';
import express from 'express'
import { checkAuthenticated } from '.';

const router = express.Router();

export default () => {
    router.get('/users',checkAuthenticated , getUsers);

    return router;
}

