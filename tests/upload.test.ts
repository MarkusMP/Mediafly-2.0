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

test("Should upload file", async () => {
  const image = await request(server)
    .post("/api/upload")
    .attach("image", `${__dirname}/../uploads/test.jpeg`);

  expect(image.status).toBe(200);
});

test("Should not upload file because its not jpg/jpeg/png", async () => {
  const image = await request(server)
    .post("/api/upload")
    .attach("image", `${__dirname}/../uploads/test.txt`);

  expect(image.status).toBe(500);
  expect(image.body.message).toBe("Images only!");
});
