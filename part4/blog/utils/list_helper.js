const totalLikes = blogs => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
    if (blogs.length === 0) return {}
    const reducer = (fav, blog) => {
        return blog.likes > fav.likes ? blog : fav
    }
    const favBlog = blogs.reduce(reducer, blogs[0])
    delete favBlog._id
    delete favBlog.__v
    delete favBlog.url
    return favBlog
}


const summarizeBlogsByAuthor = blogs => {
    const findAuthor = (authors, blogAuthor) => {
        return authors.findIndex(author => author.author === blogAuthor)
    }
    const reducer = (authors, blog) => {
        const authorIndex = findAuthor(authors, blog.author)
        if (authorIndex === -1){
            authors = authors.concat(
                {
                    'author': blog.author,
                    'blogs': 1,
                    'likes': blog.likes
                }
            )
        } else {

            authors = authors
                .filter(author => {
                    return author.author !== blog.author})
                .concat({
                    'author': blog.author,
                    'blogs': authors[authorIndex].blogs + 1,
                    'likes': authors[authorIndex].likes + blog.likes
                })
        }
        return authors
    }
    return blogs.reduce(reducer, [])
}

const mostBlogs = blogs => {
    const blogsByAuthor = summarizeBlogsByAuthor(blogs)
    const reducer = (most, author) => {
        return author.blogs > most.blogs ? author : most
    }
    if (blogs.length > 0) {
        const authorObj = blogsByAuthor.reduce(reducer, blogsByAuthor[0])
        delete authorObj.likes
        return authorObj
    }
    else return {}
}

const mostLikes = blogs => {
    const blogsByAuthor = summarizeBlogsByAuthor(blogs)
    const reducer = (most, author) => {
        return author.likes > most.likes ? author : most
    }
    if (blogs.length > 0) {
        const authorObj = blogsByAuthor.reduce(reducer, blogsByAuthor[0])
        delete authorObj.blogs
        return authorObj
    }
    else return {}
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}