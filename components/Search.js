import { Accordion, Button, Container, Form, InputGroup, Offcanvas } from "react-bootstrap";
import { useBacklog } from "../pages/BacklogProvider"
import GameCard from "./GameCard";
import Header from "./Header";
import { Search as SearchIcon } from 'react-bootstrap-icons';
import { useEffect, useState } from "react";
import states from "../constants/states";

export default function Search(){
    const [showSearchParams, setShowSearchParams] = useState(false);
    const [searchString, setSearchString] = useState('');
    const { backlog } = useBacklog();
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [selectedStates, setSelectedStates] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);

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
        return match;
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

    return (
        <div>
            <Header title="Search" showBackLink />
            <Container className='mainContainer'>
                { !showSearchParams && <Button onClick={() => setShowSearchParams(true)} style={{ position: 'fixed', bottom: '10px', right: '10px', zIndex: 9999 }}><SearchIcon /></Button> }
                { searchResults.map(game => (
                    <GameCard key={game.id} game={game} showStatus />
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