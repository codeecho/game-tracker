import Button from 'react-bootstrap/Button';
import { useBacklog } from '../pages/BacklogProvider';
import Carousel from 'react-bootstrap/Carousel';
import Header from './Header';
import states, { ABANDONED, BACKLOG, COMPLETED } from '../constants/states';
import { Badge, Card, Col, Container, Dropdown, DropdownButton, Row, Stack } from 'react-bootstrap';
import { ArrowDownUp, ArrowLeft, ArrowRight, CalendarDate, Collection, Joystick, Justify, LayoutThreeColumns, MenuUp, PlusSquare, Search } from 'react-bootstrap-icons';
import { useRouter } from '../Router';
import { stateColours } from '../constants/colours';
import { getPlatform } from '../constants/platforms';
import GameCard from './GameCard';

export default function Backlog() {
  const { backlog, sync } = useBacklog();

  const { selectedState, setSelectedState, showAddGame, showSearch } = useRouter();

  const activeStateIndex = states.indexOf(selectedState);

  return (
    <div>
      <Header title={selectedState}>
        <ArrowDownUp onClick={() => sync()} />
        <Search onClick={() => showSearch()} />
        <PlusSquare onClick={() => showAddGame()} />
      </Header>
      <Container className="mainContainer">
        <DropdownButton drop="up" title={<Justify />} style={{ position: 'fixed', bottom: '10px', right: '10px', zIndex: 9999 }}>
          {states.map((state, index) => (
            <Dropdown.Item key={index} onClick={() => setSelectedState(state)}>
              {state}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <Carousel className="mt-1" controls={false} interval={null} wrap={false} indicators={false} activeIndex={activeStateIndex} onSelect={(index) => setSelectedState(states[index])}>
          {states.map((state, index) => {
            const previousState = index > 0 ? states[index - 1] : null;
            const nextState = index < states.length - 1 ? states[index + 1] : null;

            const games = backlog.games.filter((x) => x.status === state);

            const gamesByPlatform = {};

            const nextUpGames = games.filter((x) => x.nextUp);

            const otherGames = games.filter((x) => !x.nextUp);

            otherGames.forEach((x) => {
              const platform = getPlatform(x.platform);
              const g = gamesByPlatform[platform] || [];
              gamesByPlatform[platform] = g.concat(x);
            });

            return (
              <Carousel.Item>
                <div style={{ display: 'flex', justifyContent: 'center' }} className="mb-2">
                  <Stack direction="horizontal" gap={1}>
                    {previousState && (
                      <Button variant={'outline-' + stateColours[previousState]} size="sm" onClick={() => setSelectedState(previousState)}>
                        <ArrowLeft /> {previousState}
                      </Button>
                    )}
                    <Button variant={'outline-' + stateColours[state]} size="sm">
                      {state} <Badge bg={stateColours[state]}>{games.length}</Badge>
                    </Button>
                    {nextState && (
                      <Button variant={'outline-' + stateColours[nextState]} size="sm" onClick={() => setSelectedState(nextState)}>
                        {nextState} <ArrowRight />
                      </Button>
                    )}
                  </Stack>
                </div>
                {state === BACKLOG && nextUpGames.length > 0 && (
                  <div>
                    <h6>
                      Next Up <Badge bg={stateColours[state]}>{nextUpGames.length}</Badge>
                    </h6>
                    {nextUpGames.map((game) => (
                      <GameCard key={game.id} game={game} />
                    ))}
                  </div>
                )}
                {state === BACKLOG && otherGames.length > 0 && (
                  <div>
                    <h6>
                      Backlog <Badge bg={stateColours[state]}>{otherGames.length}</Badge>
                    </h6>
                    {otherGames.map((game) => (
                      <GameCard key={game.id} game={game} />
                    ))}
                  </div>
                )}
                {state !== BACKLOG &&
                  Object.entries(gamesByPlatform).map(([platform, platformGames]) => {
                    return (
                      <div>
                        <h6>
                          {platform} <Badge bg={stateColours[state]}>{platformGames.length}</Badge>
                        </h6>
                        {platformGames.map((game) => (
                          <GameCard key={game.id} game={game} />
                        ))}
                      </div>
                    );
                  })}
                {}
              </Carousel.Item>
            );
          })}
        </Carousel>
      </Container>
    </div>
  );
}
