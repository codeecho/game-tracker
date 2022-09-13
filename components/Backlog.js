import Button from 'react-bootstrap/Button';
import { useBacklog } from '../pages/BacklogProvider';
import Carousel from 'react-bootstrap/Carousel';
import Header from './Header';
import states, { ABANDONED } from '../constants/states';
import { Badge, Card, Col, Container, Row, Stack } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, CalendarDate, Collection, Joystick, PlusSquare } from 'react-bootstrap-icons';
import { useRouter } from '../Router';
import { stateColours } from '../constants/colours';

export default function Backlog() {
    const { backlog } = useBacklog();

    const { selectedState, setSelectedState, showGameDetails, showAddGame } = useRouter();

    const activeStateIndex = states.indexOf(selectedState);

    return (
        <div>
            <Header title={selectedState}>
                {/* <Search/> */}
                <PlusSquare onClick={() => showAddGame()}/>
            </Header>
            <Container className='mainContainer'>
                <Carousel className="mt-1" controls={false} interval={null} wrap={false} indicators={false} activeIndex={activeStateIndex} onSelect={index => setSelectedState(states[index])}>
                    {states.map((state, index) => {

                        const previousState = index > 0 ? states[index - 1] : null;
                        const nextState = index < states.length - 1 ? states[index + 1] : null;

                        const games = backlog.games.filter(x => x.status === state)

                        return (
                            <Carousel.Item>
                                <div style={{ display: 'flex', justifyContent: 'center' }} className="mb-2">
                                    <Stack direction='horizontal' gap={1}>
                                        { previousState && <Button variant={'outline-' + stateColours[previousState]} size="sm" onClick={() => setSelectedState(previousState)}><ArrowLeft/> {previousState}</Button> }
                                        <Button variant={'outline-' + stateColours[state]} size="sm">{state} <Badge bg={stateColours[state]}>{games.length}</Badge></Button>
                                        { nextState && <Button variant={'outline-' + stateColours[nextState]} size="sm" onClick={() => setSelectedState(nextState)}>{nextState} <ArrowRight/></Button> }
                                    </Stack>
                                </div>
                                { games.map(game => (
                                    <div key={game.id}>
                                        <Card className="text-center mb-1" border={stateColours[state]} onClick={() => showGameDetails(game)}>
                                            <Card.Body>
                                                <Card.Title>
                                                    <Row>
                                                        <Col>
                                                            <Badge style={{float: 'left'}} bg={stateColours[state]}>{game.status === ABANDONED ? game.reason : game.howLongToBeat}</Badge>
                                                        </Col>
                                                        <Col xs={7}>
                                                            <span>{game.name}</span>
                                                        </Col>
                                                        <Col>
                                                            <Badge style={{float: 'right'}} bg={stateColours[state]}>{game.rating}</Badge>
                                                        </Col>
                                                    </Row>
                                                </Card.Title>
                                                <Card.Text>
                                                    <Row>
                                                        <Col className="card-icon"><Joystick size={20}/><span>{game.platform}</span></Col>
                                                        <Col className="card-icon" style={{ borderLeft: '1px solid gray', borderRight: '1px solid gray'}}><CalendarDate size={20} /><span>{game.releaseYear}</span></Col>
                                                        <Col className="card-icon"><Collection size={20} /><span>{restrictGameProperty(game.genres[0])}</span></Col>
                                                    </Row>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
                            </Carousel.Item>
                        );
                    })}
                </Carousel>
            </Container>
        </div>
    )

    
}

const restrictGameProperty = property => {
    if(property.length < 11) return property;
    return property.substring(0, 11) + '...';
}