import PropTypes from 'prop-types'
import { Container, Row, Col } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import Layout from '~/components/shared/Layout'
import Head from '~/components/shared/Head'
import Error from '~/components/shared/Error'

import { getStats } from '~/util'
import { getStatAVG } from '~/request/frequency'

const Chart = dynamic(
  () => import('~/components/page/visualization/stat-generation-avg/Chart'),
  {
    ssr: false,
  },
)

const stats = getStats()
const alteredStats = [
  stats[1],
  stats[6],
  stats[2],
  stats[3],
  stats[4],
  stats[5],
  stats[0],
]

const AVGStatPerGeneration = (props) => {
  const { graphData: initialGraphData, error } = props
  const [submit, setSubmit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [graphData, setGraphData] = useState(initialGraphData)

  useEffect(() => {
    if (submit && !loading) {
      setLoading(true)

      Promise.all(stats.map((stat) => getStatAVG(stat.key)))
        .then((res) => {
          const newGraphData = stats.reduce((p, c, i) => {
            p[c.key] = res[i].data

            return p
          }, {})

          setGraphData(newGraphData)
        })
        .finally(() => {
          setSubmit(false)
          setLoading(false)
        })
    }
  }, [submit, loading])

  return (
    <>
      <Head title={error ? 'Whoops' : 'Average Stat per Generation'} />
      <Layout>
        <Container className="py-4">
          <div className="text-primary my-4 text-center">
            <h3>Average Stat per Generation</h3>
          </div>

          {!error ? (
            <>
              <Row>
                {alteredStats.map((s, i) => {
                  if (i >= alteredStats.length - 1) return

                  return (
                    <Col md="6" key={s.key} className="mb-4">
                      <Chart stat={s} data={graphData[s.key]} />
                    </Col>
                  )
                })}

                <Col md="6">
                  <Chart
                    className="mb-4"
                    stat={alteredStats[alteredStats.length - 1]}
                    data={graphData[alteredStats[alteredStats.length - 1].key]}
                  />
                </Col>
              </Row>
            </>
          ) : (
            <Error data={error} />
          )}
        </Container>
      </Layout>
    </>
  )
}

AVGStatPerGeneration.propTypes = {
  graphData: PropTypes.object,
  error: PropTypes.object,
}

export async function getServerSideProps(ctx) {
  let error = null
  let graphData = null

  try {
    const results = await Promise.all(stats.map((stat) => getStatAVG(stat.key)))
    graphData = stats.reduce((p, c, i) => {
      p[c.key] = results[i].data

      return p
    }, {})
  } catch (err) {
    error = {
      status: err.response.status,
      body: err.response.data,
    }
  }

  return {
    props: {
      graphData,
      error,
    },
  }
}

export default AVGStatPerGeneration
