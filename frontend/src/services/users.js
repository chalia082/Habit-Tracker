import axios from 'axios'
const baseUrl = '/api/users'

const getUsers = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const addUser = async newUser => {
    const request = await axios.post(baseUrl, newUser)
    return request.data
}


export default { getUsers, addUser }