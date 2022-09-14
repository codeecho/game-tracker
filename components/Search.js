import { Button, Container, Form, InputGroup, Offcanvas } from "react-bootstrap";
import { useBacklog } from "../pages/BacklogProvider"
import GameCard from "./GameCard";
import Header from "./Header";
import { Search as SearchIcon } from 'react-bootstrap-icons';
import { useEffect, useState } from "react";

export default function Search(){
    const [showSearchParams, setShowSearchParams] = useState(false);
    const [searchString, setSearchString] = useState('');
    const { backlog } = useBacklog();

    const searchResults = backlog.games.filter(game => {
        return game.name.toLowerCase().includes(searchString.toLowerCase());
    });

    const doSearch = () => {
        setShowSearchParams(false);
    };

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
                    </form>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}