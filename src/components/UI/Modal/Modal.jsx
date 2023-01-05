import ReactDOM from 'react-dom';
import classes from './Modal.module.scss';

const Modal = (props) => {
	return (
		<>
			{ReactDOM.createPortal(
				<div className={classes.backdrop} onClick={props.onClose} />,
				document.getElementById('backdrop-root')
			)}
			{ReactDOM.createPortal(
				<div
					className={`${classes.modal} ${
						props.size === 'large' && classes.large
					}`}>
					<div className={classes.content}>{props.children}</div>
				</div>,
				document.getElementById('backdrop-root')
			)}
		</>
	);
};

export default Modal;
