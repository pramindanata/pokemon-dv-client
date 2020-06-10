import { Container, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

import Layout from '~/components/shared/Layout'
import Head from '~/components/shared/Head'
import Error from '~/components/shared/Error'
import Filter from '~/components/shared/GenerationFilter'
import Sidebar from '~/components/page/visualization/stat-distribution-per-type/Sidebar'

import { getStatPerType } from '~/request/distribution'
import { getStats } from '~/util'

const Chart = dynamic(
  () =>
    import('~/components/page/visualization/stat-distribution-per-type/Chart'),
  {
    ssr: false,
  },
)

const StatDistributionDetail = (props) => {
  const { stat, error, graphData: initialGraphData } = props
  const [loading, setLoading] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [filter, setFilter] = useState({ generation: 'all' })
  const [graphData, setGraphData] = useState(initialGraphData)

  function onSubmit(generation) {
    setFilter({ generation })
    setSubmit(true)
  }

  useEffect(() => {
    if (submit && !loading) {
      setLoading(true)
      getStatPerType(stat.key, filter)
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
      <Head title={error ? 'Whoops' : `${stat.name} Distribution`} />
      <Layout>
        <Container className="py-4">
          <div className="text-primary my-4 text-center">
            <h3>{error ? 'X' : stat.name} Distribution</h3>
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

                  {/* {loading && <p>Loading...</p>} */}

                  <Chart data={graphData.data} />
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

StatDistributionDetail.propTypes = {
  stat: PropTypes.object,
  error: PropTypes.object,
  graphData: PropTypes.object,
}

export async function getServerSideProps(ctx) {
  const { params } = ctx
  const stat = getStats().filter((stat) => stat.key === params.id)[0]
  let error = null
  let graphData = null

  if (!stat) {
    error = {
      status: 404,
      body: {
        message: 'Invalid type given',
      },
    }
  }

  try {
    const res = await getStatPerType(stat.key, ctx.query)

    graphData = res.data
  } catch (err) {
    error = {
      status: err.response.status,
      body: err.response.data,
    }
  }

  return {
    props: {
      stat: stat ?? null,
      key: new Date().getTime(),
      error,
      graphData,
    },
  }
}

export default StatDistributionDetail
