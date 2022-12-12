import React from 'react'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.Footer}>Copyright Dovla &#169; {new Date().getFullYear()}</footer>
  )
}

export default Footer