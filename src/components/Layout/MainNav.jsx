import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'

import styles from './MainNav.module.scss'

const MainNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenuHandler = () => {
        setIsOpen(prevState => !prevState)
    }
   const  mouseOverHandle = () => {}
  return (
    <nav className={styles.MainNav}>
    <div className={styles.MainNav__Logo}>
        <NavLink to="/" className='logoLink'>
            <h1>hello&nbsp;world</h1>
        </NavLink>

    </div>
    <ul className={`${isOpen ? styles.MainNav__IsOpen : ''}`}>
        <li style={{'--time': '0.2s'}}><NavLink to="#" >home</NavLink></li>
        <li style={{'--time': '0.4s'}}><NavLink to="#" >about</NavLink></li>
        <li className={styles.MainNav__Dropdown} style={{'--time': '0.6s'}}>
            <NavLink to="#" onMouseOver={mouseOverHandle}>work</NavLink>
            <div className={styles.MainNav__Dropdown__Content} id="d-none-tablet">
                    <NavLink to="#">Link 1 Link 1 Link 1</NavLink>
                    <NavLink to="#">Link 2</NavLink>
                    <NavLink to="#">Link 3</NavLink> 
                </div>
        </li>
        <li style={{'--time': '0.8s'}}><NavLink to="#">projects</NavLink></li>
    </ul>
  
    <button onClick={toggleMenuHandler} className={`${styles.MainNav__Hamburger} ${isOpen ? styles.MainNav__IsOpen : ''}`}>
        <span className="c-nav-burger-l1"></span>
        <span className="c-nav-burger-l2"></span>
        <span className="c-nav-burger-l3"></span>
    </button>
</nav>
  )
}

export default MainNavigation