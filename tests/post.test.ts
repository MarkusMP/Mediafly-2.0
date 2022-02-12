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

const postTest = {
  text: "Hello this a post by using jest and supertest",
};

const postTestTwo = {
  text: "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla non arcu lacinia ",
};

test("Should create post", async () => {
  const createOne = await request(server).post("/api/user").send(testUserOne);

  const post = await request(server)
    .post("/api/post")
    .send({ text: postTest.text, id: createOne.body.profile_id })
    .set("Authorization", `Bearer ${createOne.body.token}`);

  expect(post.status).toBe(200);
  expect(post.body.profile_id).toBe(createOne.body.profile_id);
  expect(post.body.text).toBe(postTest.text);
});

test("Should fail to create post because text exceeded its limit of (300)", async () => {
  const loginOne = await request(server)
    .post("/api/user/login")
    .send({ email: testUserOne.email, password: testUserOne.password });

  const post = await request(server)
    .post("/api/post")
    .send({ text: postTestTwo.text, id: loginOne.body.profileId })
    .set("Authorization", `Bearer ${loginOne.body.token}`);

  expect(post.status).toBe(400);
  expect(post.body.message).toBe("Text should be max 300 characters");
});

test("Should fetch all posts by profileId", async () => {
  const loginOne = await request(server)
    .post("/api/user/login")
    .send({ email: testUserOne.email, password: testUserOne.password });

  const posts = await request(server).get(
    `/api/post/all/${loginOne.body.profile_id}`
  );

  expect(posts.status).toBe(200);
  expect(posts.body).toHaveLength(1);
  expect(posts.body[0].text).toBe(postTest.text);
});

test("Should fetch one post by postId", async () => {
  const loginOne = await request(server)
    .post("/api/user/login")
    .send({ email: testUserOne.email, password: testUserOne.password });

  const newPost = await request(server)
    .post("/api/post")
    .send({ text: "This is a new post", id: loginOne.body.profile_id })
    .set("Authorization", `Bearer ${loginOne.body.token}`);

  expect(newPost.status).toBe(200);

  const post = await request(server).get(`/api/post/${newPost.body.id}`);

  expect(post.body.text).toBe(newPost.body.text);
});

test("Should delete post by postId", async () => {
  const loginOne = await request(server)
    .post("/api/user/login")
    .send({ email: testUserOne.email, password: testUserOne.password });

  const posts = await request(server).get(
    `/api/post/all/${loginOne.body.profile_id}`
  );

  expect(posts.status).toBe(200);

  const deletePost = await request(server)
    .delete(`/api/post/${posts.body[0].id}`)
    .set("Authorization", `Bearer ${loginOne.body.token}`);

  const post = await request(server).get(`/api/post/${posts.body[0].id}`);

  expect(post.status).toBe(404);

  expect(deletePost.body.message).toBe("Post deleted successfully");
});

test("Should not find posts by user when the user is deleted", async () => {
  const loginOne = await request(server)
    .post("/api/user/login")
    .send({ email: testUserOne.email, password: testUserOne.password });

  const newPost = await request(server)
    .post("/api/post")
    .send({ text: "This is a new post", id: loginOne.body.profile_id })
    .set("Authorization", `Bearer ${loginOne.body.token}`);

  expect(newPost.status).toBe(200);

  const deletedUser = await request(server)
    .delete("/api/user")
    .set("Authorization", `Bearer ${loginOne.body.token}`);

  expect(deletedUser.body.message).toBe("User deleted");

  const posts = await request(server).get(
    `/api/post/all/${loginOne.body.profile_id}`
  );

  expect(posts.body).toHaveLength(0);
});
