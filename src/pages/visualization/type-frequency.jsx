import PropTypes from 'prop-types'
import { Container, Row, Col } from 'react-bootstrap'
import { useEffect, useState } from 'react'

import Layout from '~/components/shared/Layout'
import Head from '~/components/shared/Head'
import Error from '~/components/shared/Error'
import Filter from '~/components/shared/GenerationFilter'
import Chart from '~/components/page/visualization/type-frequency/Chart'

import { getType as getTypeFreq } from '~/request/frequency'

const types = ['a', 'b']

const TypeFrequency = (props) => {
  const { graphData: initialGraphData, error } = props
  const [filter, setFilter] = useState({ generation: 'all' })
  const [submit, setSubmit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [graphData, setGraphData] = useState(initialGraphData)

  function onSubmit(generation) {
    setFilter({ generation })
    setSubmit(true)
  }

  useEffect(() => {
    if (submit && !loading) {
      setLoading(true)

      Promise.all(types.map((type) => getTypeFreq(type, filter)))
        .then((res) => {
          const newGraphData = types.reduce((p, c, i) => {
            p[c] = res[i].data

            return p
          }, {})

          setGraphData(newGraphData)
        })
        .finally(() => {
          setSubmit(false)
          setLoading(false)
        })
    }
  }, [submit, loading, filter])

  return (
    <>
      <Head title={error ? 'Whoops' : 'Type Frequency'} />
      <Layout>
        <Container className="py-4">
          <div className="text-primary my-4 text-center">
            <h3>Type Frequency</h3>
          </div>

          {!error ? (
            <>
              <Filter
                className="mb-4"
                loading={loading}
                onSubmit={onSubmit}
                initial={filter.generation}
              />

              <Row>
                {types.map((type) => (
                  <Col sm="12" key={type} className="mb-4">
                    <Chart type={type} data={graphData[type].data} />
                  </Col>
                ))}
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

TypeFrequency.propTypes = {
  graphData: PropTypes.object,
  error: PropTypes.object,
}

export async function getServerSideProps(ctx) {
  let error = null
  let graphData = null

  try {
    const filter = {
      generation: 'all',
    }
    const results = await Promise.all(
      types.map((type) => getTypeFreq(type, filter)),
    )
    graphData = types.reduce((p, c, i) => {
      p[c] = results[i].data

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

export default TypeFrequency
