import app from "../src/app";
import { port } from "../src/config";
import { createConnection } from "typeorm";
import request from "supertest";

let connection, server;

beforeAll(async () => {
  connection = await createConnection();
  server = app.listen(port);
});

afterAll(async () => {
  connection.close();
  server.close();
});

it("server is running", async () => {
  const res = await request(server).get("/");
  expect(res.text).toEqual("Hello World!");
});
