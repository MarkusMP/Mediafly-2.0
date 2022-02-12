import app from "../src/app";
import { port } from "../src/config";
import { createConnection } from "typeorm";
import request from "supertest";
import { User } from "../src/entities/user.entity";
import { Profile } from "../src/entities/profile.entity";
import { profile } from "console";

let connection, server;

beforeAll(async () => {
  connection = await createConnection();
  await connection.synchronize(true);
  server = app.listen(port);
});

afterAll(async () => {
  connection.close();
  server.close();
});

const testUser = {
  email: "testUser@email.com",
  password: "password",
  username: "testUser",
  firstName: "test",
  lastName: "test",
  bio: "yes",
};

const updatedTestUser = {
  email: "updated@email.com",
};

const loginTestUser = {
  email: "testUser@email.com",
  password: "password",
};

test("Should create a user & create profile for user", async () => {
  const response = await request(server).post("/api/user").send(testUser);

  expect(response.status).toBe(200);

  const user = await User.findOne({
    where: { id: response.body.id },
    relations: ["profile"],
  });

  const profile = await Profile.findOne({
    where: { id: user?.profile_id },
    relations: ["user"],
  });

  expect(profile?.username).toBe(testUser.username);
});

test("Should login user", async () => {
  const response = await request(server)
    .post("/api/user/login")
    .send(loginTestUser);
  expect(response.statusCode).toBe(200);
  expect(response.body.email).toBe(testUser.email);
});

test("Should fetch user by id", async () => {
  const users = await User.find({ where: { email: testUser.email } });
  const user = users[0];
  const response = await request(server).get(`/api/user/${user.id}`);
  expect(response.statusCode).toBe(200);
  expect(response.body.email).toBe(testUser.email);
});

test("Should update the user", async () => {
  const response = await request(server)
    .post("/api/user/login")
    .send(loginTestUser);

  const token = response.body.token;

  const updatedUser = await request(server)
    .put("/api/user")
    .send(updatedTestUser)
    .set("Authorization", `Bearer ${token}`);

  expect(updatedUser.status).toBe(200);
  expect(updatedUser.body.email).toBe(updatedTestUser.email);
});

test("Should respond with 401 because of invalid token", async () => {
  const response = await request(server)
    .put("/api/user")
    .set("Authorization", "Bearer invalidToken");
  expect(response.status).toBe(401);
  expect(response.body.message).toBe("Not authorized, no token");
});

test("Should delete the user", async () => {
  const response = await request(server).post("/api/user/login").send({
    email: updatedTestUser.email,
    password: "password",
  });

  const deletedUser = await request(server)
    .delete("/api/user")
    .set("Authorization", `Bearer ${response.body.token}`);

  expect(deletedUser.body.message).toBe("User deleted");
});

test("Should not find user & profile ", async () => {
  const response = await request(server).post("/api/user/login").send({
    email: updatedTestUser.email,
    password: "password",
  });

  const profile = await Profile.findOne({
    where: { username: testUser.username },
    relations: ["user"],
  });

  const user = await User.findOne({ id: response.body.id });

  expect(user).toBe(undefined);
  expect(profile).toBe(undefined);
});
