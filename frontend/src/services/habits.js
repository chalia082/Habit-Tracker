import axios from 'axios'
const baseUrl = '/api/habits'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const request = await axios.get(baseUrl)
    const habits = request.data
    return habits
}

export default { getAll, setToken }