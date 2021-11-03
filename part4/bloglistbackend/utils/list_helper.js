const _ = require('lodash')

const dummy = () => 1

const totalLikes = (blogs) => {
    const reducer = (sum,blog) => {
        const a = sum + blog.likes
        // console.log(a)
        return a
    }
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer,0)


}

const favouriteBlog = (blogs) => {
    const blogSummaries = blogs.map((post) => ({
        title: post.title,
        author: post.author,
        likes: post.likes
    })
    )
    // console.log(blogSummaries)
    const mostLikedBlog = blogSummaries.reduce(
        (acc, blog) => (acc = acc > blog.likes ? acc : blog.likes),
        0
    )
    const found = blogSummaries.find((blog) => blog.likes === mostLikedBlog)
    // console.log(found)
    return found
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    let result = _.countBy(blogs, 'author')
    console.log(result)
    // object.values() & object.keys() &  sort function MDN
    const sortedBlogs = Object.values(result).sort((a, b) => b - a)
    console.log(sortedBlogs)
    const sortedResult = Object.keys(result).sort(
        (a, b) => result[b] - result[a]
    )
    console.log(sortedResult)

    const mostBlogsObject = { author: sortedResult[0], blogs: sortedBlogs[0] }
    return mostBlogsObject
}


const mostLikes = (blogs) => {
    let authorLikes = blogs.reduce((op, { author, likes }) => {
        op[author] = op[author] || 0
        op[author] += likes
        return op
    }, {})
    console.log(authorLikes)
    let mostLikedAuthor = Object.keys(authorLikes).sort(
        (a, b) => authorLikes[b] - authorLikes[a]
    )[0]
    let mostLiked = Object.values(authorLikes).sort((a, b) => b - a)[0]
    console.log(mostLiked)
    let mainObj = { author: mostLikedAuthor, likes: mostLiked }
    console.log(mainObj)
    return mainObj
}


module.exports={
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}