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

const create = async newObject => {
    const config = {
        headers: {Authorization: token},
    }

    const request = await axios.post(baseUrl, newObject, config)
    return request.data
}

export default { getAll, setToken, create }