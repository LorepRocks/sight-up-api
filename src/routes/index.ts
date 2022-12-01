import express, { NextFunction, Request, Response }  from "express";
import login from "./login";
import userRoutes from './users';

const router = express.Router();

export const checkAuthenticated = (req: Request, res: Response, next: NextFunction ) => {
    if (req.isAuthenticated()) { return next() }
    res.redirect("/login")
}
export default () => {
  router.get("/dashboard", checkAuthenticated, (_req: Request, res: Response) => {
    res.render("dashboard.ejs", { name: 'lorena' })
  });
  
  router.get('/login', (_req:Request, res:Response) =>{
    res.render("login.ejs")
  });

  router.use(login())
  router.use(userRoutes())

  return router;
}

