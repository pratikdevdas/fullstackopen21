const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlog) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

describe('api tests',() => {
    test('checking get req to /api/blogs', async() => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

    },10000)

    test('checking if blogs contains the unique identifier:id', async() => {
        const response = await api.get('/api/blogs')
        const result = response.body.map(r => r.id)

        expect(result).toBeDefined()
    })

    test('sending blogs to server', async() => {
        const newBlog = {
            title: 'React patterns are here finally',
            author: 'Revenant Xob',
            url: 'https://reallygreatsite.com/',
            likes: 12
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlog.length+1)

        const contents = blogsAtEnd.map(r => r.title)
        expect(contents).toContain('React patterns are here finally')
    })


    test('if like property is missing setiing it to 0', async() => {
        const newBlog = {
            title:'Hey there',
            author: 'Revenant Xob',
            url:'www.google.com'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        if(!blogsAtEnd.likes){
            return blogsAtEnd === 0
        }
        expect(blogsAtEnd.likes).toBe(0)
    })

    test('sending blogs to server', async() => {
        const newBlog = {
            author: 'Revenant Xob',
            likes: 12
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlog.length)
    })

    test('deleting a single note', async() => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlog.length-1)
    })

    test('updating a single note ', async() => {

        const updateBlog = {
            author: 'Re',
            likes: 1232
        }
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        await api.put(`/api/blogs/${blogToUpdate.id}`)
            .send(updateBlog)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlog.length)

        const likes = blogsAtEnd.map(r => r.likes)
        expect(likes).toContain(1232)
    })

    describe('user testing', () => {
        beforeEach(async () => {
            await User.deleteMany({})

            const passwordHash =  await bcrypt.hash('random',10)
            const user = new User ({ username:'user1', passwordHash })

            await user.save()
        })
        test('invalid users are not created', async() => {
            const usersAtStart = await helper.usersinDb()

            const newUser = {
                username:'user1',
                name:'Jora',
                password: 'tuku'
            }

            const result = await api.
                post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(result.body.error).toContain('`username` to be unique')

            const usersAtEnd = await helper.usersinDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length)
        },10000)

        test('when username is small', async() => {
            const usersAtStart = await helper.usersinDb()

            const newUser = {
                username:'us',
                name:'Jora',
                password: 'tuku'
            }

            const result = await api.
                post('/api/users')
                .send(newUser)
                .expect(400)

            expect(result.body.error).toContain('length')
            const usersAtEnd = await helper.usersinDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length)
        },100000)

    })
})

afterAll(() => {
    mongoose.connection.close()
})


