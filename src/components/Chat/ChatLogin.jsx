import { useState } from 'react';

import Input from '../UI/Input';

import styles from './ChatLogin.module.scss';



const ChatLogin = ({handleStartChat}) => {

	const [username, setUsername] = useState('');
	const [room, setRoom] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();
        handleStartChat(username, room)
	};

	const handleChangeUsername = (nameTyped) => {
		setUsername(nameTyped);
	};
	const handleChangeRoom = (roomTyped) => {
		setRoom(roomTyped.trim());
	};

	return (
        <>
		<div className={styles.formWrap}>
			<form onSubmit={handleSubmit} className={styles.form}>
                <h2>Chat Login</h2>
				<Input
					label={'Username'}
					input={{
						type: 'text',
						id: 'username',
						value: username,
					}}
					valueChange={handleChangeUsername}
				/>
				<Input
					label={'Room'}
					input={{
						type: 'text',
						id: 'room',
						value: room,
					}}
					valueChange={handleChangeRoom}
				/>
                <button className='btn btn-primary'>Submit<i></i></button>
			</form>
		</div> 
        </>
	);
};

export default ChatLogin;
