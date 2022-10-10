const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const api = supertest(app)


beforeEach(async () => {
    await Blog.deleteMany({})
    
    let blogObj = new Blog(helper.initialBlogs[0])
    await blogObj.save()
    
    blogObj = new Blog(helper.initialBlogs[1])
    await blogObj.save()
},100000) 
    
test('blogs are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct id type exists', async () => {
    const response = await api.get('/api/blogs')
    const testBlog = response.body[0]
    expect(testBlog.id).toBeDefined()
    
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('Test post 1 is within returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContain('Test Post 1')
})
    
test('a valid note can be added', async () => {
    await api
    .post('/api/blogs')
    .send(helper.newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
            
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)
    
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain('Offensive UFR - Iowa 22')
})

test('a note without a title or url is rejected', async () => {
    await api
    .post('/api/blogs')
    .send(helper.badBlogTitle)
    .expect(400)
    
    await api
    .post('/api/blogs')
    .send(helper.badBlogUrl)
    .expect(400)        
        
    const blogsAtEnd = await helper.blogsInDb()
            
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
            
})

test('missing likes in post sets to 0', async () => {
    const postNoLikes = helper.postNoLikes
    await api
        .post('/api/blogs')
        .send(postNoLikes)

    const blogsAtEnd = await helper.blogsInDb()
    const testBlog = blogsAtEnd.filter(blog => blog.title === postNoLikes.title)[0]
    expect(testBlog.likes).toBe(0)
            
}) 

afterAll(() => {
    mongoose.connection.close()
})
    
