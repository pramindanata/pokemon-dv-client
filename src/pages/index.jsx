import { Container } from 'react-bootstrap'

import Layout from '../components/Layout'
import Head from '../components/Head'

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
