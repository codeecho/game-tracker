import axios from 'axios';
import config from '../config';

const igdb = (() => {
  const accessToken = (async () => {
    const url = `https://id.twitch.tv/oauth2/token?client_id=${config.igdb.clientId}&client_secret=${config.igdb.clientSecret}&grant_type=client_credentials`;
    const res = await axios.post(url);
    return res.data.access_token;
  })();

  const search = async (collection, { search, fields, filters } = {}) => {
    const token = await accessToken;
    const url = `/${collection}`;
    const res = await axios.post(url, buildSearchQuery({ search, fields, filters }), {
      headers: {
        Authorization: `Bearer ${token}`,
        'Client-ID': config.igdb.clientId,
      },
    });
    return res.data;
  };

  const buildSearchQuery = ({ search, fields = ['*'], filters } = {}) => {
    let query = `fields ${fields.join(',')};`;
    if (search) query += ` search "${search}";`;
    if (filters) query += ` where ${filters};`;
    return query;
  };

  return {
    search,
  };
})();

export default igdb;
