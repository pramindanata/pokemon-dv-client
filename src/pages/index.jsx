import { Container } from 'react-bootstrap'

import Layout from '../components/shared/Layout'
import Head from '../components/shared/Head'

const Home = () => {
  return (
    <>
      <Head title="Home" />
      <Layout>
        <Container className="py-4">
          <div>
            <h1>Home</h1>
            <p>Hello</p>
          </div>
        </Container>
      </Layout>
    </>
  )
}

export default Home
