const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  let maxLikes = 0;
  let favoriteBlog = {};
  blogs.forEach((blog) => {
    if (blog.likes > maxLikes) {
      favoriteBlog = blog;
      maxLikes = blog.likes;
    }
  });
  const { title, author, likes } = favoriteBlog;
  return { title, author, likes };
};

const mostBlogs = (blogs) => {
  let authors = {};
  blogs.map((blog) => {
    authors[blog.author]
      ? (authors[blog.author] += 1)
      : (authors[blog.author] = 1);
  });
  let author = Object.keys(authors).reduce((a, b) =>
    authors[a] > authors[b] ? a : b
  );
  return {
    author,
    blogs: authors[author],
  };
};

const mostLikes = (blogs) => {
  let authors = {};
  blogs.map((blog) => {
    authors[blog.author]
      ? (authors[blog.author] += blog.likes)
      : (authors[blog.author] = blog.likes);
  });
  let author = Object.keys(authors).reduce((a, b) =>
    authors[a] > authors[b] ? a : b
  );
  return {
    author,
    likes: authors[author],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
