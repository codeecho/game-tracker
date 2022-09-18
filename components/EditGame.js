import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { useBacklog } from "../pages/BacklogProvider";
import Header from "./Header";
import reasons from "../constants/reasons";
import states, { ABANDONED, COMPLETED } from "../constants/states";
import { useRouter } from "../Router";

export default function EditGame(){

    const { selectedGame, showGameDetails } = useRouter();

    const { update } = useBacklog();

    const [gameData, setGameData] = useState({
        ...selectedGame,
        date: selectedGame.status === COMPLETED ? selectedGame.completedDate : selectedGame.abandonedDate
    });

    const { name, status, rating, howLongToBeat, notes, reason, progress, isCoop, date } = gameData;

    const changeGameData = (prop, value) => {
        setGameData({
            ...gameData,
            [prop]: value
        });
    };

    const saveChanges = () => {
        const { status, reason, date } = gameData;
        const game = {
            ...gameData,
            reason: status === ABANDONED ? reason : undefined,
            completedDate: status === COMPLETED ? date : undefined,
            abandonedDate: status === ABANDONED ? date : undefined
        }
        update(game);
        showGameDetails(game);
    }

    return (
        <div>
            <Header title={name} showBackLink />
            <Container className="mainContainer">
                <Table striped size="sm">
                    <tbody>
                        <tr>
                            <th>Coop</th>
                            <td>
                                <Form.Check 
                                    id="isCoop"
                                    checked={isCoop}
                                    onChange={({ target: { checked }}) => changeGameData('isCoop', checked)}
                                />
                            </td>
                        </tr>
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
                                    <option value=""></option>
                                    {reasons.map(x => <option value={x}>{x}</option>)}
                                </Form.Select>
                            </td>
                        </tr> }
                        { [COMPLETED, ABANDONED].includes(status) && <tr>
                            <th>Date</th>
                            <td>
                                <Form.Control type="input" value={ date } onChange={({ target: { value } }) => changeGameData('date', value)} />
                            </td>
                        </tr> }
                        <tr>
                            <th>Rating</th>
                            <td><Form.Control type="number" value={rating} onChange={({ target: { value } }) => changeGameData('rating', value)} /></td>
                        </tr>
                        <tr>
                            <th>Progress</th>
                            <td><Form.Control type="number" value={progress} onChange={({ target: { value } }) => changeGameData('progress', value)} /></td>
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