const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((a, b) => {
    return a + b.likes;
  }, 0);
};

const favouriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const mostLike = Math.max(...likes);
  return blogs.find((blog) => blog.likes === mostLike);
};

const mostBlogs = (blogs) => {
  const arr = [];
  blogs.forEach((blog) => {
    if (arr.some((element) => element.author === blog.author)) {
      arr.forEach((element) => {
        if (element.author === blog.author) {
          element.blogs++;
        }
      });
    } else {
      const obj = { author: blog.author, blogs: 1 };
      arr.push(obj);
    }
  });
  const countBlogs = arr.map((element) => element.blogs);
  const maxBlogs = Math.max(...countBlogs);
  return arr.find((element) => element.blogs === maxBlogs);
};

const mostLikes = (blogs) => {
  const arr = [];
  blogs.forEach((blog) => {
    if (arr.some((element) => element.author === blog.author)) {
      arr.forEach((element) => {
        if (element.author === blog.author) {
          element.likes += blog.likes;
        }
      });
    } else {
      const obj = { author: blog.author, likes: blog.likes };
      arr.push(obj);
    }
  });
  const countLikes = arr.map((element) => element.likes);
  const maxLikes = Math.max(...countLikes);
  return arr.find((element) => element.likes === maxLikes);
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
