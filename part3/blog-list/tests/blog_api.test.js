const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("../tests/test_helper");

const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
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

test("a blog can be added", async () => {
  const addNewBlog = {
    title: "ABCD",
    author: "Thao",
    url: "https://github1s.com/fullstack-hy/part3-notes-backend/blob/part4-4/tests/note_api.test.js",
    likes: 46,
  };
  await api
    .post("/api/blogs")
    .send(addNewBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const title = blogsAtEnd.map((n) => n.title);
  expect(title).toContain("QWereInd");
});

test("blog with default like equal 0", async () => {
  const addNewBlog = {
    title: "ABCD",
    author: "Thao",
    url: "https://github1s.com/fullstack-hy/part3-notes-backend/blob/part4-4/tests/note_api.test.js",
  };
  const response = await api
    .post("/api/blogs")
    .send(addNewBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(response.body.likes).toEqual(0);
});

test("blog misses the title and url", async () => {
  const addNewBlog = {
    author: "Thao",
    likes: 12,
  };
  await api.post("/api/blogs").send(addNewBlog).expect(400);
});
//close the database connection after testing
afterAll(() => {
  mongoose.connection.close();
});
