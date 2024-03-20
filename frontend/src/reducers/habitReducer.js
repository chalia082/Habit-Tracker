import { createSlice } from "@reduxjs/toolkit";
import habitService from '../services/habits'

const habitSlice = createSlice({
    name: 'habits',
    initialState: [],
    reducers: {
        setHabits(state, action) {
            return action.payload
        },
        appendHabit(state, action) {
            state.push(action.payload)
        }
    }
})

export const { setHabits, appendHabit } = habitSlice.actions

export const initialHabits = () => {
    return async dispatch => {
        const habits = await habitService.getAll()
        dispatch(setHabits(habits))
    }
}

export const createHabit = (newHabit) => {
    return async dispatch => {
        const habit = await habitService.create(newHabit)
        dispatch(appendHabit(habit ))
    }
}

export default habitSlice.reducer

