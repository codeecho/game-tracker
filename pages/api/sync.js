import datagraphs from '../../clients/datagraphs';

const handler = async (req, res) => {
    const state = req.body;
    const games = state.games.map(x => {
        const res = {};
        Object.entries(x).forEach(([key, value]) => {
            if(value !== null) res[key] = value;
        });
        res.id = `urn:game-backlog:Game:${x.id}`;
        return res;
    });
    console.log(games);
    await datagraphs.concepts.upsertBulk('urn:game-backlog:games', games);
    res.status(200).send();
};

export default handler;