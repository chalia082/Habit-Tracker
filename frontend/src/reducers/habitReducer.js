import { createSlice } from "@reduxjs/toolkit";
import habitService from '../services/habits'

const habitSlice = createSlice({
    name: 'habits',
    initialState: [],
    reducers: {
        setHabits(state, action) {
            return action.payload
        }
    }
})

export const { setHabits } = habitSlice.actions

export const initialHabits = () => {
    return async dispatch => {
        const habits = await habitService.getAll()
        dispatch(setHabits(habits))
    }
}

export default habitSlice.reducer

