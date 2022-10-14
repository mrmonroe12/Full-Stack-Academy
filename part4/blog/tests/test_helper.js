const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title:  "Test Post 1",
        author: "Mike Monroe",
        url:    "www.notarealsite.com/posts/1",
        likes:  200
    },
    {
        title:  "Test Post 2",
        author: "Mike Monroe",
        url:    "www.notarealsite.com/posts/2",
        likes:  0
    }
]

const newBlog = {
    author: 'Seth',
    title: 'Offensive UFR - Iowa 22',
    url: 'http://mgoblog.com/not-a-real-post',
    likes: 7000,
}

const postNoLikes = {
    author: 'Seth',
    title: 'Offensive UFR - OSU 19',
    url: 'http://mgoblog.com/not-a-real-post',
}

const badBlogTitle = {
    author: 'Seth',
    url: 'http://mgoblog.com/not-a-real-post',
    likes: 7000,
}

const badBlogUrl = {
    title: 'Offensive UFR - Iowa 22',
    author: 'Seth',
    likes: 7000,
}

const initialUsers = [
    {
        username: "fakeusername",
        name: "John Doe",
        passwordHash: "$2b$10$yB2eYINP8cMcyQPQpFP3ZuXDJ.niOjf8wPpcTJKYgqJkkaqqg1BY2"
    },
    {
        username: "poseruser",
        name: "Jane Buck",
        passwordHash: "$2b$10$hVZpl5..IFNHD7BOhvcEiu8NqXoxONmiYbur6ZDKtqeY44eVwFxBi"
    }
]

const newUser = {
    username: 'seth',
    name: 'still just seth',
    password: 'ufr4lyfe',
}

const newUserNoUsername = {
    name: 'still just seth',
    password: 'ufr4lyfe',
}

const newUserNoPassword = {
    username: 'seth',
    name: 'still just seth',
}

const newUserShortUsername = {
    username: 'se',
    name: 'still just seth',
    password: 'ufr4lyfe',
}

const newUserShortPassword = {
    username: 'seth',
    name: 'still just seth',
    password: 'uf',
}

const nonExistingId = async () => {
    const blog = new Blog({title: 'temporary', author: 'temporary auth', url: 'https://www.notarealsite.com', likes: 0})
    await blog.save()
    await blog.remove()
    
    return blog._id.toString()
}

const nonExistingIdUser = async () => {
    const user = new User({username: 'temp', name: 'also temp', passwordHash: 'doesntmatterhere'})
    await user.save()
    await user.remove()
    
    return user._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, newBlog, badBlogTitle, postNoLikes, badBlogUrl,
    initialUsers, newUser, newUserNoUsername, newUserNoPassword, newUserShortUsername, newUserShortPassword, nonExistingIdUser, usersInDb
}