const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlog=[
    {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
    },
    {
        title: 'Type wars are herer',
        author: 'Robert C. Martinez',
        url: 'http://blog.cleancodergerd.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 5,
    }
]

const blogsInDb = async() => {
    const blogs = await Blog.find({})
    return blogs.map(n => n.toJSON())
}

const usersinDb = async() => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports= { initialBlog, blogsInDb, usersinDb }