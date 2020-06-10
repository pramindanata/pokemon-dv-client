import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import Link from 'next/link'

import Layout from '~/components/shared/Layout'
import Head from '~/components/shared/Head'

const Visualization = () => {
  const menu = [
    {
      title: 'Top X Pokemon',
      description: 'See top 3 and top 10 Pokemons on each stat.',
      href: '/visualization/top',
    },
    {
      title: 'Type Frequency',
      description: 'See frequency of primary and secondary Pokemon types.',
      href: '/visualization/type-frequency',
    },
    {
      title: 'Stat Distribution',
      description: 'See simple distribution of each Pokemon stat.',
      href: '/visualization/stat-distribution',
    },
    {
      title: 'Average Stat per Generation',
      description: 'See average of each stat per Pokemon generation.',
      href: '/visualization/avg-stat-per-generation',
    },
    {
      title: 'Stat Distribution per Type',
      description:
        'See more detailed distribution of each stat per Pokemon type.',
      href: '/visualization/stat-distribution-per-type',
    },
    {
      title: 'Legendary VS Non Stat Dist',
      description:
        'See comparison of legendary vs non legendary Pokemon stat distribution.',
      href: '/visualization/legendary-v-non-distribution',
    },
  ]

  return (
    <>
      <Head title="Data Visualization" />
      <Layout>
        <Container className="py-4">
          <div className="my-4 text-center">
            <h3 className="text-primary ">Data Visualization</h3>
            <p className="text-muted">
              See visualization about Pokeon data from this site.
            </p>
          </div>

          <Row>
            {menu.map((m) => (
              <Col key={m.title} md="6" lg="4" className="mb-4">
                <Card bg="secondary" className="text-white">
                  <Card.Header>
                    <Card.Title className="mb-0">{m.title}</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <p>{m.description}</p>
                    <Link href={m.href} passHref>
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

export default Visualization
