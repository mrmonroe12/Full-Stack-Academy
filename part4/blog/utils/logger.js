const info = (...params) => {
	console.log("[Dev Log]",...params)
}

const error = (...params) => {
	console.error("[Dev Error]",...params)
}

module.exports = {
	info, error
}