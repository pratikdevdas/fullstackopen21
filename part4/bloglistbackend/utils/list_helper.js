const dummy = (blogs) => {
    return 1;
  }

  const totalLikes = (array) => {
    const reducer = (sum, item) => {
          return sum + item.likes
    }
    return array.reduce(reducer, 0)
  }
   
  const favouriteBlog = (array) => {
    const reducer = (sum, item) => {
          return sum + item.likes
    }
    return array.reduce(reducer, 0)
  }
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
  }


 