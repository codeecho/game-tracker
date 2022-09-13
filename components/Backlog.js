import Button from 'react-bootstrap/Button';
import { useBacklog } from '../pages/BacklogProvider';
import Carousel from 'react-bootstrap/Carousel';
import Header from './Header';
import states, { ABANDONED, COMPLETED } from '../constants/states';
import { Badge, Card, Col, Container, Row, Stack } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, CalendarDate, Collection, Joystick, PlusSquare } from 'react-bootstrap-icons';
import { useRouter } from '../Router';
import { stateColours } from '../constants/colours';
import { getPlatform } from '../constants/platforms';

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

                        const games = backlog.games.filter(x => x.status === state);

                        const gamesByPlatform = {};

                        games.forEach(x => {
                            const platform = getPlatform(x.platform);
                            const g = gamesByPlatform[platform] || [];
                            gamesByPlatform[platform] = g.concat(x);
                        });

                        return (
                            <Carousel.Item>
                                <div style={{ display: 'flex', justifyContent: 'center' }} className="mb-2">
                                    <Stack direction='horizontal' gap={1}>
                                        { previousState && <Button variant={'outline-' + stateColours[previousState]} size="sm" onClick={() => setSelectedState(previousState)}><ArrowLeft/> {previousState}</Button> }
                                        <Button variant={'outline-' + stateColours[state]} size="sm">{state} <Badge bg={stateColours[state]}>{games.length}</Badge></Button>
                                        { nextState && <Button variant={'outline-' + stateColours[nextState]} size="sm" onClick={() => setSelectedState(nextState)}>{nextState} <ArrowRight/></Button> }
                                    </Stack>
                                </div>
                                { Object.entries(gamesByPlatform).map(([platform, platformGames]) => {
                                    return <div>
                                        <h6>{platform} <Badge bg={stateColours[state]}>{platformGames.length}</Badge></h6>
                                        { platformGames.map(game => (
                                            <div key={game.id}>
                                                <Card className="text-center mb-1" border={stateColours[state]} onClick={() => showGameDetails(game)}>
                                                    <Card.Body>
                                                        <Card.Title>
                                                            <Row>
                                                                <Col>
                                                                    <Badge style={{float: 'left'}} bg={stateColours[state]}>{game.status === ABANDONED ? game.reason : game.status === COMPLETED ? game.completedDate : game.howLongToBeat}</Badge>
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
                                                                <Col className="card-icon"><Joystick size={20}/><span>{platform}</span></Col>
                                                                <Col className="card-icon" style={{ borderLeft: '1px solid gray', borderRight: '1px solid gray'}}><CalendarDate size={20} /><span>{game.releaseYear}</span></Col>
                                                                <Col className="card-icon"><Collection size={20} /><span>{restrictGameProperty(game.genres[0])}</span></Col>
                                                            </Row>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                        ))}
                                    </div>
                                })}
                                { }
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