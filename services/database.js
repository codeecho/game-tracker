import igdb from '../clients/igdb';

const doQuery = ({ search, filters }) =>
  igdb.search('games', {
    search,
    fields: ['name', 'release_dates.y', 'release_dates.platform.abbreviation', 'release_dates.platform.name', 'release_dates.region', 'genres.name', 'rating', 'rating_count', 'game_modes.name'],
    filters,
  });

export const search = async (search) => doQuery({ search });

export const getById = async (id) => doQuery({ filters: `id = ${id}` });
