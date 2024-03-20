import { useState } from 'react'
import loginService from '../services/login'
import habitService from '../services/habits'
import { TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const Signup = ({
    username,
    password,
    name,
    email,
    handleUsernameChange,
    handlePasswordChange,
    handleNameChange,
    handleEmailChange,
    handleSubmit
}) => {

    return (
        <form onSubmit={handleSubmit}>
            <h2>Fill in the details to signup</h2>

            username:
            <input
                value={username}
                onChange={handleUsernameChange} />
            <br />
            password:
            <input
                value={password}
                type='password'
                onChange={handlePasswordChange} />
            <br />
            name:
            <input
                value={name}
                onChange={handleNameChange} />
            <br />
            email:
            <input
                value={email}
                onChange={handleEmailChange} />
            <br />
            <Button variant="contained" color="primary" type="submit">
              signup
            </Button>
        </form>
    )
}

const SignupForm = () => {
    const [newusername, setUsername] = useState('')
    const [newpassword, setPassword] = useState('')
    const [newname, setName] = useState('')
    const [newemail, setEmail] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    
    const addUser = (userObject) => {
        dispatch(createUser(userObject))
        setUsername('')
        setPassword('')
        setName('')
        setEmail('')
        navigate('/login')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        addUser({
            username: newusername,
            password: newpassword,
            name: newname,
            email: newemail
        })
    }

    return (
        <Signup 
          username={newusername}
          password={newpassword}
          name={newname}
          email={newemail}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleNameChange={({ target }) => setName(target.value)}
          handleEmailChange={({ target }) => setEmail(target.value)}
          handleSubmit={handleSubmit}
        />
    )
}

export default SignupForm