import React from 'react';

import styles from './Chat.module.scss';

const Chat = ({ socket, name, room }) => {
	return (
		<div className={styles.chat}>
			<div className={styles.sidebar}>
				<h3 className={styles.titleLine}>
					{name}
				</h3>
				<div className={styles.users}>a</div>
			</div>
			<div className={styles.mein}>
        <h3 className={styles.titleLine}>chat in the room: {room}</h3>
				<div className={styles.messages}></div>
				<div className={styles.writingArea}>
		<div className={styles.actions}>

          <div className={styles.form}>
            <div className={styles.input} contenteditable="true">a</div>
            <button><i className="icon-send"></i></button>
          </div>
          <button><i className='icon-geolocation'></i></button>
		</div>
        </div>
			</div>
		</div>
	);
};

export default Chat;
