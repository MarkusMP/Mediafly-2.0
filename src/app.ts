import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import userRouter from "./routes/user.route";
import followerRouter from "./routes/follower.route";
import profileRouter from "./routes/profile.route";
import postRouter from "./routes/post.route";
import commentRouter from "./routes/comment.route";
import likeRouter from "./routes/like.route";
import uploadRouter from "./routes/upload.route";
import { notFound, errorHandler } from "./middleware/errorMiddleware";
import path from "path";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user", userRouter);
app.use("/api/follower", followerRouter);
app.use("/api/profile", profileRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
app.use("/api/like", likeRouter);
app.use("/api/upload", uploadRouter);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(notFound);
app.use(errorHandler);

export default app;
