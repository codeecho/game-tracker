import datagraphs from '../../clients/datagraphs';

const handler = async (req, res) => {
    const state = req.body;
    await datagraphs.concepts.upsertBulk('urn:game-backlog:games', state.games.map(x => ({ ...x, id: `urn:game-backlog:Game:${x.id}`})));
    res.status(200).send();
};

export default handler;