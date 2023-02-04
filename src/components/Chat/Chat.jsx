import { useRef, useState, useEffect } from 'react';
import ToastMessage from '../UI/ToastMessage/ToastMessage';
// import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import styles from './Chat.module.scss';

const Chat = ({ socket, username, room, roomUsers }) => {
	const currentMsg = useRef();
	const [messages, setMessages] = useState([]);
	const [error, setError] = useState('');
	const [disabledGeo, setDisabledGeo] = useState(false);

	const handleSendMessage = () => {
		const message = currentMsg.current.innerText;
		if (
			message === '' ||
			message === '\n\n\n' ||
			message === '\n\n\n\n\n'
		) {
			currentMsg.current.innerText = '';
			return;
		}
		socket.emit('sendMessage', message, (error) => {
			// enable
			// $messageFormBtn.removeAttribute('disabled')

			if (error) {
				setError('');
			}
			// console.log(`Message delivered!`);
		});
		currentMsg.current.innerText = '';
		currentMsg.current.focus();
	};

	const handleEnter = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			handleSendMessage();
		}
	};

	const removeErr = () => {
		setError('');
	};

	const handleSendLocation = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			let coordinate = {
				lat: position.coords.latitude,
				lon: position.coords.longitude,
			};
			socket.emit('sendLocation', coordinate, () => {
				const message = {
					username,
					createdAt: new Date().toISOString(),
					text: `https://www.google.com/maps?q=${coordinate.lat},${coordinate.lon}`,
					location: true,
				};
				setDisabledGeo(true)
				setMessages((privMsgs) => {
					const updatedMsgs = [...privMsgs];
					updatedMsgs.push(message);
					return updatedMsgs;
				});
			});
		});
	};

	useEffect(() => {
		if (!navigator.geolocation) {
			setError('Geolocation is not support by your browser, to have best experience please change to some modern browser')
			setDisabledGeo(true)
		}

		socket.on('message', (message) => {
			setMessages((privMsgs) => {
				const updatedMsgs = [...privMsgs];
				updatedMsgs.push(message);
				return updatedMsgs;
			});
		});

		socket.on('locationMessage', ({ username, url, createdAt }) => {
			const message = {
				username,
				createdAt,
				text: url,
				location: true,
			};
			setMessages((privMsgs) => {
				const updatedMsgs = [...privMsgs];
				updatedMsgs.push(message);
				return updatedMsgs;
			});
		});
		return () => {
			socket.off('message');
			socket.off('locationMessage');
		};
	}, [socket]);

	return (
		<>
			{error && (
				<ToastMessage onClose={removeErr} status='error'>
					error
				</ToastMessage>
			)}
			<div className={styles.chat}>
				<div className={styles.sidebar}>
					<h3 className={styles.titleLine}>{username}</h3>
					<div className={styles.users}>
						{roomUsers.map((user) => {
							if (user.username !== username) {
								return <div key={user.id}>{user.username}</div>;
							} else {
								return null;
							}
						})}
					</div>
				</div>
				<div className={styles.mein}>
					<h3 className={styles.titleLine}>
						chat in the room: {room}
					</h3>
					<div className={styles.messages}>
						{messages.map((msg) => (
							<div
								key={msg.createdAt}
								className={`${
									msg.username === username
										? styles.myMsg
										: ''
								} ${
									msg.username === 'Admin'
										? styles.adminMsg
										: ''
								} ${
									msg.username !== 'Admin' &&
									msg.username !== username
										? styles.notMyMsg
										: ''
								}`}>
								<div>
									{!msg.location && (
										<div
											dangerouslySetInnerHTML={{
												__html: msg.text,
											}}
										/>
									)}
									{msg.location && (
										<div>
											<a
												target='_blank'
												rel='noreferrer'
												href={msg.text}>
												My current location
											</a>
										</div>
									)}
									<div className={styles.msgMeta}>
										{msg.username !== 'Admin' &&
											msg.username !== username && (
												<div>
													{msg.username}{' '}
													<span>| </span>{' '}
												</div>
											)}
										{msg.username !== 'Admin' && (
											<div className={styles.time}>
												{' '}
												{new Date(
													msg.createdAt
												).getHours()}{' '}
												:{''}
												{new Date(
													msg.createdAt
												).getMinutes()}
											</div>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
					<div className={styles.writingArea}>
						<div className={styles.actions}>
							<div className={styles.form}>
								<div
									className={styles.input}
									contentEditable='true'
									ref={currentMsg}
									onKeyDown={handleEnter}></div>
								<button onClick={handleSendMessage}>
									<i className='icon-send'></i>
								</button>
							</div>
							<button onClick={handleSendLocation} disabled={disabledGeo}>
								<i className='icon-geolocation'></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Chat;
