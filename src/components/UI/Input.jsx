import React from 'react';
import styles from './Input.module.scss';

const Input = React.forwardRef((props, ref) => {
	const handleInputChange = (e) => {
		props.valueChange(e.target.value);
	};
	return (
		<div className={styles.Input}>
			<input {...props.input} ref={ref} onChange={handleInputChange} />
			<label htmlFor={props.input.id}>{props.label}</label>
			<div className={styles.InputError}>{props.error}</div>
		</div>
	);
});
export default Input;
