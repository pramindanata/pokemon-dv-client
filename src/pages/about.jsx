import { Container } from 'react-bootstrap'

import Layout from '../components/shared/Layout'
import Head from '../components/shared/Head'

const About = () => {
  return (
    <>
      <Head title="About" />
      <Layout>
        <Container className="py-4">
          <div>
            <h1>About</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. In esse
              iure provident, quaerat saepe ad odio nam tenetur, error
              architecto dicta? Magnam distinctio totam accusantium, culpa
              recusandae odit excepturi delectus.
            </p>
          </div>
        </Container>
      </Layout>
    </>
  )
}

export default About
