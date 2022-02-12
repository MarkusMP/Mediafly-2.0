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

test("Should follow user", async () => {
  const createOne = await request(server).post("/api/user").send(testUserOne);
  const createTwo = await request(server).post("/api/user").send(testUserTwo);
  expect(createOne.status).toBe(200);
  expect(createTwo.status).toBe(200);

  const follow = await request(server)
    .post(`/api/follower/${createTwo.body.profile_id}`)
    .set("Authorization", `Bearer ${createOne.body.token}`);

  expect(follow.body.message).toBe("Successfully followed user");
});

test("Should fetch followers by userId", async () => {
  const loginTwo = await request(server)
    .post("/api/user/login")
    .send({ email: testUserTwo.email, password: testUserTwo.password });
  const loginOne = await request(server)
    .post("/api/user/login")
    .send({ email: testUserOne.email, password: testUserOne.password });

  expect(loginTwo.status).toBe(200);
  expect(loginOne.status).toBe(200);

  const followers = await request(server).get(
    `/api/follower/followers/${loginTwo.body.profile_id}`
  );

  expect(followers).toHaveProperty("body");

  expect(followers.body).toHaveLength(1);
  expect(followers.body[0].profile_id).toBe(loginOne.body.profile_id);
});

test("Should fetch following by userId", async () => {
  const loginTwo = await request(server)
    .post("/api/user/login")
    .send({ email: testUserTwo.email, password: testUserTwo.password });
  const loginOne = await request(server)
    .post("/api/user/login")
    .send({ email: testUserOne.email, password: testUserOne.password });

  const following = await request(server).get(
    `/api/follower/following/${loginOne.body.profile_id}`
  );

  expect(following.body[0].profile_id).toBe(loginTwo.body.profile_id);
});

test("Should unfollow user", async () => {
  const loginOne = await request(server)
    .post("/api/user/login")
    .send({ email: testUserOne.email, password: testUserOne.password });
  const loginTwo = await request(server)
    .post("/api/user/login")
    .send({ email: testUserTwo.email, password: testUserTwo.password });

  expect(loginOne).toHaveProperty("body");
  expect(loginTwo).toHaveProperty("body");

  const unfollow = await request(server)
    .delete(`/api/follower/${loginTwo.body.profile_id}`)
    .set("Authorization", `Bearer ${loginOne.body.token}`);

  expect(unfollow.status).toBe(200);

  const followers = await request(server).get(
    `/api/follower/followers/${loginTwo.body.profile_id}`
  );

  const following = await request(server).get(
    `/api/follower/following/${loginOne.body.profile_id}`
  );

  expect(followers.body).toHaveLength(0);
  expect(following.body).toHaveLength(0);
});

test("followers & following should not exist after deleting user", async () => {
  const loginTwo = await request(server)
    .post("/api/user/login")
    .send({ email: testUserTwo.email, password: testUserTwo.password });
  const loginOne = await request(server)
    .post("/api/user/login")
    .send({ email: testUserOne.email, password: testUserOne.password });

  expect(loginTwo.status).toBe(200);
  expect(loginOne.status).toBe(200);

  const follow = await request(server)
    .post(`/api/follower/${loginTwo.body.profile_id}`)
    .set("Authorization", `Bearer ${loginOne.body.token}`);

  expect(follow.body.message).toBe("Successfully followed user");

  const deletedUser = await request(server)
    .delete("/api/user")
    .set("Authorization", `Bearer ${loginOne.body.token}`);

  expect(deletedUser.body.message).toBe("User deleted");

  const followers = await request(server).get(
    `/api/follower/followers/${loginTwo.body.profile_id}`
  );

  const following = await request(server).get(
    `/api/follower/following/${loginOne.body.profile_id}`
  );

  expect(followers.body).toHaveLength(0);
  expect(following.body).toHaveLength(0);
});
