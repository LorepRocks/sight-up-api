import express, { NextFunction, Request, Response }  from "express";
import login from "./login";

const router = express.Router();

const checkAuthenticated = (req: Request, res: Response, next: NextFunction ) => {
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

  return router;
}

