import React, { useContext, useState, } from 'react'

import styles from '.././Style.module.css'

import { todoContext } from '../context/todoContext'

import { SingleTask } from './SingleTask'
import { EditTask } from './EditTask'
import { FilterBtn } from './FilterBtn'


export const TasksList = () => {

    const { state: { todos },
        deleteAll, statuses } =
        useContext(todoContext)

    const [filter, setFilter] = useState('all')

    return (
        <>
            <select className={styles.filterBtns}>
                <FilterBtn name={'all'} setFilter={setFilter} filter={filter} />
                {statuses.map(status => <FilterBtn name={status} setFilter={setFilter} filter={filter} />)}
            </select>
            <ul className={styles.taskWrapper}>
                {todos.map((todo) => {
                    if (todo.status === filter || filter === 'all') {
                        return todo.editMode ? <EditTask todo={todo} key={todo.id} /> : <SingleTask todo={todo} key={todo.id} />
                    }
                })}
                {todos.length === 0 && <p>add task to show here</p>}
            </ul>
            {todos.length > 0 && <button onClick={deleteAll} className={styles.deleteAllBtn}>delete all</button>}
        </>
    )
}
