import axios from "axios"

const getAllFlowers = async () =>{
    try {
        const res = await axios.get('/data.json')
        return res.data.FlowersChocolate
    } catch (error) {
        throw error;
    }
}


export default getAllFlowers