import { useState } from 'react'
import loginService from '../services/login'
import habitService from '../services/habits'
import { TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { setCurrentUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const Login = ({ 
    username, 
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleSubmit
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <h2>log in to the application</h2>
        
            <div>
                <TextField 
                  label="username" 
                  value={username}
                  onChange={handleUsernameChange} 
                />
                {/* username
                <input  
                  type='text' 
                  value={username} 
                  placeholder='username' 
                /> */}
            </div>
            <div>
                <TextField 
                  label="password" 
                  type='password'
                  value={password}
                  onChange={handlePasswordChange} 
                />
                {/* password
                <input 
                  type='password' 
                  value={password} 
                  placeholder='password' 
                /> */}
            </div>
            <Button variant="contained" color="primary" type="submit">
              login
          </Button>
        </form>
        
    )
}

const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password
            })
            
            window.localStorage.setItem(
                'loggedHabitAppUser', JSON.stringify(user)
            )

            habitService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('') 
            dispatch(setCurrentUser(user)) 
            console.log('reaching here');  
            navigate('/habits')  
        } catch (exception) {
            console.error('error', exception.message)
        }
    }

    return (
        <Login 
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
    )
}

export default LoginForm