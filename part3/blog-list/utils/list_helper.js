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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
