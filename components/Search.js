import { Accordion, Button, Container, Form, InputGroup, Offcanvas } from "react-bootstrap";
import { useBacklog } from "../pages/BacklogProvider"
import GameCard from "./GameCard";
import Header from "./Header";
import { Search as SearchIcon } from 'react-bootstrap-icons';
import { useEffect, useState } from "react";
import states from "../constants/states";
import { getPlatform } from "../constants/platforms";

export default function Search(){
    const [showSearchParams, setShowSearchParams] = useState(false);
    const [searchString, setSearchString] = useState('');
    const { backlog } = useBacklog();
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [selectedStates, setSelectedStates] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [sortProperty, setSortProperty] = useState('rating');
    const [isCoop, setIsCoop] = useState(false);

    const platforms = [...new Set(backlog.games.map(x => x.platform))];
    const genres = [...new Set(backlog.games.map(x => x.genres).flat())];
    
    const searchResults = backlog.games.filter(game => {
        let match = game.name.toLowerCase().includes(searchString.toLowerCase());
        if(!match) return false;
        if(selectedPlatforms.length > 0) match = selectedPlatforms.includes(game.platform);
        if(!match) return false;
        if(selectedStates.length > 0) match = selectedStates.includes(game.status);
        if(!match) return false;
        if(selectedGenres.length > 0) match = selectedGenres.some(x => game.genres && game.genres.includes(x));
        if(!match) return false;
        if(isCoop) match = game.isCoop;
        return match;
    });

    searchResults.sort((a, b) => {
        if(!a) return -1;
        if(!b) return 1;
        const propA = sortProperty === 'platform' ? getPlatform(a[sortProperty]) : a[sortProperty];
        const propB = sortProperty === 'platform' ? getPlatform(b[sortProperty]) : b[sortProperty];
        if(['rating', 'igdbRating'].includes(sortProperty)) return (propB || 0) < (propA || 0) ? -1 : 1
        return propA < propB ? -1 : 1;
    });

    const doSearch = () => {
        setShowSearchParams(false);
    };

    const togglePlatform = event => {
        const { id, checked } = event.target;
        let p = selectedPlatforms.filter(x => x !== id);
        if(checked) p = p.concat(id);
        setSelectedPlatforms(p);
    }

    const toggleState = event => {
        const { id, checked } = event.target;
        let p = selectedStates.filter(x => x !== id);
        if(checked) p = p.concat(id);
        setSelectedStates(p);
    }

    const toggleGenre = event => {
        const { id, checked } = event.target;
        let p = selectedGenres.filter(x => x !== id);
        if(checked) p = p.concat(id);
        setSelectedGenres(p);
    }

    const toggleSortProperty = event => {
        const { id } = event.target;
        setSortProperty(id);
    }

    const toggleIsCoop = event => {
        const { checked } = event.target;
        setIsCoop(checked);
    }

    return (
        <div>
            <Header title="Search" showBackLink />
            <Container className='mainContainer'>
                { !showSearchParams && <Button onClick={() => setShowSearchParams(true)} style={{ position: 'fixed', bottom: '10px', right: '10px', zIndex: 9999 }}><SearchIcon /></Button> }
                { searchResults.map(game => (
                    <GameCard key={game.id} game={game} showStatus ratingProperty={ sortProperty === 'igdbRating' ? 'igdbRating' : 'rating'} />
                ))}
            </Container>
            <Offcanvas show={showSearchParams} placement="end" onHide={() => setShowSearchParams(false)}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <form onSubmit={(e) => { e.preventDefault(); doSearch(); }}>
                        <InputGroup className="mb-3">
                            <Form.Control value={searchString} onChange={ev => setSearchString(ev.target.value)} />
                            <Button variant="outline-info" as="input" type="submit" value="Search"/>
                        </InputGroup>
                        <Form.Check 
                            id="coop"
                            label="Coop"
                            checked={isCoop}
                            onChange={toggleIsCoop}
                        />
                        <Accordion>
                                <Accordion.Item eventKey="platforms" key="platforms">
                                    <Accordion.Header>Platforms</Accordion.Header>
                                    <Accordion.Body>
                                        { platforms.map(platform => <Form.Check 
                                            id={platform}
                                            label={platform}
                                            checked={selectedPlatforms.includes(platform)}
                                            onChange={togglePlatform}
                                        />) }
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="status" key="status">
                                    <Accordion.Header>Status</Accordion.Header>
                                    <Accordion.Body>
                                        { states.map(state => <Form.Check 
                                            id={state}
                                            label={state}
                                            checked={selectedStates.includes(state)}
                                            onChange={toggleState}
                                        />) }
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="genres" key="genres">
                                    <Accordion.Header>Genres</Accordion.Header>
                                    <Accordion.Body>
                                        { genres.map(genre => <Form.Check 
                                            id={genre}
                                            label={genre}
                                            checked={selectedGenres.includes(genre)}
                                            onChange={toggleGenre}
                                        />) }
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="sort" key="sort">
                                    <Accordion.Header>Sort By</Accordion.Header>
                                    <Accordion.Body>
                                        <Form.Check 
                                            id="rating"
                                            name="sort"
                                            label="Rating"
                                            type="radio"
                                            checked={sortProperty === 'rating'}
                                            onChange={toggleSortProperty}
                                        />
                                        <Form.Check 
                                            id="igdbRating"
                                            name="sort"
                                            label="IGDB Rating"
                                            type="radio"
                                            checked={sortProperty === 'igdbRating'}
                                            onChange={toggleSortProperty}
                                        />
                                        <Form.Check 
                                            id="name"
                                            name="sort"
                                            label="Name"
                                            type="radio"
                                            checked={sortProperty === 'name'}
                                            onChange={toggleSortProperty}
                                        />
                                        <Form.Check 
                                            id="platform"
                                            name="sort"
                                            label="Platform"
                                            type="radio"
                                            checked={sortProperty === 'platform'}
                                            onChange={toggleSortProperty}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                        </Accordion>
                        <div className="d-grid">
                            <Button className="mt-2" variant="info" as="input" type="submit" value="Search" />
                        </div>
                    </form>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}