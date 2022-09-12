import igdb from '../clients/igdb';

export const search = async (searchString) => igdb.search('games', {
    search: searchString,
    fields: [
        'name',
        'release_dates.y',
        'release_dates.platform.abbreviation',
        'release_dates.platform.name',
        'release_dates.region',
        'genres.name',
        'rating',
        'rating_count',
        'game_modes.name'
    ]
});