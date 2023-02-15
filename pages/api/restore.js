import datagraphs from '../../clients/datagraphs';

const handler = async (req, res) => {
    const response = await datagraphs.concepts.search({ dataset: 'urn:game-backlog:games', pageSize: 1000 });
    const games = response.results.map(x => ({
        ...x,
        id: x.id.split(':').pop()
    }));
    res.status(200).json(games);
};

export default handler;