import app from "../src/app";
import { port } from "../src/config";
import { createConnection } from "typeorm";
import request from "supertest";
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

const testUserOne = {
  email: "testUser@email.com",
  password: "password",
  username: "testUser",
  firstName: "test",
  lastName: "test",
};

const testUserTwo = {
  email: "two@email.com",
  password: "password",
  username: "two",
  firstName: "test",
  lastName: "test",
};

const updatedProfile = {
  username: "yes",
  firstName: "works",
};

test("Should fetch profile by id with Count of followers & following", async () => {
  const createOne = await request(server).post("/api/user").send(testUserOne);
  const createTwo = await request(server).post("/api/user").send(testUserTwo);
  expect(createOne.status).toBe(200);
  expect(createTwo.status).toBe(200);

  const follow = await request(server)
    .post(`/api/follower/${createTwo.body.profile_id}`)
    .set("Authorization", `Bearer ${createOne.body.token}`);

  expect(follow.body.message).toBe("Successfully followed user");

  const profile = await request(server).get(
    `/api/profile/${createTwo.body.profile_id}`
  );

  expect(profile.body.followersCount).toBe(0);
  expect(profile.body.followingCount).toBe(1);
});

test("Should fetch profile by username with count of followers & following", async () => {
  const loginOne = await request(server)
    .post("/api/user/login")
    .send({ email: testUserOne.email, password: testUserOne.password });

  const profile = await request(server).get(
    `/api/profile/${loginOne.body.profile_id}`
  );

  const profileByUsername = await request(server).get(
    `/api/profile/username/${profile.body.username}`
  );

  expect(profileByUsername.body.followersCount).toBe(1);
  expect(profileByUsername.body.followingCount).toBe(0);
});

test("Should update profile", async () => {
  const loginOne = await request(server)
    .post("/api/user/login")
    .send({ email: testUserOne.email, password: testUserOne.password });

  const updateProfile = await request(server)
    .put("/api/profile")
    .set("Authorization", `Bearer ${loginOne.body.token}`)
    .send(updatedProfile);

  expect(updateProfile.body.username).toBe(updatedProfile.username);
  expect(updateProfile.body.firstName).toBe(updatedProfile.firstName);
});

test("Should fail update because username already exists", async () => {
  const loginOne = await request(server)
    .post("/api/user/login")
    .send({ email: testUserOne.email, password: testUserOne.password });

  const updateProfile = await request(server)
    .put("/api/profile")
    .set("Authorization", `Bearer ${loginOne.body.token}`)
    .send({ username: updatedProfile.username });

  expect(updateProfile.status).toBe(409);
  expect(updateProfile.body.message).toBe("Username already exists");
});
