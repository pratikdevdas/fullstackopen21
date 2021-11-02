const dummy = () => 1

const totalLikes = (blogs) => {
    const reducer = (sum,blog) => {
        const a = sum + blog.likes
        console.log(a)
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
    console.log(blogSummaries)
    const mostLikedBlog = blogSummaries.reduce(
        (acc, blog) => (acc = acc > blog.likes ? acc : blog.likes),
        0
    )
    const found = blogSummaries.find((blog) => blog.likes === mostLikedBlog)
    console.log(found)
    return found
}

module.exports={
    dummy,
    totalLikes,
    favouriteBlog
}