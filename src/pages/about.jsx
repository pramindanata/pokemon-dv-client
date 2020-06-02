import { Container } from 'react-bootstrap'

import Layout from '~/components/shared/Layout'
import Head from '~/components/shared/Head'

const About = () => {
  return (
    <>
      <Head title="About" />
      <Layout>
        <Container className="py-4">
          <div className="text-primary my-4 text-center">
            <h3>About</h3>
          </div>

          <div>
            <p>
              Explore and see Pokemon data from #1 to #6 generation of Pokemons.
            </p>

            <div>
              <h5>Data Source</h5>

              <ul>
                <li>
                  Base:{' '}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.kaggle.com/abcsds/pokemon"
                  >
                    kaggle.com
                  </a>
                </li>
                <li>
                  Pokemon images:{' '}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://id.portal-pokemon.com/play/pokedex"
                  >
                    portal-pokemon.com
                  </a>
                </li>
                <li>
                  Pokemon descriptions:{' '}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.pokemon.com/us/pokedex"
                  >
                    pokemon.com
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5>Source Code</h5>

              <ul>
                <li>
                  Client side:{' '}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/pramindanata/pokemon-dv-client"
                  >
                    github.com
                  </a>
                </li>
                <li>
                  Server side / API:{' '}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/pramindanata/pokemon-dv-server"
                  >
                    github.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  )
}

export default About
