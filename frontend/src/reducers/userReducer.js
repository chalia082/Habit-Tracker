import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
    name: 'users',
    initialState: { list: [], currentUser: null },
    reducers: {
        setUsers: (state, action) => {
            state.list = action.payload
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        appendUser: (state, action) => {
            state.list.push(action.payload)
        }
    }
})

export const { setUsers, setCurrentUser, appendUser } = userSlice.actions

export const getUsers = () => {
    return async dispatch => {
        const users = await userService.getUsers()
        dispatch(setUsers(users))
    }
}

export const createUser = (newUser) => {
    return async dispatch => {
        const user = await userService.addUser(newUser)
        dispatch(appendUser(user))
    }
}

export default userSlice.reducer