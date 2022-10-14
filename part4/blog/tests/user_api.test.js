const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
},100000) 

describe('when there are some initial users stored', () => {
    test('users are returned as json', async () => {
        await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    test('correct id type exists', async () => {
        const response = await api.get('/api/users')
        const testUser = response.body[0]
        expect(testUser.id).toBeDefined()   
    })

    test('all users are returned', async () => {
        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(helper.initialUsers.length)
    })

    test('fakeusername is within returned users', async () => {
        const response = await api.get('/api/users')
        const usernames = response.body.map(r => r.username)
        expect(usernames).toContain('fakeusername')
    })
})

describe('when attempting to add new users', () => {
    test('a valid user can be added', async () => {
        await api
        .post('/api/users')
        .send(helper.newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
            
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(helper.initialUsers.length+1)
    
        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain('seth')
    })

    test('a user without a username or password is rejected', async () => {
        await api
        .post('/api/users')
        .send(helper.newUserNoUsername)
        .expect(400)
    
        await api
        .post('/api/users')
        .send(helper.newUserNoPassword)
        .expect(400)        
        
        const usersAtEnd = await helper.usersInDb()
            
        expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
            
    })
    
    test('username and password must be 3+ chars long', async () => {
        await api
        .post('/api/users')
        .send(helper.newUserShortUsername)
        .expect(400)
    
        await api
        .post('/api/users')
        .send(helper.newUserShortPassword)
        .expect(400)        
        
        const usersAtEnd = await helper.usersInDb()
            
        expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
            
    })
    
    test('a username must be unique', async () => {
        await api
        .post('/api/users')
        .send(helper.newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        
        await api
        .post('/api/users')
        .send(helper.newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
            
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(helper.initialUsers.length+1)
    
        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain('seth')
            
    })
    
})


afterAll(() => {
    mongoose.connection.close()
})