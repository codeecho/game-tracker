import { useState } from "react";
import { Badge, Button, Container, Modal, Table } from "react-bootstrap";
import { PencilFill, Trash } from "react-bootstrap-icons";
import { useBacklog } from "../BacklogProvider";
import Header from "../components/Header";
import { ABANDONED } from "../constants/states";
import { useRouter } from "../Router";

export default function Game(){

    const { selectedGame, showEditGameDetails, goBackToBacklog } = useRouter();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { name, status, platform, releaseYear, genres, igdbRating, igdbRatingCount, isCoop, rating, howLongToBeat, notes, reason } = selectedGame;

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
                            <td>{igdbRating}{'   '}<Badge>{igdbRatingCount} ratings</Badge></td>
                        </tr>
                        <tr>
                            <th>Coop</th>
                            <td>{isCoop ? 'Yes' : 'No'}</td>
                        </tr>
                        <tr>
                            <th>HLtB</th>
                            <td>{howLongToBeat}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td>{status}</td>
                        </tr>
                        { status === ABANDONED && <tr>
                            <th>Reason</th>
                            <td>{reason}</td>
                        </tr> }
                        <tr>
                            <th>Rating</th>
                            <td>{rating}</td>
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