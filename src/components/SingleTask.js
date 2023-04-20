import React, { useContext } from 'react'

import styles from '.././Style.module.css'

import { todoContext } from '../context/todoContext'

export const SingleTask = ({ todo }) => {
    const backGroundForStatus = {
        'due date': '#cc3300',
        'important': '#ff9966',
        'canceled': '#333',
        'postponed': 'royalblue',
        'in progress': '#99cc33',
        'completed': 'darkblue'
    }



    const { deleteItem, editeItem } = useContext(todoContext)


    return (
        <li className={styles.singleTask} style={{ backgroundColor: backGroundForStatus[todo.status] }} >
            <div>
                <h4>{todo.todoTitle}</h4>
                <span>status : {todo.status}</span>
            </div>
            <div className={styles.btnBox}>
                <button onClick={() => editeItem(todo.id)} >edit</button>
                <button onClick={() => deleteItem(todo.id)}>delete</button>
            </div>
        </li >
    )
}
