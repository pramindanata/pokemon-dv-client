import Link from 'next/link'
import { useRouter } from 'next/router'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Navigation = () => {
  const router = useRouter()

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
            <Nav className="ml-auto" activeKey={router.pathname}>
              <Link href="/" passHref>
                <Nav.Link>Home</Nav.Link>
              </Link>

              <Link href="/visualization" passHref>
                <Nav.Link>Data Visualization</Nav.Link>
              </Link>

              <Link href="/about" passHref>
                <Nav.Link>About</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  )
}

export default Navigation
