import { Container } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import qs from 'qs'
import PropTypes from 'prop-types'

import Layout from '../components/shared/Layout'
import Head from '../components/shared/Head'
import Filter from '../components/page/home/Filter'
import { getPokemons } from '../request/pokemon'

const Home = (props) => {
  const router = useRouter()
  const [filter, setFilter] = useState({})
  const [loading, setLoading] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [pokemons, setPokemons] = useState([])

  function onSubmit(filter) {
    setFilter(filter)
    updateUrl(filter)
    setSubmit(true)
  }

  function updateUrl(filter) {
    const query = qs.stringify(filter)

    Router.push(`${router.pathname}?${query}`, undefined, {
      shallow: true,
    })
  }

  useEffect(() => {
    setPokemons(props.pokemons)
  }, [])

  useEffect(() => {
    if (submit & !loading) {
      setLoading(true)

      getPokemons(filter)
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
          <Filter onSubmit={onSubmit} />

          <div>
            <h1>Home</h1>
            <p>Hello</p>
          </div>
        </Container>
      </Layout>
    </>
  )
}

Home.propTypes = {
  pokemons: PropTypes.object,
}

export async function getServerSideProps(ctx) {
  const filter = ctx.query
  const res = await getPokemons(filter)

  return {
    props: {
      pokemons: res.data,
    },
  }
}

export default Home
