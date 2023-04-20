import React from 'react'
import {
    ADD_NEW_ITEM,
    CANCEL_EDIT_ITEM,
    DELETE_ALL,
    DELETE_ITEM,
    EDIT_ITEM,
    SAVE_CHANGES,
    FILTER_BY_STATUS,
    GET_ITEMS_OF_LOCAL_STORAGE
}
    from './Types'

export const todoReducer = (state, action) => {
    const data = action.payload
    const todoList = state.todos
    switch (action.type) {
        case GET_ITEMS_OF_LOCAL_STORAGE:
            return { ...state, todos: data }

        case ADD_NEW_ITEM:
            return { ...state, todos: [data, ...todoList] }

        case DELETE_ITEM:
            return { ...state, todos: [...todoList.filter(todo => todo.id !== data)] }

        case DELETE_ALL:
            return { ...state, todos: [] }

        case EDIT_ITEM:
            todoList.forEach(todo => todo.editMode = false);
            const itemIndex = todoList.findIndex(todo => todo.id === data)
            todoList[itemIndex].editMode = true
            return { ...state, todos: todoList }

        case CANCEL_EDIT_ITEM:
            todoList.forEach(todo => todo.editMode = false)
            return { ...state, todos: [...todoList] }

        case SAVE_CHANGES:
            const editingItemIndex = todoList.findIndex(todo => todo.id === data.id)
            todoList[editingItemIndex] = { ...todoList[editingItemIndex], todoTitle: data.todoTitle, status: data.status, editMode: false }
            return { ...state, todos: todoList }
        default:
            return state
    }
}
