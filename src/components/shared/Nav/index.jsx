import Link from 'next/link'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Navigation = () => {
  return (
    <div className="bg-primary">
      <Container>
        <Navbar
          collapseOnSelect
          expand="md"
          bg="primary"
          variant="dark"
          className="px-0"
        >
          <Link href="/" passHref>
            <Navbar.Brand>PokeDV</Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ml-auto">
              <Link href="/" passHref>
                <Nav.Link>Home</Nav.Link>
              </Link>

              <Link href="/visualization" passHref>
                <Nav.Link>Data Visualization</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  )
}

export default Navigation
