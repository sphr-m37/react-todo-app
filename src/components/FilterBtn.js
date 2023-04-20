import React from 'react'

import styles from '.././Style.module.css'


export const FilterBtn = ({ name, setFilter, filter }) => {


    const backGroundForStatus = {
        'all': 'green',
        'due date': '#cc3300',
        'important': '#ff9966',
        'canceled': '#333',
        'postponed': 'royalblue',
        'in progress': '#99cc33',
        'completed': 'darkblue'
    }
    return (
        <option
            key={name}
            className={styles.filterBtn}
            style={{ background: name === filter && backGroundForStatus[name] }}
            onClick={() => setFilter(name)}
        >{name}</option>
    )
}
