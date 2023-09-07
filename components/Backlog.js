import Button from 'react-bootstrap/Button';
import { useBacklog } from '../pages/BacklogProvider';
import Carousel from 'react-bootstrap/Carousel';
import Header from './Header';
import states, { BACKLOG, COMPLETED, PLAYED, isInState } from '../constants/states';
import { Badge, Card, Col, Container, Dropdown, DropdownButton, Row, Stack } from 'react-bootstrap';
import { ArrowDownCircleFill, Code, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ArrowUpCircle, ArrowUpCircleFill, CalendarDate, Collection, Joystick, Justify, LayoutThreeColumns, MenuUp, PlusSquare, Search, SortUp, DiscFill, XCircle, XCircleFill, Filter, CheckSquareFill } from 'react-bootstrap-icons';
import { useRouter } from '../Router';
import { stateColours } from '../constants/colours';
import GameCard from './GameCard';
import { useState } from 'react';
import ownershipTypes from '../constants/ownershipTypes.js';

const sortOptions = [{
  label: 'Platform',
  property: 'platform',
  direction: 'asc',
  grouped: true
}, {
  label: 'Release Year',
  property: 'releaseYear',
  direction: 'asc',
  grouped: true
}, {
  label: 'Progress',
  property: 'progress',
  direction: 'desc',
  grouped: false
}, {
  label: 'Completed Date',
  property: 'completedDate',
  direction: 'desc',
  grouped: false
}, {
  label: 'Completed Year',
  property: 'completedYear',
  direction: 'desc',
  grouped: true
}, {
  label: 'Rating',
  property: 'rating',
  direction: 'desc',
  grouped: false
}, {
  label: 'IGDB Rating',
  property: 'igdbRating',
  direction: 'desc',
  grouped: false
}, {
  label: 'Score',
  property: 'backlogScore',
  direction: 'desc',
  grouped: false,
  status: BACKLOG
}];

const defaultSortByState = {
  [COMPLETED]: 'completedYear',
  [PLAYED]: 'rating',
  [BACKLOG]: 'backlogScore',
};

const boolFilters = [{
  label: 'Playing',
  on: false,
  filter: (x) => x.playing
}, {
  label: 'Completed',
  on: false,
  filter: (x) => x.completed
}, {
  label: 'Unfinished',
  on: true,
  filter: (x) => !x.playing && !x.completed && !x.shelved && !x.abandoned
}, {
  label: 'Shelved',
  on: true,
  filter: (x) => x.shelved
}, {
  label: 'Abandoned',
  on: true,
  filter: (x) => x.abandoned
}]

