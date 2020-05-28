import { Container } from 'react-bootstrap'

import Layout from '../components/Layout'
import Head from '../components/Head'

const Visualization = () => {
  return (
    <>
      <Head title="Data Visualization" />
      <Layout>
        <Container className="py-4">
          <div>
            <h1>Visualization</h1>
            <p>Hello</p>
          </div>
        </Container>
      </Layout>
    </>
  )
}

export default Visualization
