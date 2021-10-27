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
    return blogs.reduce((acc,blog) => acc = acc> blog.likes ? acc : blog.likes,0)
}

module.exports={
    dummy,
    totalLikes,
    favouriteBlog
}