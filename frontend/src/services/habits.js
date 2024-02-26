import axios from 'axios'
const baseUrl = '/api/habits'

const getAll = async () => {
    const request = await axios.get(baseUrl)
    const habits = request.data
    console.log(habits || 'axios cannot access');
    return habits
}

export default { getAll }