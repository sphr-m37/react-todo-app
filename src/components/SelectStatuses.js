import React, { memo, useContext, useState } from 'react'

import styles from '.././Style.module.css'

import { todoContext } from '../context/todoContext'

const SelectStatuses = ({ status }) => {

    const [nowStatus, setNowStatus] = useState(status)

    const { statuses } = useContext(todoContext)

    const onchangeHandle = (e) => {
        setNowStatus(e.target.value)
    }

    return (
        <select className={styles.select} name='status' value={nowStatus} onChange={onchangeHandle} >
            <option  disabled value='' >select status</option>
            {statuses.map(item => <option key={item} >{item}</option>)}
        </select>
    )
}
export default memo(SelectStatuses)