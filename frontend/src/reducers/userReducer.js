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
        }
    }
})

export const { setUsers, setCurrentUser } = userSlice.actions

export const getUsers = () => {
    return async dispatch => {
        const users = await userService.getUsers()
        dispatch(setUsers(users))
    }
}

export default userSlice.reducer