import datagraphs from '../../clients/datagraphs';

const handler = async (req, res) => {
    const state = req.body;
    const { results: existingGames } = await datagraphs.concepts.search({ dataset: 'urn:game-backlog:games', pageSize: 1000, fields: ['id'] });
    const games = state.games.map(x => {
        const res = {};
        Object.entries(x).forEach(([key, value]) => {
            if (value !== null) res[key] = value;
        });
        res.id = `urn:game-backlog:Game:${x.id}`;
        return res;
    });
    // console.log(games);
    await datagraphs.concepts.upsertBulk('urn:game-backlog:games', games);
    const toDelete = existingGames.filter(x => !games.some(y => y.id === x.id));
    console.log('Deleting', toDelete);
    for (const game of toDelete) {
        await datagraphs.concepts.delete(game.id);
    }
    res.status(200).send();
};

export default handler;