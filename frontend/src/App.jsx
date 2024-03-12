import { useEffect, useState } from "react";
import habitService from './services/habits'
import HabitList from "./controllers/HabitList"
import About from "./controllers/About"
import LoginForm from './controllers/LoginForm'
import { initialHabits } from "./reducers/habitReducer"; 
import { getUsers } from './reducers/userReducer'
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Routes, Route, Link, Navigate
} from 'react-router-dom'

import { TextField, Button } from '@mui/material'

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`

const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`


const App = () => {
  // const [user, setUser] = useState(null)
  const user = useSelector(state => state.users.currentUser)
  console.log('urre aa rea bai?');
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialHabits())
  }, [])

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedHabitAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // setUser(user)
      habitService.setToken(user.token)
    }
  }, [])


  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedHabitAppUser')
    // setUser(null)
  }

  const padding = {
    padding: 5
  }

  return (
    <Page>
      <Navigation>
        <Link style={padding} to='/'>Home</Link>
        <Link style={padding} to='/habits'>Habits</Link>
        {user
          ? <em>{user.name} logged in</em>
          : <Link style={padding} to='/login' >Login</Link>
        }
        {user && <Button style={padding} size="small" color="secondary" variant="contained" onClick={handleLogout} >logout</Button>}
      </Navigation>

      <Routes>
        <Route path="/" element={ <About /> } />
        <Route path="/habits" element={ user ? <HabitList /> : <Navigate replace to='/login' /> } />
        <Route path="/login" element={ <LoginForm /> } />
      </Routes>
      

      <Footer>
        <em>Habit Tracker</em>
      </Footer>
    </Page>
    
    
  )
}

export default App