import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './MainNav.module.scss'

const MainNavigation = () => {
   const  mouseOverHandle = () => {}
  return (
    <nav className={styles.MainNav}>
    <div className={styles.MainNav__Logo}>
        <NavLink to="/" className='logoLink'>
            <h1>hello&nbsp;world</h1>
        </NavLink>

    </div>
    <ul className="c-nav-ul c-txt-trans-c">
        <li><NavLink to="#">home</NavLink></li>
        <li><NavLink to="#">about</NavLink></li>
        <li className={styles.MainNav__Dropdown}>
            <NavLink to="#" onMouseOver={mouseOverHandle}>work</NavLink>
            <div className={styles.MainNav__Dropdown__Content} id="d-none-tablet">
                    <NavLink to="#">Link 1 Link 1 Link 1</NavLink>
                    <NavLink to="#">Link 2</NavLink>
                    <NavLink to="#">Link 3</NavLink> 
                </div>
        </li>
        <li><NavLink to="#">projects</NavLink></li>
    </ul>
  
    <div className="c-nav-burger burger">
        <div className="c-nav-burger-l1 u-bg-w"></div>
        <div className="c-nav-burger-l2 u-bg-w"></div>
        <div className="c-nav-burger-l3 u-bg-w"></div>
    </div>
</nav>
  )
}

export default MainNavigation