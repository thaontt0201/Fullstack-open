const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");

const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("there is innitially blogs saved", () => {
  test("blog posts in the JSON format", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
});

describe("viewing a specific blog", () => {
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
});

describe("addition of new blog", () => {
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
});

describe("editing a specific blog", () => {
  test("a blog can be edited by id", async () => {
    const blogAtStart = await helper.blogsInDb();
    const blogToUpdate = blogAtStart[0];
    const editedBlog = {
      title: "QWereInd",
      author: "Phong",
      url: "https://fullstackopen.com/en/part4/testing_the_backend#async-await-in-the-backend",
      likes: 26,
    };
    await api.put(`/api/blogs/${blogToUpdate.id}`).send(editedBlog).expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    const blogUpdated = blogsAtEnd[0];
    expect(blogUpdated).not.toEqual(blogToUpdate);

    // const numLikes = blogsAtEnd.map((n) => n.likes);
    // expect(numLikes).toContain(26);
  });
});

//close the database connection after testing
afterAll(() => {
  mongoose.connection.close();
});
