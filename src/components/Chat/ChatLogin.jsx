import { useState } from 'react';

import Input from '../UI/Input';

import styles from './ChatLogin.module.scss';



const ChatLogin = ({socket, handleStartChat}) => {

	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();
        if(name !== '' && room !== '') {
            handleStartChat(name, room)
        }
	};

	const handleChangeName = (nameTyped) => {
		setName(nameTyped);
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
					label={'Name'}
					input={{
						type: 'text',
						id: 'name',
						value: name,
					}}
					valueChange={handleChangeName}
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
