import datagraphs from "../../clients/datagraphs";
import { convertBacklogScoreToString } from "./utils.js";

const handler = async (req, res) => {
  const response = await datagraphs.concepts.search({
    dataset: "urn:game-backlog:games",
    pageSize: 1000,
  });
  const games = response.results.map((x) => ({
    ...x,
    id: x.id.split(":").pop() * 1,
  }));
  res.status(200).json(games);
};

export default handler;
