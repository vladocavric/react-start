import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

import Chat from '../../components/Chat/Chat';
import ChatLogin from '../../components/Chat/ChatLogin';
import ToastMessage from '../UI/ToastMessage/ToastMessage';

const socket = io.connect('http://localhost:3000');

const ChatPage = () => {
	const [username, seUsername] = useState('');
	const [room, setRoom] = useState('');
	const [error, setError] = useState('');
	const [chatting, setChatting] = useState(false);
	const [roomUsers, setRoomUsers] = useState([])

	const handleSetNameAndRoom = (typedUsername, typedRoom) => {
		seUsername(typedUsername);
		setRoom(typedRoom);
		if (typedUsername !== '' && typedRoom !== '') {
			socket.emit(
				'join',
				{ username: typedUsername, room: typedRoom },
				(error) => {
					if (error) {
						setError(error);
					} else {
						setChatting(true);
					}
				}
			);
		}
	};

	const removeErr = () => {
		setError('');
	};

	

	useEffect(() => {
		socket.on('roomData', ({room, users}) => {
			console.log(room, users)
			setRoomUsers(users)
		})
		return () => {
			socket.off('roomData')
		};
	}, []);

	return (
		<>
			{error && (
				<ToastMessage onClose={removeErr} status='error'>
					{error}
				</ToastMessage>
			)}
			{!chatting && (
				<ChatLogin
					socket={socket}
					handleStartChat={handleSetNameAndRoom}
				/>
			)}
			{chatting && (
				<Chat roomUsers={roomUsers} socket={socket} username={username} room={room} />
			)}
		</>
	);
};

export default ChatPage;
