import React from 'react';
import { Link } from 'react-router-dom';

import styles from './DNDTabs.module.scss';

const DNDTabs = () => {
	return (
		<div className={styles.DNDTabs}>
			<div>
				<div>
					<Link to='/dnd/basic'>basic</Link>
					<Link to='/dnd/2-column'>2 column</Link>
					<Link to='/dnd/kanban'>kanban</Link>
				</div>
			</div>
		</div>
	);
};

export default DNDTabs;
