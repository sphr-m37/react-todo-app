import React, { useContext, useState } from 'react'

import { toast } from 'react-toastify'

import styles from '.././Style.module.css'

import { todoContext } from '../context/todoContext'
import SelectStatuses from './SelectStatuses'

export const Form = () => {

    const [text, setText] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const { addNewTodo } = useContext(todoContext)

    const onchangeHandle = e => {
        setText(e.target.value)
        text.trim() && setIsDisabled(false)
    }

    const submitHandle = e => {
        e.preventDefault()
        const status = e.target.status.value
        const todo = text.trim()
        if (todo && status) {
            addNewTodo(todo, status)
            setText('')
        } else {
            toast("enter vali text")
            setIsDisabled(true)
            setTimeout(() => {
                setIsDisabled(false)
            }, 3000)
        }


    }
    return (
        <form onSubmit={submitHandle} className={styles.form}>
                <input value={text} onChange={onchangeHandle} type="text" placeholder='enter new task title' className={styles.formInput} />
                <SelectStatuses />
            <button className={styles.saveBtn} disabled={isDisabled} type='submit' style={{ opacity: isDisabled ? '0.5' : '1' }}>save</button>
        </form>
    )
}
