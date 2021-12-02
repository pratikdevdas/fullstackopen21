const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async(request, response) => {
    const blogs=await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/:id', async(request, response) => {
    const blog = await Blog.findById(request.params.id)
    //no{}
    response.json(blog)
})

blogsRouter.post('/', async(request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    try{
        const savedBlog = await blog.save()
        response.json(savedBlog)
    } catch(exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async(request, response, ) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async(request,response,next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    try{
        const updatedBLog = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true })
        response.json(updatedBLog.toJSON())
    } catch(exception) {
        next(exception)
    }

    // Blog.findByIdAndUpdate(request.params.id, blog, { new:true })
    // .then(updatedBlog => {
    // response.json(updatedBlog.toJSON())
    // })
})
module.exports = blogsRouter