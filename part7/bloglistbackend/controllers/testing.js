const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.get('/', (request,response) => {
    response.send('<h1>hello world</h1>')
})
/* app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  }) */
router.post('/reset', async (request, response) => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    response.status(204).end()
})

module.exports = router