export default function Backlog() {
  const [selectedSort, setSort] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedOwnedAs, setSelectedOwnedAs] = useState(null);
  const [selectedBoolFilters, setSelectedBoolFilters] = useState(boolFilters);

  const { backlog, backup, restore } = useBacklog();

  const { selectedState, setSelectedState, showAddGame, showSearch } = useRouter();

  const activeStateIndex = states.indexOf(selectedState);

  const platforms = [...new Set(backlog.games.filter(x => isInState(x, selectedState)).map(x => x.platform))];

  const sort = selectedSort && (!selectedSort.status || selectedSort.status === selectedState) ? selectedSort : sortOptions.find(x => x.property === defaultSortByState[selectedState]) || sortOptions[0];

  return (
    <div>
      <Header title={selectedState}>
        <ArrowDownCircleFill onClick={() => restore()} />
        <ArrowUpCircleFill onClick={() => backup()} />
        {/* <Search onClick={() => showSearch()} /> */}
        <PlusSquare onClick={() => showAddGame()} />
      </Header>
      <Container className="mainContainer">
        <DropdownButton drop="up" title={<Code />} style={{ position: 'fixed', bottom: '10px', right: '10px', zIndex: 9998 }}>
          {states.map((state, index) => (
            <Dropdown.Item key={index} style={{ zIndex: 9999 }} onClick={() => setSelectedState(state)}>
              {state}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton drop="up" title={<SortUp />} style={{ position: 'fixed', bottom: '60px', right: '10px', zIndex: 9998 }}>
          {sortOptions.filter(x => !x.status || x.status === selectedState).map(({ label, property, direction, grouped }, index) => (
            <Dropdown.Item key={index} style={{ zIndex: 9999 }} onClick={() => { setSort({ label, property, direction: sort.property === property ? getOppositeSortDirection(sort.direction) : direction, grouped }) }}>
              {getSortIcon(sort.property === property && sort.direction == direction ? getOppositeSortDirection(direction) : direction)} {label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton drop="up" title={<Joystick />} style={{ position: 'fixed', bottom: '110px', right: '10px', zIndex: 9998 }}>
          <Dropdown.Item key="any" onClick={() => setSelectedPlatform(null)} style={{ zIndex: 9999 }}>
            Any
          </Dropdown.Item>
          {platforms.map((platform, index) => (
            <Dropdown.Item key={index} onClick={() => setSelectedPlatform(platform)} style={{ zIndex: 9999 }}>
              {platform}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton drop="up" title={<DiscFill />} style={{ position: 'fixed', bottom: '160px', right: '10px', zIndex: 9998 }}>
          <Dropdown.Item key="any" onClick={() => setSelectedOwnedAs(null)} style={{ zIndex: 9999 }}>
            Any
          </Dropdown.Item>
          {ownershipTypes.map((type, index) => (
            <Dropdown.Item key={index} onClick={() => setSelectedOwnedAs(type)} style={{ zIndex: 9999 }}>
              {type}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        {selectedState === PLAYED && <DropdownButton drop="up" title={<Filter />} style={{ position: 'fixed', bottom: '10px', right: '80px', zIndex: 9998 }}>
          {selectedBoolFilters.map((filter, index) => (
            <Dropdown.Item key={index} onClick={() => setSelectedBoolFilters(selectedBoolFilters.map(x => x.label === filter.label ? { ...x, on: !x.on } : x))} style={{ zIndex: 9999 }}>
              {filter.label} {filter.on && <CheckSquareFill />}
            </Dropdown.Item>
          ))}
        </DropdownButton>}
        <Button style={{ position: 'fixed', bottom: '210px', right: '10px', zIndex: 9998 }} onClick={() => { setSelectedPlatform(null); setSelectedOwnedAs(null); setSort(null); }}>
          <XCircleFill />
        </Button>
        <Carousel className="mt-1" touch={false} controls={false} interval={null} wrap={false} indicators={false} activeIndex={activeStateIndex} onSelect={(index) => setSelectedState(states[index])}>
          {states.map((state, index) => {
            const previousState = index > 0 ? states[index - 1] : null;
            const nextState = index < states.length - 1 ? states[index + 1] : null;

            let games = backlog.games
              .filter((x) => isInState(x, state))
              .filter(x => !selectedPlatform || x.platform === selectedPlatform)
              .filter(x => !selectedOwnedAs || x.ownedAs === selectedOwnedAs);
            const gamesByGroup = [];

            if (selectedState === PLAYED) {
              const activeFilters = selectedBoolFilters.filter(x => x.on);
              games = games.filter(x => activeFilters.some(filter => filter.filter(x)));
            }

            if (!sort.grouped) {
              doSort(games, sort.property, sort.direction);
            } else {
              games.forEach((x) => {
                const group = x[sort.property];
                const g = gamesByGroup.find(x => group === x.group) || { group, games: [] };
                if (g.games.length === 0) gamesByGroup.push(g);
                g.games.push(x);
              });

              doSort(gamesByGroup, 'group', sort.direction);
            }

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
                {!sort.grouped && (
                  <div>
                    <h6>
                      Ordered by {sort.label} {sort.direction == 'asc' ? <ArrowDown /> : <ArrowUp />}
                    </h6>
                    {games.map((game) => (
                      <GameCard key={game.id} game={game} status={state} />
                    ))}
                  </div>
                )}
                {sort.grouped && gamesByGroup.map(({ group, games: groupGames }) => {
                  return (
                    <div>
                      <h6>
                        {group} <Badge bg={stateColours[state]}>{groupGames.length}</Badge>
                      </h6>
                      {groupGames.map((game) => (
                        <GameCard key={game.id} game={game} status={state} />
                      ))}
                    </div>
                  );
                })}
                { }
              </Carousel.Item>
            );
          })}
        </Carousel>
      </Container>
    </div>
  );
}

const doSort = (array, sort, sortDirection) => {
  array.sort((a, b) => {
    if (!a[sort] && !b[sort]) return 0;
    if (a[sort] && !b[sort]) return -1;
    if (!a[sort] && b[sort]) return 1;
    if (a[sort] < b[sort]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sort] > b[sort]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
};

const getOppositeSortDirection = (sortDirection) => {
  return sortDirection === 'asc' ? 'desc' : 'asc';
}

const getSortIcon = (sortDirection) => {
  return sortDirection === 'asc' ? <ArrowDown /> : <ArrowUp />
}