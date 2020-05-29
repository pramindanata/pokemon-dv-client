import PropTypes from 'prop-types'
import { Container, Image, ProgressBar } from 'react-bootstrap'
import { getPokemon } from '../../request/pokemon'
import { getImageUrl, getTypeColor, genTypeBG, statBuilder } from '../../util'

import Layout from '../../components/shared/Layout'
import Head from '../../components/shared/Head'
import TypeBadge from '../../components/shared/PokemonTypeBadge'
import Error from '../../components/shared/Error'

import styles from './index.module.css'

const PokemonDetail = (props) => {
  const { pokemon, error } = props
  let stats = []

  if (!error) {
    stats = statBuilder(pokemon.stat)
  }

  return (
    <>
      <Head title={error ? 'Whoops' : pokemon.name} />
      <Layout>
        {!error ? (
          <>
            <div
              className="text-center mb-3"
              style={{
                background: genTypeBG(pokemon.types),
              }}
            >
              <div className="py-4">
                <Image
                  src={getImageUrl(pokemon.image)}
                  className={`${styles['pokemon-img']}`}
                />
              </div>
            </div>

            <Container className="mb-4">
              <div className="text-center">
                <h4 className="mb-3">
                  <span className="text-muted">
                    #{pokemon.index.toString().padStart(3, '0')}
                  </span>{' '}
                  - {pokemon.name}
                </h4>

                <div className="d-flex mb-3 justify-content-center">
                  {pokemon.types.map((type, i) => (
                    <TypeBadge
                      key={type.name}
                      name={type.name}
                      className={i === 0 && 'mr-1'}
                    />
                  ))}
                </div>

                <div>
                  <p>{pokemon.description}</p>
                </div>

                <div>
                  <h5>Base Stats</h5>

                  <div>
                    {stats.map((stat) => (
                      <div
                        key={stat.name}
                        className="d-flex align-items-center"
                      >
                        <div className={`${styles['stat-label']}`}>
                          <span className="text-muted">{stat.name}</span>
                        </div>
                        <div className={`progress ${styles['stat-value']}`}>
                          <ProgressBar
                            now={stat.value}
                            label={stat.value}
                            max={stat.max}
                            isChild
                            style={{
                              backgroundColor: getTypeColor(
                                pokemon.types[0].name,
                              ),
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </>
        ) : (
          <Container className="py-4">
            <Error data={error} />
          </Container>
        )}
      </Layout>
    </>
  )
}

PokemonDetail.propTypes = {
  id: PropTypes.string.isRequired,
  pokemon: PropTypes.object,
  error: PropTypes.object,
}

export async function getServerSideProps(ctx) {
  let pokemon = null
  let error = null

  try {
    const res = await getPokemon(ctx.params.id)
    pokemon = res.data.data
  } catch (err) {
    error = {
      status: err.response.status,
      body: err.response.data,
    }
  }

  return {
    props: {
      id: ctx.params.id,
      pokemon,
      error,
    },
  }
}

export default PokemonDetail
