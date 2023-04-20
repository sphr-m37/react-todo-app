import React, { useCallback, useContext, useState } from 'react'
import styles from '.././Style.module.css'
import { todoContext } from '../context/todoContext'
import SelectStatuses from './SelectStatuses'

export const EditTask = ({ todo }) => {


    const { id,
        todoTitle,
        status } = todo
    
    const { cancelEdite, saveChanges } = useContext(todoContext)

    const onCancelEdit = useCallback(() => {
        cancelEdite(id)
    }, [cancelEdite, id])

    const saveChange = (e) => {
        e.preventDefault()
        const todoTitle = e.target.todo.value
        const status = e.target.status.value
        if (todoTitle.trim() && status) {
            saveChanges({ id, todoTitle, status })
        }
    }

    return (
        <li className={styles.singleTask}>
            <form className={styles.form} onSubmit={e => saveChange(e, id)}>
                <input name='todo' type="text" defaultValue={todoTitle}  />
                <SelectStatuses status={status} />
                <div className={styles.btnBox}>
                    <button type='submit' >save</button>
                    <button onClick={(id) => onCancelEdit(id)}>cancel</button>
                </div>
            </form>
        </li >
    )
}
