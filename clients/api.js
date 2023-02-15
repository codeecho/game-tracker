import axios from 'axios';

export const backup = async (state) => {
    const url = `/api/backup`;
    await axios.post(url, state);
}

export const restore = async () => {
    const url = `/api/restore`;
    const { data: games } = await axios.get(url);
    if(!games.every(x => x.id && x.name)) throw new Error('Something went wrong');
    return games;
}