const axios = require('axios');

export async function createNewBuddy() {

    try {
        const response = await axios.get('/add-persona');
        console.log('response  ', response)
        return response.data;
    } catch (error) {
        return [];
    }

}