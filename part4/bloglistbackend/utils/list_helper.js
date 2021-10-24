const dummy = () => 1

const totalLikes = (blogs) => {
    const reducer = (sum,blog) => {
        console.log(reducer)
        return sum + blog.likes
    }
    return blogs.lemgth === 0
        ? 0
        : blogs.reduce(reducer,0)

}

module.exports={
    dummy,
    totalLikes
}