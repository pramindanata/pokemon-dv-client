import { Container, Card, Button, Col, Row } from 'react-bootstrap'
import Link from 'next/link'
import Layout from '~/components/shared/Layout'
import Head from '~/components/shared/Head'
import { getStats } from '~/util'

const StatDistribution = () => {
  const stats = getStats()

  return (
    <>
      <Head title="Stat Distribution" />
      <Layout>
        <Container className="py-4">
          <div className="text-primary my-4 text-center">
            <h3>Stat Distribution</h3>
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
                      href="/visualization/stat-distribution/[id]"
                      as={`/visualization/stat-distribution/${stat.key}`}
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

export default StatDistribution
