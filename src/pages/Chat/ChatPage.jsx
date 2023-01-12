import { useState } from 'react';
import io from 'socket.io-client';

import Chat from '../../components/Chat/Chat';
import ChatLogin from '../../components/Chat/ChatLogin';

const socket = io.connect('http://localhost:3000');
const ChatPage = () => {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [chatting, setChatting] = useState(false);

	const handleSetNameAndRoom = (typedName, typedRoom) => {
		setName(typedName);
		setRoom(typedRoom);
		setChatting(true);
	};
	return (
		<>
			{!chatting && (
				<ChatLogin
					socket={socket}
					handleStartChat={handleSetNameAndRoom}
				/>
			)}
			{chatting && <Chat socket={socket} name={name} room={room} />}
		</>
	);
};

export default ChatPage;
