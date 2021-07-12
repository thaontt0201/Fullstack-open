const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "QWereInd",
    author: "Phong",
    url: "https://fullstackopen.com/en/part4/testing_the_backend#async-await-in-the-backend",
    likes: 25,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
