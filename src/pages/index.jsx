import { Container, Row, Col } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import qs from 'qs'
import PropTypes from 'prop-types'

import Layout from '../components/shared/Layout'
import Head from '../components/shared/Head'
import Filter from '../components/page/home/Filter'
import Pokemon from '../components/page/home/PokemonCard'
import Pagination from '../components/shared/Pagination'
import Error from '../components/shared/Error'

import { getPokemons as getPokemonsReq } from '../request/pokemon'

const Home = (props) => {
  const maxPerPage = 24
  const router = useRouter()
  const [filter, setFilter] = useState(props.filter)
  const [loading, setLoading] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [pokemons, setPokemons] = useState(props.pokemons)

  function onSubmit(filter) {
    setFilter(filter)
    updateUrl(filter)
    setSubmit(true)
  }

  function updateUrl(filter) {
    const query = qs.stringify(filter)

    if (query !== '') {
      Router.push(`${router.pathname}?${query}`, undefined, {
        shallow: true,
      })
    }
  }

  function onPageChange(selectedItem) {
    const newFilter = {
      ...filter,
      page: selectedItem.selected + 1,
    }
    setFilter(newFilter)
    setSubmit(true)
  }

  useEffect(() => {
    updateUrl(filter)
  }, [filter])

  useEffect(() => {
    if (submit) {
      setPokemons({
        data: [],
        total: 0,
      })
    }
  }, [submit])

  useEffect(() => {
    if (submit & !loading) {
      setLoading(true)

      getPokemonsReq(filter)
        .then((res) => {
          setPokemons(res.data)
        })
        .finally(() => {
          setSubmit(false)
          setLoading(false)
        })
    }
  }, [submit, loading, filter])

  return (
    <>
      <Head title="Home" />
      <Layout>
        <Container className="py-4">
          <div className="text-primary my-4 text-center">
            <h3>Explore Pokemon !</h3>
          </div>

          <Filter
            onSubmit={onSubmit}
            loading={loading}
            initial={props.filter}
          />

          <hr className="mb-4 mt-2" />

          {filter.search && !props.error && (
            <div>
              <p className="lead">
                Result for &quot;<i>{filter.search}&quot;:</i>
              </p>
            </div>
          )}

          {!props.error ? (
            <>
              {loading && (
                <div>
                  <p>Loading</p>
                </div>
              )}

              {pokemons.data.length > 0 && (
                <>
                  <Row>
                    {pokemons.data.map((pokemon) => (
                      <Col
                        xs="6"
                        md="4"
                        lg="3"
                        key={pokemon.id}
                        className="mb-4"
                      >
                        <Pokemon pokemon={pokemon} />
                      </Col>
                    ))}
                  </Row>

                  <div className="text-center">
                    <Pagination
                      pageCount={Math.floor(pokemons.total / maxPerPage)}
                      onPageChange={onPageChange}
                      forcePage={filter.page && filter.page - 1}
                    />
                  </div>
                </>
              )}

              {pokemons.data.length === 0 && !loading && (
                <div>
                  <p>No data found</p>
                </div>
              )}
            </>
          ) : (
            <Error data={props.error} />
          )}
        </Container>
      </Layout>
    </>
  )
}

Home.propTypes = {
  pokemons: PropTypes.object,
  filter: PropTypes.object,
  error: PropTypes.object,
}

export async function getServerSideProps(ctx) {
  const filter = ctx.query
  let pokemons = null
  let error = null

  try {
    const res = await getPokemonsReq(filter)

    pokemons = res.data
  } catch (err) {
    error = {
      status: err.response.status,
      body: err.response.data,
    }
  }

  return {
    props: {
      pokemons,
      filter,
      error,
      key: new Date().getTime(),
    },
  }
}

export default Home
