import React from 'react'
import styles from '.././Style.module.css'
import { Form } from '../components/Form'
import { TasksList } from '../components/TasksList'
export const Home = () => {
    return (
        <div className={styles.mainSection}>
            <h3 style={{ textAlign: 'center' }}>your todo list</h3>
            <Form />
            <TasksList />
        </div>
    )
}
