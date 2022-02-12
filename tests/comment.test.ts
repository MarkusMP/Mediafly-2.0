import app from "../src/app";
import { port } from "../src/config";
import { createConnection } from "typeorm";
import request from "supertest";
import { Comment } from "../src/entities/comment.entity";

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

test("Should create comment on post", async () => {
  const createOne = await request(server).post("/api/user").send(testUserOne);
  const createTwo = await request(server).post("/api/user").send(testUserTwo);
  expect(createOne.status).toBe(200);
  expect(createTwo.status).toBe(200);

  const post = await request(server)
    .post("/api/post")
    .set("Authorization", `Bearer ${createOne.body.token}`)
    .send({
      text: "test post",
      image: "test image",
    });

  expect(post.status).toBe(200);

  const comment = await request(server)
    .post(`/api/comment/${post.body.id}`)
    .set("Authorization", `Bearer ${createTwo.body.token}`)
    .send({
      text: "test comment",
    });

  expect(comment.status).toBe(200);
  expect(comment.body.text).toBe("test comment");
});

test("Should fetch all comments by post id", async () => {
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
    .set("Authorization", `Bearer ${loginOne.body.token}`)
    .send({
      text: "test post",
      image: "test image",
    });

  expect(post.status).toBe(200);

  const comment = await request(server)
    .post(`/api/comment/${post.body.id}`)
    .set("Authorization", `Bearer ${loginTwo.body.token}`)
    .send({
      text: "test comment",
    });

  expect(comment.status).toBe(200);

  const comments = await request(server).get(`/api/comment/${post.body.id}`);

  expect(comments.status).toBe(200);
  expect(comments.body).toHaveLength(1);
  expect(comments.body[0].text).toBe("test comment");
});

test("Should delete comment", async () => {
  const loginOne = await request(server)
    .post("/api/user/login")
    .send({ email: testUserOne.email, password: testUserOne.password });
  expect(loginOne.status).toBe(200);

  const post = await request(server)
    .post("/api/post")
    .set("Authorization", `Bearer ${loginOne.body.token}`)
    .send({
      text: "test post",
      image: "test image",
    });

  expect(post.status).toBe(200);

  const comment = await request(server)
    .post(`/api/comment/${post.body.id}`)
    .set("Authorization", `Bearer ${loginOne.body.token}`)
    .send({
      text: "test comment",
    });

  expect(comment.status).toBe(200);

  const deleteComment = await request(server)
    .delete(`/api/comment/${comment.body.id}`)
    .set("Authorization", `Bearer ${loginOne.body.token}`);

  expect(deleteComment.status).toBe(200);
  expect(deleteComment.body.message).toBe("Comment deleted successfully");

  const comments = await request(server).get(`/api/comment/${post.body.id}`);
  expect(comments.status).toBe(200);
  expect(comments.body).toHaveLength(0);
});

test("Should delete all comments when deleteing post", async () => {
  const loginOne = await request(server)
    .post("/api/user/login")
    .send({ email: testUserOne.email, password: testUserOne.password });
  expect(loginOne.status).toBe(200);

  const post = await request(server)
    .post("/api/post")
    .set("Authorization", `Bearer ${loginOne.body.token}`)
    .send({
      text: "test post",
      image: "test image",
    });

  expect(post.status).toBe(200);

  const comment = await request(server)
    .post(`/api/comment/${post.body.id}`)
    .set("Authorization", `Bearer ${loginOne.body.token}`)
    .send({
      text: "test comment",
    });

  expect(comment.status).toBe(200);

  const deletePost = await request(server)
    .delete(`/api/post/${post.body.id}`)
    .set("Authorization", `Bearer ${loginOne.body.token}`);

  expect(deletePost.status).toBe(200);
  expect(deletePost.body.message).toBe("Post deleted successfully");

  const comments = await request(server).get(`/api/comment/${post.body.id}`);
  expect(comments.status).toBe(200);
  expect(comments.body).toHaveLength(0);
});

test("Should delete all comments by user when deleting user", async () => {
  const loginOne = await request(server)
    .post("/api/user/login")
    .send({ email: testUserOne.email, password: testUserOne.password });
  expect(loginOne.status).toBe(200);

  const post = await request(server)
    .post("/api/post")
    .set("Authorization", `Bearer ${loginOne.body.token}`)
    .send({
      text: "test post",
      image: "test image",
    });

  expect(post.status).toBe(200);

  const comment = await request(server)
    .post(`/api/comment/${post.body.id}`)
    .set("Authorization", `Bearer ${loginOne.body.token}`)
    .send({
      text: "test comment",
    });

  expect(comment.status).toBe(200);

  const deleteUser = await request(server)
    .delete(`/api/user/`)
    .set("Authorization", `Bearer ${loginOne.body.token}`);

  expect(deleteUser.status).toBe(200);
  expect(deleteUser.body.message).toBe("User deleted");

  const comments = await Comment.find({ profile_id: loginOne.body.profile_id });
  expect(comments).toHaveLength(0);
});
