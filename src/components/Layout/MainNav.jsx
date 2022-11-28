import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './MainNav.module.scss';

const MainNavigation = () => {
	const isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;
	console.log(isTouch);
	const [isOpen, setIsOpen] = useState(false);
	const toggleMenuHandler = () => {
		setIsOpen((prevState) => !prevState);
	};
	const mouseOverHandle = () => {};
	return (
		<nav className={`${styles.MainNav}`}>
			<div className={styles.MainNav__Logo}>
				<NavLink to='/' className='logoLink' end>
					<h1>hello&nbsp;world</h1>
				</NavLink>
			</div>
			<ul className={`${isOpen ? styles.MainNav__IsOpen : ''}`}>
				<li style={{ '--time': '0.2s' }}>
					<NavLink to='/' end>home</NavLink>
				</li>
				<li style={{ '--time': '0.4s' }}>
					<NavLink to='ui' end>UI</NavLink>
				</li>
				<li
					className={styles.MainNav__Dropdown}
					style={{ '--time': '0.6s' }}>
					<NavLink to='dnd' onMouseOver={mouseOverHandle} end>
						DND
					</NavLink>
					<div className={styles.MainNav__Dropdown__Content}>
						<NavLink to='dnd/basic'>DND basic</NavLink>
						<NavLink to='dnd/2-column'>DND 2 column</NavLink>
						<NavLink to='dnd/kanban'>DND kanban</NavLink>
					</div>
				</li>
				<li style={{ '--time': '0.8s' }}>
					<NavLink to=''>projects</NavLink>
				</li>
			</ul>

			<button
				onClick={toggleMenuHandler}
				className={`${styles.MainNav__Hamburger} ${
					isOpen ? styles.MainNav__IsOpen : ''
				}`}>
				<span className='c-nav-burger-l1'></span>
				<span className='c-nav-burger-l2'></span>
				<span className='c-nav-burger-l3'></span>
			</button>
		</nav>
	);
};

export default MainNavigation;
