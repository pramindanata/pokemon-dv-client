import { Container, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

import Layout from '~/components/shared/Layout'
import Head from '~/components/shared/Head'
import Error from '~/components/shared/Error'
import Filter from '~/components/shared/GenerationFilter'
import Sidebar from '~/components/page/visualization/top/Sidebar'
import Top3 from '~/components/page/visualization/top/Top3'
import Top10 from '~/components/page/visualization/top/Top10'

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
  const [graphData, setGraphData] = useState(initialGraphData)
  const [filter, setFilter] = useState(initialFilter)
  const [loading, setLoading] = useState(false)
  const [submit, setSubmit] = useState(false)

  function onSubmit(generation) {
    setFilter({ generation })
    setSubmit(true)
  }

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
              <Col md="4" lg="3" className="mb-4">
                <Sidebar />
              </Col>

              <Col md="8" lg="9">
                <div>
                  <Filter
                    className="mb-4"
                    loading={loading}
                    onSubmit={onSubmit}
                    initial={filter.generation ?? 'all'}
                  />

                  {loading && <p>Loading...</p>}

                  {!loading && (
                    <>
                      <Top3 className="mb-4" pokemons={graphData.top3} />
                      <Top10 pokemons={graphData.top10} />
                    </>
                  )}
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
      key: new Date().getTime(),
    },
  }
}

export default TopDetail
