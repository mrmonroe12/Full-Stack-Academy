const dummy = blogs => {
    return 1
}

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

module.exports = {
    dummy,
    totalLikes,
	favoriteBlog
}