import { configureStore } from '@reduxjs/toolkit'
import habitReducer from './reducers/habitReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
    reducer: {
        habits: habitReducer,
        users: userReducer

    }
})

export default store