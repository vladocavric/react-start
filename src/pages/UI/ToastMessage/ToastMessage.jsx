import React from 'react';
import styles from './ToastMessage.module.scss';
const ToastMessage = (props) => {
	return (
		<div
			className={styles.toast}
			style={{ 'backgroundColor': `var(--${props.status})` }}>
			<div className={styles.icon}>
				<i className={`icon-${props.status}`}></i>
			</div>
			<div>
				<h3>{props.status}</h3>
				<p>{props.children}</p>
			</div>
			<div className={styles.close} onClick={props.onClose}>
				<i className={`icon-x`}></i>
			</div>
		</div>
	);
};

export default ToastMessage;
