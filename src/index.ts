import { createConnection } from "typeorm";
import app from "./app";
import { port } from "./config";

export const start = async () => {
  let retries = 5;
  while (retries) {
    try {
      await createConnection({
        url: process.env.DATABASE_URL,
        type: "postgres",
        entities: ["dist/**/*.entity.js"],
        synchronize: true,
        extra: {
          ssl: true,
        },
      });

      console.log("Connected to Postgres");
      app.listen(port, () => {
        console.log(
          `Server has started on port ${port} and is running in ${process.env.NODE_ENV} mode`
        );
      });
      break;
    } catch (error: any) {
      console.error("Error connecting to Postgres");
      console.log(error);
      console.log(`retries left: ${retries}`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
};

start();
