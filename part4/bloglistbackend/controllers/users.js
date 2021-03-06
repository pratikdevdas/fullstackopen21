const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/',async(request,response) => {
    const blogs = await User.find({}).populate('blogs')
    response.json(blogs)
})

usersRouter.post('/',async(request,response) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    if(body.password.length < 3){
        return response.status(401).json({ error:'provide password of longer length' })
    }
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })
    // console.log(User.findById(body._id))

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter