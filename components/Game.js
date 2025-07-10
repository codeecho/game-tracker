import { useState } from "react";
import {
  Badge,
  Button,
  Container,
  Modal,
  ProgressBar,
  Table,
} from "react-bootstrap";
import { PencilFill, Trash } from "react-bootstrap-icons";
import { useBacklog } from "../pages/BacklogProvider";
import Header from "./Header";
import { useRouter } from "../Router";
import { convertBacklogScoreToString } from "../pages/api/utils.js";

export default function Game() {
  const { selectedGame, showEditGameDetails, goBackToBacklog } = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    name,
    platform,
    releaseYear,
    genres,
    igdbRating,
    progress,
    igdbRatingCount,
    toConsider,
    backlogScore,
    completedDate,
    completed,
    wanted,
    shelved,
    backlog,
    playing,
    played,
    isCoop,
    rating,
    howLongToBeat,
    notes,
    reason,
    value = "??",
    ownedAs,
    abandoned,
  } = selectedGame;

  const { remove } = useBacklog();

  console.log(selectedGame);

  const deleteGame = () => {
    remove(selectedGame);
    goBackToBacklog();
  };

  return (
    <div>
      <Header title={name} showBackLink>
        <PencilFill onClick={() => showEditGameDetails()} />
        <Trash onClick={() => setShowDeleteModal(true)} />
      </Header>
      <Container className="mainContainer">
        <Table striped size="sm">
          <tbody>
            <tr>
              <th>Name</th>
              <td>{name}</td>
            </tr>
            <tr>
              <th>Platform</th>
              <td>{platform}</td>
            </tr>
            <tr>
              <th>Released</th>
              <td>{releaseYear}</td>
            </tr>
            <tr>
              <th>Genre</th>
              <td>{(genres || []).join(", ")}</td>
            </tr>
            <tr>
              <th>Avg *</th>
              <td>
                {igdbRating}&nbsp;&nbsp;&nbsp;&nbsp;
                <Badge>{igdbRatingCount} ratings</Badge>
              </td>
            </tr>
            <tr>
              <th>Coop</th>
              <td>{isCoop ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <th>Own As</th>
              <td>{ownedAs}</td>
            </tr>
            {ownedAs && wanted && (
              <tr>
                <th>Wanted Physical</th>
                <td>{wanted ? "Yes" : "No"}</td>
              </tr>
            )}
            <tr>
              <th>HLtB</th>
              <td>{howLongToBeat || "N/A"}</td>
            </tr>
            <tr>
              <th>Value</th>
              <td>£{value}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{played ? "Played" : "Unplayed"}</td>
            </tr>
            {toConsider && (
              <tr>
                <th>To Consider </th>
                <td>{toConsider ? "Yes" : "No"}</td>
              </tr>
            )}
            {backlog && (
              <tr>
                <th>Backlog </th>
                <td>
                  {backlog ? "Yes" : "No"} (
                  {convertBacklogScoreToString(backlogScore)})
                </td>
              </tr>
            )}
            {playing && (
              <tr>
                <th>Playing</th>
                <td>{playing ? "Yes" : "No"}</td>
              </tr>
            )}
            {shelved && (
              <tr>
                <th>Shelved</th>
                <td>{shelved ? "Yes" : "No"}</td>
              </tr>
            )}
            {abandoned && (
              <tr>
                <th>Abandoned</th>
                <td>{abandoned ? "Yes" : "No"}</td>
              </tr>
            )}
            {completed && (
              <tr>
                <th>Completed</th>
                <td>{completedDate}</td>
              </tr>
            )}
            <tr>
              <th>Progress</th>
              <td>
                {progress ? (
                  <ProgressBar now={progress} label={`${progress}%`} />
                ) : (
                  "N/A"
                )}
              </td>
            </tr>
            <tr>
              <th>Rating</th>
              <td>{rating || "N/A"}</td>
            </tr>
            <tr>
              <th>Notes</th>
              <td>{notes}</td>
            </tr>
          </tbody>
        </Table>
      </Container>
      <Modal
        show={showDeleteModal}
        size="sm"
        onHide={() => setShowDeleteModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {selectedGame.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => deleteGame()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
