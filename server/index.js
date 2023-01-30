const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const { Server } = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/messages')
const {addUser, removeUser, getUser, getUsersInRoom} = require('./utils/users')
// app.use(cors())
const io = new Server(server, {
	cors: {
		origin: [
			'http://localhost:3000',
			'http://127.0.0.1:3000',
			'http://localhost:3001',
			'http://127.0.0.1:3001',
			'http://localhost:3002',
			'http://127.0.0.1:3002',
			'http://localhost:3003',
			'http://127.0.0.1:3003',
			'http://localhost:5173',
			'http://127.0.0.1:5173',
		],
	},
});

app.get('/', (req, res) => {
	res.send({ test: 'test' });
});

io.on('connection', (socket) => {
    console.log(`a user connected ${socket.id}`);

    // socket.broadcast.emit('message', 'A new user has joind!')
    socket.on('join', ({username, room}, callback) => {
		console.log(username, room)
        const {error, user} = addUser({id: socket.id, username, room})
		

        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `<span>${user.username}</span> has entered the chat room`) )
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })
        socket.emit('message', generateMessage('Admin','Welcome'))

        callback()
    })
    socket.on('sendMessage', (message, callback) => {
		console.log('msg',message)
        const user = getUser(socket.id)
        // const filter = new Filter()
        // filter.addWords('kurac', 'picka', 'govno');
        // const filteredMessage = filter.clean(message)

        // if (filter.isProfane(message)) {
        //     callback('Profanity is not allowed')
        // }

        io.to(user.room).emit('message', generateMessage(user.username, message))
        callback()
    })
    // socket.on('sendLocation', (coordinate, callback) => {
    //     socket.broadcast.emit('locationMessage', generateMessage(coordinate))
    //     callback()
    // })

    socket.on('sendLocation', (coordinate, callback) => {
        const user = getUser(socket.id)
        socket.broadcast.to(user.room).emit('locationMessage', generateLocationMessage(user.username, coordinate))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
		console.log('disconnected', socket.id)

        if (user) {
            io.to(user.room).emit('message', generateMessage('Admin', `A ${user.username} hes left chat`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })
})

// io.on('connection', (socket) => {
// 	console.log(`a user connected ${socket.id}`);
// 	socket.on("join_room", (data) => {
// 		socket.join(data);
// 		io.to(data).emit('roomData', 'alo bre')
// 		console.log(`User with ID: ${socket.id} joined room: ${data}`);
// 	  });

// 	  socket.on("send_message", (data) => {
// 		socket.to(data.room).emit("receive_message", data);
// 	  });

// 	// socket.emit("hello", "world");
// 	// socket.on('join', ({name, room}, callback) => {
// 	// 	console.log('this is form socket on', name, room)
// 	// 	socket.emit("joining", `${name} je prisupio sobi ${room}`);
// 	// 	socket.join(room)
// 	// })
// 	// socket.broadcast.emit('message', 'some message after join')

// 	socket.on('disconnect', () => {
// 		console.log('user disconnected');
// 	});
// });

server.listen(3000, () => {
	console.log('listening on *:3000');
});

module.exports = app;
