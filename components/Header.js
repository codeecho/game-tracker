import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useRouter } from '../Router';
import { Stack } from 'react-bootstrap';

export default function Header(props){
  const { title, showBackLink, children } = props;

  const { goBackToBacklog } = useRouter();

  return (
    <Navbar bg="primary" expand={false} variant="dark" collapseOnSelect={true}>
      <Container>
        <Navbar.Brand>{ showBackLink && <ArrowLeft onClick={() => goBackToBacklog()}/> } {restrictTitle(title)}</Navbar.Brand>
          <Stack direction='horizontal' gap={3} className="ms-auto">
            { children }
          </Stack>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>Settings</Nav.Link>
          </Nav>
        </Navbar.Collapse> */}
      </Container>
    </Navbar>
    )
}

const restrictTitle = title => {
  const maxLength = 20;
  if(title.length <= maxLength) return title;
  return title.substring(0, maxLength) + '...';
}