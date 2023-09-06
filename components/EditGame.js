import { useState } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import { useBacklog } from '../pages/BacklogProvider';
import Header from './Header';
import reasons from '../constants/reasons';
import states, { ABANDONED, BACKLOG, COMPLETED } from '../constants/states';
import { useRouter } from '../Router';
import ownershipTypes from '../constants/ownershipTypes.js';

export default function EditGame() {
  const { selectedGame, showGameDetails } = useRouter();

  const { update } = useBacklog();

  const [gameData, setGameData] = useState({
    ...selectedGame,
    date: selectedGame.status === COMPLETED ? selectedGame.completedDate : selectedGame.abandonedDate,
  });

  const { name, status, rating, howLongToBeat, notes, reason, progress, isCoop, date, nextUp, value = 0, ownedAs } = gameData;

  const changeGameData = (prop, value) => {
    setGameData({
      ...gameData,
      [prop]: value,
    });
  };

  const saveChanges = () => {
    const { status, reason, date, nextUp } = gameData;
    const completedDate = status === COMPLETED ? date : undefined;
    let completedYear;
    if (completedDate) {
      if (completedDate.match(/^\d\d\d\d$/)) completedYear = completedDate;
      if (completedDate.match(/^\d\d\/\d\d\d\d$/)) completedYear = completedDate.substring(3);
      if (completedDate.match(/^\d\d\/\d\d\/\d\d$/)) {
        const year = completedDate.substring(6);
        if (year < 50) completedYear = `20${year}`;
        else completedYear = `19${year}`;
      };
      if (!completedYear) throw new Error('Invalid date format');
    }
    const game = {
      ...gameData,
      nextUp: status === BACKLOG ? nextUp : undefined,
      reason: status === ABANDONED ? reason : undefined,
      completedDate,
      completedYear,
      abandonedDate: status === ABANDONED ? date : undefined,
    };
    update(game);
    showGameDetails(game);
  };

  return (
    <div>
      <Header title={name} showBackLink />
      <Container className="mainContainer">
        <Table striped size="sm">
          <tbody>
            <tr>
              <th>Owned As</th>
              <td>
                <Form.Select value={ownedAs} size="sm" onChange={({ target: { value } }) => changeGameData('ownedAs', value)}>
                  <option value=""></option>
                  {ownershipTypes.map((x) => (
                    <option value={x}>{x}</option>
                  ))}
                </Form.Select>
              </td>
            </tr>
            <tr>
              <th>Coop</th>
              <td>
                <Form.Check id="isCoop" checked={isCoop} onChange={({ target: { checked } }) => changeGameData('isCoop', checked)} />
              </td>
            </tr>
            <tr>
              <th>How Long To Beat</th>
              <td>
                <Form.Control type="input" value={howLongToBeat} onChange={({ target: { value } }) => changeGameData('howLongToBeat', value)} />
              </td>
            </tr>
            <tr>
              <th>Value (£)</th>
              <td>
                <Form.Control type="number" value={value} onChange={({ target: { value } }) => changeGameData('value', value)} />
              </td>
            </tr>
            <tr>
              <th>Status</th>
              <td>
                <Form.Select value={status} size="sm" onChange={({ target: { value } }) => changeGameData('status', value)}>
                  {states.map((x) => (
                    <option value={x}>{x}</option>
                  ))}
                </Form.Select>
              </td>
            </tr>
            {status === BACKLOG && (
              <tr>
                <th>Next Up</th>
                <td>
                  <Form.Check id="nextUp" checked={nextUp} onChange={({ target: { checked } }) => changeGameData('nextUp', checked)} />
                </td>
              </tr>
            )}
            {status === ABANDONED && (
              <tr>
                <th>Reason</th>
                <td>
                  <Form.Select value={reason} size="sm" onChange={({ target: { value } }) => changeGameData('reason', value)}>
                    <option value=""></option>
                    {reasons.map((x) => (
                      <option value={x}>{x}</option>
                    ))}
                  </Form.Select>
                </td>
              </tr>
            )}
            {[COMPLETED, ABANDONED].includes(status) && (
              <tr>
                <th>Date</th>
                <td>
                  <Form.Control type="input" value={date} onChange={({ target: { value } }) => changeGameData('date', value)} />
                </td>
              </tr>
            )}
            <tr>
              <th>Rating</th>
              <td>
                <Form.Control type="number" value={rating} onChange={({ target: { value } }) => changeGameData('rating', value)} />
              </td>
            </tr>
            <tr>
              <th>Progress</th>
              <td>
                <Form.Control type="number" value={progress} onChange={({ target: { value } }) => changeGameData('progress', value)} />
              </td>
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
  );
}
