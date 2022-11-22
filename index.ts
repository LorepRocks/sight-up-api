import express , { Request, Response } from "express";
import dotenv from 'dotenv'

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hi Humans!");
});

app.listen(PORT, () => {
  console.log(`app listen on ${process.env.PORT}`);
});
