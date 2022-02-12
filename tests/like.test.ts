import app from "../src/app";
import { port } from "../src/config";
import { createConnection } from "typeorm";
import request from "supertest";
import { Post } from "../src/entities/post.entity";

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

test("Should like post by user", async () => {
  const createOne = await request(server).post("/api/user").send(testUserOne);
  const createTwo = await request(server).post("/api/user").send(testUserTwo);
  expect(createOne.status).toBe(200);
  expect(createTwo.status).toBe(200);

  const post = await request(server)
    .post("/api/post")
    .send({ text: "test post", id: createOne.body.profile_id })
    .set("Authorization", `Bearer ${createOne.body.token}`);

  expect(post.status).toBe(200);

  const like = await request(server)
    .post(`/api/like/post/${post.body.id}`)
    .set("Authorization", `Bearer ${createOne.body.token}`);

  expect(like.body.message).toBe("Successfully liked post");

  const postLiked = await request(server).get(`/api/post/${post.body.id}`);

  expect(postLiked.body.likesCount).toBe(1);
});

test("Should unlike post by user", async () => {
  const loginTwo = await request(server)
    .post("/api/user/login")
    .send({ email: testUserTwo.email, password: testUserTwo.password });
  const loginOne = await request(server)
    .post("/api/user/login")
    .send({ email: testUserOne.email, password: testUserOne.password });
  expect(loginOne.status).toBe(200);
  expect(loginTwo.status).toBe(200);

  const post = await request(server)
    .post("/api/post")
    .send({ text: "test post", id: loginOne.body.profile_id })
    .set("Authorization", `Bearer ${loginOne.body.token}`);

  expect(post.status).toBe(200);

  const like = await request(server)
    .post(`/api/like/post/${post.body.id}`)
    .set("Authorization", `Bearer ${loginOne.body.token}`);

  const postLiked = await request(server).get(`/api/post/${post.body.id}`);

  expect(postLiked.body.likesCount).toBe(1);

  expect(like.body.message).toBe("Successfully liked post");

  const unlike = await request(server)
    .delete(`/api/like/post/${post.body.id}`)
    .set("Authorization", `Bearer ${loginOne.body.token}`);

  expect(unlike.body.message).toBe("Successfully unfollowed user");

  const postUnliked = await request(server).get(`/api/post/${post.body.id}`);

  expect(postUnliked.body.likesCount).toBe(0);
});

test("Should like comment by user", async () => {
  const loginTwo = await request(server)
    .post("/api/user/login")
    .send({ email: testUserTwo.email, password: testUserTwo.password });
  const loginOne = await request(server)
    .post("/api/user/login")
    .send({ email: testUserOne.email, password: testUserOne.password });
  expect(loginOne.status).toBe(200);
  expect(loginTwo.status).toBe(200);

  const post = await request(server)
    .post("/api/post")
    .send({ text: "test post", id: loginOne.body.profile_id })
    .set("Authorization", `Bearer ${loginOne.body.token}`);

  expect(post.status).toBe(200);

  const comment = await request(server)
    .post(`/api/comment/${post.body.id}`)
    .send({ text: "test comment" })
    .set("Authorization", `Bearer ${loginOne.body.token}`);

  expect(comment.status).toBe(200);

  const like = await request(server)
    .post(`/api/like/comment/${comment.body.id}`)
    .set("Authorization", `Bearer ${loginOne.body.token}`);

  expect(like.body.message).toBe("Successfully liked comment");

  const commentLiked = await request(server).get(
    `/api/comment/${post.body.id}`
  );

  expect(commentLiked.body[0].likesCount).toBe(1);
});

test("Should unlike comment by user", async () => {
  const loginTwo = await request(server)
    .post("/api/user/login")
    .send({ email: testUserTwo.email, password: testUserTwo.password });
  const loginOne = await request(server)
    .post("/api/user/login")
    .send({ email: testUserOne.email, password: testUserOne.password });
  expect(loginOne.status).toBe(200);
  expect(loginTwo.status).toBe(200);

  const post = await request(server)
    .post("/api/post")
    .send({ text: "test post", id: loginOne.body.profile_id })
    .set("Authorization", `Bearer ${loginOne.body.token}`);

  expect(post.status).toBe(200);

  const comment = await request(server)
    .post(`/api/comment/${post.body.id}`)
    .send({ text: "test comment" })
    .set("Authorization", `Bearer ${loginOne.body.token}`);

  expect(comment.status).toBe(200);

  const like = await request(server)
    .post(`/api/like/comment/${comment.body.id}`)
    .set("Authorization", `Bearer ${loginOne.body.token}`);

  expect(like.body.message).toBe("Successfully liked comment");

  const commentLiked = await request(server).get(
    `/api/comment/${post.body.id}`
  );

  expect(commentLiked.body[0].likesCount).toBe(1);

  const unlike = await request(server)
    .delete(`/api/like/comment/${comment.body.id}`)
    .set("Authorization", `Bearer ${loginOne.body.token}`);

  expect(unlike.body.message).toBe("Successfully unfollowed comment");

  const commentUnliked = await request(server).get(
    `/api/comment/${post.body.id}`
  );

  expect(commentUnliked.body[0].likesCount).toBe(0);
});
