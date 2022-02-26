import {
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from "typeorm";
import app from "./app";
import { port } from "./config";

const getOptions = async () => {
  let connectionOptions: ConnectionOptions;
  connectionOptions = {
    type: "postgres",
    synchronize: false,
    logging: false,
    extra: {
      ssl: true,
    },
    entities: ["dist/entity/*.*"],
  };
  if (process.env.DATABASE_URL) {
    Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
  } else {
    connectionOptions = await getConnectionOptions();
  }

  return connectionOptions;
};

export const start = async () => {
  let retries = 5;
  while (retries) {
    try {
      const typeormconfig = await getOptions();
      await createConnection(typeormconfig);

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
