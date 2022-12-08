import React from 'react'
import { Link } from 'react-router-dom'

import styles from './DNDKanban.module.scss'

const DNDKanban = () => {
  return (
    <div className={styles.DNDKanban}>
      <div className={styles.DNDKanban__titleSection}>
        <h1>Kanban Table</h1>
        <Link to='/tasks/new' className="btn btn-primary">New Tasks<i></i></Link>
      </div>
    </div>
  )
}

export default DNDKanban