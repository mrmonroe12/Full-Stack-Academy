const info = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log('[Dev Log]',...params)
    }
}

const error = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.error('[Dev Error]',...params)
    }
}

module.exports = {
    info, error
}