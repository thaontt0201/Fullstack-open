const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "QWereInd",
    author: "Phong",
    url: "https://fullstackopen.com/en/part4/testing_the_backend#async-await-in-the-backend",
    likes: 25,
  },
  {
    title: "Indie",
    author: "Vinh",
    url: "https://fullstackopen.com/en/part4/testing_the_backend#async-await-in-the-backend",
    likes: 58,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
};
