import axios from 'axios';

export const sync = async (state) => {
    const url = `/api/sync`;
    const res = await axios.post(url, state);
    console.log(res);
}