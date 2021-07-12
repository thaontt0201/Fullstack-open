const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
});

test("blog posts in the JSON format", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("verifying the identifier of the blog post is named id", async () => {
  const addNewBlog = {
    title: "ABC",
    author: "Thao",
    url: "https://github1s.com/fullstack-hy/part3-notes-backend/blob/part4-4/tests/note_api.test.js",
    likes: 45,
  };
  const response = await api
    .post("/api/blogs")
    .send(addNewBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(response.body.id).toBeDefined();
});

//close the database connection after testing
afterAll(() => {
  mongoose.connection.close();
});
