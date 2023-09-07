import { useState } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import { useBacklog } from '../pages/BacklogProvider';
import Header from './Header';
import states from '../constants/states';
import { useRouter } from '../Router';
import ownershipTypes from '../constants/ownershipTypes.js';

export default function EditGame() {
  const { selectedGame, showGameDetails } = useRouter();

  const { update } = useBacklog();

  const [gameData, setGameData] = useState({
    ...selectedGame,
    date: selectedGame.completed ? selectedGame.completedDate : selectedGame.abandonedDate,
  });

  const { name, rating, howLongToBeat, notes, reason, progress, isCoop, date, value = 0, ownedAs, backlog, completed, played, toConsider, shelved, playing, backlogScore, wishListScore } = gameData;

  const changeGameData = (prop, value) => {
    setGameData({
      ...gameData,
      [prop]: value,
    });
  };

  const saveChanges = () => {
    const { date, completed, played, shelved, toConsider, backlog } = gameData;
    const completedDate = completed ? date : undefined;
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
      completedDate,
      completedYear,
      toConsider: completed || shelved || playing || backlog ? false : toConsider,
      shelved: completed ? false : shelved,
      played: completed || shelved || playing ? true : played,
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
              <th>Own As</th>
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
              <th>To Consider</th>
              <td>
                <Form.Check id="toConsider" checked={toConsider} onChange={({ target: { checked } }) => changeGameData('toConsider', checked)} />
              </td>
            </tr>
            <tr>
              <th>Backlog</th>
              <td>
                <Form.Check id="backlog" checked={backlog} onChange={({ target: { checked } }) => changeGameData('backlog', checked)} />
              </td>
            </tr>
            {backlog && <tr>
              <th>Backlog Score</th>
              <td>
                <Form.Control type="input" value={backlogScore} onChange={({ target: { value } }) => changeGameData('backlogScore', value)} />
              </td>
            </tr>}
            <tr>
              <th>Played</th>
              <td>
                <Form.Check id="played" checked={played} onChange={({ target: { checked } }) => changeGameData('played', checked)} />
              </td>
            </tr>
            <tr>
              <th>Playing</th>
              <td>
                <Form.Check id="playing" checked={playing} onChange={({ target: { checked } }) => changeGameData('playing', checked)} />
              </td>
            </tr>
            <tr>
              <th>Shelved</th>
              <td>
                <Form.Check id="shelved" checked={shelved} onChange={({ target: { checked } }) => changeGameData('shelved', checked)} />
              </td>
            </tr>
            <tr>
              <th>Completed</th>
              <td>
                <Form.Check id="completed" checked={completed} onChange={({ target: { checked } }) => changeGameData('completed', checked)} />
              </td>
            </tr>
            {completed && (
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
