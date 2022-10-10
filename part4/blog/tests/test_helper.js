const Blog = require('../models/blog')

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



const nonExistingId = async () => {
    const blog = new Blog({title: 'temporary', author: 'temporary auth', url: 'https://www.notarealsite.com', likes: 0})
    await blog.save()
    await blog.remove()
    
    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, newBlog, badBlogTitle, postNoLikes, badBlogUrl
}