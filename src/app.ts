import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import userRouter from "./route/user_route";
import adminRouter from "./route/admin_route"
import taskRouter from "./route/task_route"

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Port = process.env.PORT || 3000;


app.use("/api",userRouter);
app.use("/api/admin",adminRouter);
app.use("/api/task",taskRouter);
app.use("/api/user/task",taskRouter);


app.get("/", (req, res) => {
  res.send("Helloo Viren");
});

app.listen(Port, () => {
  console.log(`Server is listening on port ${Port}`);
});
