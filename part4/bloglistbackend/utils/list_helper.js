const dummy = (blogs) => {
    return 1;
  }

  const totalLikes = (blogs) => {
    const reducer = (sum, item) => sum + item.likes
    return blogs.reduce(reducer, 0)
  }
   
  const favouriteBlog = (blogs) => {
    const maxLike = blogs.reduce(
      (max, blog) => (blog.likes > max ? blog.likes : max),
      blogs[0].likes
    );
    console.log(maxLike);
    const obj = blogs.find(o => o.likes === maxLike);
    const val = {title:obj.title,author:obj.author,likes:obj.likes}
    return val
  }

  const mostBlogs = (blogs) => {
    //to be written
  }
  const mostLikes = (blogs) => {
    //to be written
  }
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
  }


 