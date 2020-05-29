import { Container, Card, Button, Col, Row } from 'react-bootstrap'
import Link from 'next/link'
import Layout from '~/components/shared/Layout'
import Head from '~/components/shared/Head'
import { getStats } from '~/util'

const Top = () => {
  const stats = getStats()

  return (
    <>
      <Head title="Top X Pokemon" />
      <Layout>
        <Container className="py-4">
          <div className="text-primary my-4 text-center">
            <h3>Top X Pokemon</h3>
            <p className="text-muted">Choose which stat you want to see.</p>
          </div>

          <Row>
            {stats.map((stat) => (
              <Col key={stat.name} md="6" lg="4" className="mb-4">
                <Card bg="secondary" className="text-white">
                  <Card.Header>
                    <Card.Title className="mb-0">{stat.name}</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Link
                      href="/visualization/top/[id]"
                      as={`/visualization/top/${stat.key}`}
                      passHref
                    >
                      <Button block variant="dark">
                        See Detail
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Layout>
    </>
  )
}

export default Top
