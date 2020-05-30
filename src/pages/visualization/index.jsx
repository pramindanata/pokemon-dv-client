import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import Link from 'next/link'

import Layout from '~/components/shared/Layout'
import Head from '~/components/shared/Head'

const Visualization = () => {
  const menu = [
    {
      title: 'Data proportion',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      href: '/visualization/proportion',
    },
    {
      title: 'Top X Pokemon',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      href: '/visualization/top',
    },
    {
      title: 'Type Frequency',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      href: '/visualization/type-frequency',
    },
    {
      title: 'Stat Frequency',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      href: '/visualization/stat-frequency',
    },
    {
      title: 'Average Stat per Generation',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      href: '/visualization/top',
    },
    {
      title: 'Stat Distribution',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      href: '/visualization/top',
    },
    {
      title: 'Legendary VS Non Legendary Stat Density',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      href: '/visualization/top',
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
