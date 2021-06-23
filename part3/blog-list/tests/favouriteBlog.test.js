const favouriteBlog = require("../utils/list_helper").favouriteBlog;

describe("favourite blog", () => {
  const mostLike = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "60d1d7efb5dd401554574821",
      title: "ABCD",
      author: "Phong",
      url: "Phongb@gmail.com",
      likes: 8,
      __v: 0,
    },
  ];
  test("the most favourite blog", () => {
    const result = favouriteBlog(mostLike);
    expect(result).toEqual({
      _id: "60d1d7efb5dd401554574821",
      title: "ABCD",
      author: "Phong",
      url: "Phongb@gmail.com",
      likes: 8,
      __v: 0,
    });
  });
});
