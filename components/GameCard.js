import { Badge, Card, Col, ProgressBar, Row } from "react-bootstrap";
import { CalendarDate, Collection, Joystick } from "react-bootstrap-icons";
import { stateColours } from "../constants/colours";
import { getPlatform } from "../constants/platforms";
import { ABANDONED, COMPLETED } from "../constants/states";
import { useRouter } from "../Router";

export default function GameCard({ game, showStatus, ratingProperty = 'rating' }) {
    const { showGameDetails } = useRouter();

    return (
        <Card className="text-center mb-1" border={stateColours[game.status]} onClick={() => showGameDetails(game)}>
            <Card.Body>
                <Card.Title>
                    <Row>
                        <span className="mb-2">{game.name}</span>
                    </Row>
                    <Row>
                        <Col>
                            <Badge style={{float: 'left'}} bg={stateColours[game.status]}>{showStatus ? game.status : game.status === ABANDONED ? game.reason : game.status === COMPLETED ? game.completedDate : game.howLongToBeat}</Badge>
                        </Col>
                        <Col>
                            <Badge style={{float: 'right'}} bg={stateColours[game.status]}>{game[ratingProperty]}</Badge>
                        </Col>
                    </Row>
                </Card.Title>
                <Card.Text>
                    <Row>
                        { (game.progress || game.status === COMPLETED) && <ProgressBar className="mb-3" now={game.status === COMPLETED ? 100 : game.progress} label={`${game.status === COMPLETED ? '100' : game.progress}%`} /> }
                    </Row>
                    <Row>
                        <Col className="card-icon">{ game.isCoop && <div style={{ paddingLeft: '20%', width: '50%', float: 'left' }}><Joystick size={20}/></div> }<div style={{ paddingRight: game.isCoop ? '20%' : '0px', width: game.isCoop ? '50%' : '100%', float: 'left'}}><Joystick size={20}/></div><span>{getPlatform(game.platform)}</span></Col>
                        <Col className="card-icon" style={{ borderLeft: '1px solid gray', borderRight: '1px solid gray'}}><CalendarDate size={20} /><span>{game.releaseYear}</span></Col>
                        <Col className="card-icon"><Collection size={20} /><span>{restrictGameProperty(game.genres[0])}</span></Col>
                    </Row>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

const restrictGameProperty = property => {
    if(!property || property.length < 11) return property;
    return property.substring(0, 11) + '...';
}