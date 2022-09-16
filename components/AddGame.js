import { search } from '../services/database';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useBacklog } from '../pages/BacklogProvider';
import Header from './Header';
import { useRouter } from '../Router';
import { Accordion, Container, Form, InputGroup, Table } from 'react-bootstrap';
import regions from '../constants/regions';
import { getPlatform } from '../constants/platforms';

export default function AddGame(){
    const [searchString, setSearchString] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const doSearch = async () => {
            const results = await search(searchQuery);
            setSearchResults(results);
        }

        if(searchQuery !== '') doSearch();
    }, [searchQuery]);

    const { add } = useBacklog();

    const resetSearch = () => {
        setSearchResults([]);
        setSearchString('');
        setSearchQuery('');
    }

    const { hideAddGame, selectedState } = useRouter();

    const addToBacklog = (game) => {
        add(game, selectedState);
        resetSearch();
        hideAddGame();
    }

    return (
        <div>
            <Header title="Add Game" showBackLink />
            <Container className='mainContainer'>
                <form onSubmit={(e) => { e.preventDefault(); setSearchQuery(searchString); }}>
                    <InputGroup className="mb-3">
                        <Form.Control value={searchString} onChange={ev => setSearchString(ev.target.value)} />
                        <Button variant="outline-info" as="input" type="submit" value="Search"/>
                    </InputGroup>
                </form>
                <Accordion>
                    {searchResults.filter(x => x.release_dates).map(game => (
                        <Accordion.Item eventKey={game.id} key={game.id}>
                            <Accordion.Header><div><div className="acc-header">{restrictTitle(game.name)}</div><div className="acc-subtitle text-muted mt-1">{[...new Set(game.release_dates.map(x => x.platform.abbreviation))].join(', ')}</div></div></Accordion.Header>
                            <Accordion.Body>
                                <Table striped size="sm">
                                    <tbody>
                                        {game.release_dates.map(x => (
                                            <tr>
                                                <td>{x.platform.abbreviation}</td>
                                                <td>{regions[x.region]}</td>
                                                <td>{x.y}</td>
                                                <td>
                                                    <Button size="sm" onClick={() => addToBacklog(buildGame(game, x))}>Add</Button>
                                                </td>
                                            </tr>
                                        ))}
                                        
                                    </tbody>
                                </Table>
                            
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </Container>
        </div>
    );
}

const restrictTitle = title => {
    const maxLength = 40;
    if(title.length <= maxLength) return title;
    return title.substring(0, maxLength) + '...';
}

const buildGame = (game, release) => {
    return {
        id: game.id,
        name: game.name,
        platform: getPlatform(release.platform.abbreviation),
        releaseYear: release.y,
        region: regions[release.region],
        genres: game.genres ? game.genres.map(g => g.name) : [],
        igdbRating: Math.round(game.rating),
        igdbRatingCount: game.rating_count,
        isCoop: game.game_modes?.some(x => x.name === 'Co-operative')
    }
}