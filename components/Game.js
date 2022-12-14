import { useState } from "react";
import { Badge, Button, Container, Modal, ProgressBar, Table } from "react-bootstrap";
import { PencilFill, Trash } from "react-bootstrap-icons";
import { useBacklog } from "../pages/BacklogProvider";
import Header from "./Header";
import { ABANDONED, COMPLETED } from "../constants/states";
import { useRouter } from "../Router";

export default function Game(){

    const { selectedGame, showEditGameDetails, goBackToBacklog } = useRouter();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { name, status, platform, releaseYear, genres, igdbRating, progress, igdbRatingCount, abandonedDate, completedDate, isCoop, rating, howLongToBeat, notes, reason } = selectedGame;

    const { remove } = useBacklog();

    const deleteGame = () => {
        remove(selectedGame);
        goBackToBacklog();
    }

    return (
        <div>
            <Header title={name} showBackLink>
                <PencilFill onClick={() => showEditGameDetails()} />
                <Trash onClick={() => setShowDeleteModal(true)}/>
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
                            <td>{genres.join(', ')}</td>
                        </tr>
                        <tr>
                            <th>Avg *</th>
                            <td>{igdbRating}&nbsp;&nbsp;&nbsp;&nbsp;<Badge>{igdbRatingCount} ratings</Badge></td>
                        </tr>
                        <tr>
                            <th>Coop</th>
                            <td>{isCoop ? 'Yes' : 'No'}</td>
                        </tr>
                        <tr>
                            <th>HLtB</th>
                            <td>{howLongToBeat || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td>{status}</td>
                        </tr>
                        { status === ABANDONED && <tr>
                            <th>Abandoned</th>
                            <td>{abandonedDate}</td>
                        </tr> }
                        { status === COMPLETED && <tr>
                            <th>Completed</th>
                            <td>{completedDate}</td>
                        </tr> }
                        { status === ABANDONED && <tr>
                            <th>Reason</th>
                            <td>{reason}</td>
                        </tr> }
                        <tr>
                            <th>Progress</th>
                            <td>{progress ? <ProgressBar now={progress} label={`${progress}%`} /> : 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Rating</th>
                            <td>{rating || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Notes</th>
                            <td>{notes}</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
            <Modal show={showDeleteModal} size="sm" onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete {selectedGame.name}?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => deleteGame()}>
                    Confirm
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}