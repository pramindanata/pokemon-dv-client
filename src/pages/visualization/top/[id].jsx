import { Container, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import qs from 'qs'

import Layout from '~/components/shared/Layout'
import Head from '~/components/shared/Head'
import Error from '~/components/shared/Error'
import Filter from '~/components/shared/GenerationFilter'
import Sidebar from '~/components/page/visualization/top/Sidebar'

import { getStats } from '~/util'
import { getTop } from '~/request/top'

const TopDetail = (props) => {
  const {
    id,
    stat,
    error,
    graphData: initialGraphData,
    filter: initialFilter,
  } = props
  const router = useRouter()
  const [graphData, setGraphData] = useState(initialGraphData)
  const [filter, setFilter] = useState(initialFilter)
  const [loading, setLoading] = useState(false)
  const [submit, setSubmit] = useState(false)

  function onSubmit(generation) {
    setFilter({ generation })
    updateUrl(filter)
    setSubmit(true)
  }

  function updateUrl(filter) {
    const query = qs.stringify(filter)

    if (query !== '') {
      Router.push(`${router.pathname}`, `/visualization/top/${id}?${query}`, {
        shallow: true,
      })
    }
  }

  useEffect(() => {
    updateUrl(filter)
  }, [filter])

  useEffect(() => {
    if (submit && !loading) {
      setLoading(true)

      getTop(id, filter)
        .then((res) => {
          setGraphData(res.data)
        })
        .finally(() => {
          setSubmit(false)
          setLoading(false)
        })
    }
  }, [submit, loading, filter])

  return (
    <>
      <Head title={error ? 'Whoops' : `Top ${stat.name} Pokemon`} />
      <Layout>
        <Container className="py-4">
          <div className="text-primary my-4 text-center">
            <h3>Top {error ? 'X' : stat.name} Pokemon</h3>
          </div>

          {!error ? (
            <Row>
              <Col md="4" lg="3">
                <Sidebar />
              </Col>
              <Col md="8" lg="9">
                <div>
                  <Filter
                    className="mb-3"
                    loading={loading}
                    onSubmit={onSubmit}
                    initial={filter.generation ?? 'all'}
                  />

                  {loading && <p>Loading...</p>}
                </div>
              </Col>
            </Row>
          ) : (
            <Error data={error} />
          )}
        </Container>
      </Layout>
    </>
  )
}

TopDetail.propTypes = {
  error: PropTypes.object,
  id: PropTypes.string.isRequired,
  stat: PropTypes.object,
  graphData: PropTypes.object,
  filter: PropTypes.object,
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.params
  let error = null
  let graphData = null
  const stat = getStats().filter((s) => s.key === id)[0]

  if (!stat) {
    error = {
      status: 404,
      body: {
        message: 'Invalid type given',
      },
    }
  }

  try {
    const res = await getTop(id, ctx.query)
    graphData = res.data
  } catch (err) {
    error = {
      status: err.response.status,
      body: err.response.data,
    }
  }

  return {
    props: {
      error,
      id,
      stat: stat ?? null,
      graphData,
      filter: ctx.query,
    },
  }
}

export default TopDetail
