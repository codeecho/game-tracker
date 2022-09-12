import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { useBacklog } from "../BacklogProvider";
import Header from "../components/Header";
import reasons from "../constants/reasons";
import states, { ABANDONED } from "../constants/states";
import { useRouter } from "../Router";

export default function EditGame(){

    const { selectedGame, showGameDetails } = useRouter();

    const { update } = useBacklog();

    const [gameData, setGameData] = useState(selectedGame);

    const { name, status, rating, howLongToBeat, notes, reason } = gameData;

    const changeGameData = (prop, value) => {
        setGameData({
            ...gameData,
            [prop]: value
        });
    };

    const saveChanges = () => {
        update(gameData);
        showGameDetails(gameData);
    }

    return (
        <div>
            <Header title={name} showBackLink />
            <Container className="mainContainer">
                <Table striped size="sm">
                    <tbody>
                        <tr>
                            <th>How Long To Beat</th>
                            <td><Form.Control type="input" value={howLongToBeat} onChange={({ target: { value } }) => changeGameData('howLongToBeat', value)} /></td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td>
                                <Form.Select value={status} size="sm" onChange={({ target : { value }}) => changeGameData('status', value)}>
                                    {states.map(x => <option value={x}>{x}</option>)}
                                </Form.Select>
                            </td>
                        </tr>
                        { status === ABANDONED && <tr>
                            <th>Reason</th>
                            <td>
                                <Form.Select value={reason} size="sm" onChange={({ target : { value }}) => changeGameData('reason', value)}>
                                    {reasons.map(x => <option value={x}>{x}</option>)}
                                </Form.Select>
                            </td>
                        </tr> }
                        <tr>
                            <th>Rating</th>
                            <td><Form.Control type="number" value={rating} onChange={({ target: { value } }) => changeGameData('rating', value)} /></td>
                        </tr>
                        <tr>
                            <th>Notes</th>
                            <td>
                                <Form.Control as="textarea" rows={3} value={notes} onChange={({ target: { value } }) => changeGameData('notes', value)} />
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <div className="d-grid">
                    <Button onClick={() => saveChanges()}>Save Changes</Button>
                </div>
            </Container>
        </div>
    )
}