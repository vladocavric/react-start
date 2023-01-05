import React from 'react';

import styles from './LoadingSpinier.module.scss';

const LoadingSpinier = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.ldsRing}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default LoadingSpinier;
