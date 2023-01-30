const generateMessage = (username, text) => {
    return {
        username,
        text,
        createdAt: new Date().getTime()
    }
}

const generateLocationMessage = (username, coordinate) => {
    return {
        username,
        url: `https://www.google.com/maps?q=${coordinate.lat},${coordinate.lon}`,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}