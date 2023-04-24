import React, { useEffect, useReducer } from 'react'

import { todoContext } from './todoContext'
import { todoReducer } from './todoReducer'
import {
    ADD_NEW_ITEM,
    DELETE_ITEM,
    EDIT_ITEM,
    CANCEL_EDIT_ITEM,
    SAVE_CHANGES,
    DELETE_ALL,
    GET_ITEMS_OF_LOCAL_STORAGE,
}
    from './Types'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import swal from 'sweetalert';

import { v4 as uuidv4 } from 'uuid';



const init = {
    todos: []
}

const deleteAlert = (title, text) => swal({
    title: title,
    text: text,
    icon: "warning",
    dangerMode: true,
    buttons: ['cancel', 'yes']
})

const statuses = [
    "due date",
    "important",
    "canceled",
    "postponed",
    "in progress",
    "completed",
]

const localSet = (itemName, itemValue) => localStorage.setItem(itemName, JSON.stringify(itemValue))

const localGet = (itemName) => JSON.parse(localStorage.getItem(itemName))

export const TodoState = ({ children }) => {

    useEffect(() => {
        const items = localGet('todos') || []
        dispatch({ type: GET_ITEMS_OF_LOCAL_STORAGE, payload: items })
    }, []);



    const [state, dispatch] = useReducer(todoReducer, init)

    const notify = (text) => {
        toast(text)
    };

    const addNewTodo = (todo, status) => {
        const todoItem = {
            id: uuidv4(),
            todoTitle: todo,
            editMode: false,
            status
        }
        if (localGet('todos')) {
            const todos = localGet('todos')
            todos.unshift(todoItem)
            localSet('todos', todos)
        } else {
            localSet('todos', [todoItem])
        }
        dispatch({ type: ADD_NEW_ITEM, payload: todoItem })
        notify("New Item Added !")
    }


    const deleteItem = id => {
        deleteAlert('Are you sure?', 'Are you sure that you want to delete this?').then(willDelete => {
            if (willDelete) {
                swal("Deleted!", "Your Item has been deleted!", "success");
                dispatch({ type: DELETE_ITEM, payload: id })
                const todos = localGet('todos').filter(todo => todo.id !== id)
                localSet('todos', todos)
            }
        });
    }



    const deleteAll = () => {
        deleteAlert('Are you sure?', 'Are you sure that you want to delete all?').then(willDelete => {
            if (willDelete) {
                swal("Deleted!", "Your Items has been deleted!", "success");
                dispatch({ type: DELETE_ALL })
                localSet('todos', [])
            }
        });
    }


    const editeItem = id => {
        dispatch({ type: EDIT_ITEM, payload: id })
    }

    const cancelEdite = id => {
        dispatch({ type: CANCEL_EDIT_ITEM, payload: id })
    }

    const saveChanges = newItem => {
        const todos = localGet('todos')
        const editingItemIndex = todos.findIndex(todo => todo.id === newItem.id)
        todos[editingItemIndex] = newItem
        localSet('todos', todos)
        dispatch({ type: SAVE_CHANGES, payload: newItem })
        notify("Item Edited")
    }





    return (
        <todoContext.Provider value={{ state, addNewTodo, deleteItem, cancelEdite, editeItem, saveChanges, deleteAll, localGet, statuses }}>
            {children}
            <ToastContainer />
        </todoContext.Provider>
    )
}
