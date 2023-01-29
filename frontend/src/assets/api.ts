const axios = require('axios');

export async function getAllUsers() {

    try {
        const response = await axios.get('/api/users');
        console.log('response  ', response)
        return response.data;
    } catch (error) {
        return [];
    }

}