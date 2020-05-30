import PropTypes from 'prop-types'
import { Container } from 'react-bootstrap'
import { useEffect, useState } from 'react'

import Layout from '~/components/shared/Layout'
import Head from '~/components/shared/Head'
import Error from '~/components/shared/Error'
import Filter from '~/components/shared/GenerationFilter'
import { getStats } from '~/util'
import { getStat as getStatFreq } from '~/request/frequency'

const stats = getStats().map((stat) => stat.key)

const StatFrequency = (props) => {
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

      Promise.all(stats.map((stat) => getStatFreq(stat, filter)))
        .then((res) => {
          const newGraphData = stats.reduce((p, c, i) => {
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
      <Head title={error ? 'Whoops' : 'Stat Frequency'} />
      <Layout>
        <Container className="py-4">
          <div className="text-primary my-4 text-center">
            <h3>Stat Frequency</h3>
          </div>

          {!error ? (
            <>
              <Filter
                className="mb-4"
                loading={loading}
                onSubmit={onSubmit}
                initial={filter.generation}
              />
            </>
          ) : (
            <Error data={error} />
          )}
        </Container>
      </Layout>
    </>
  )
}

StatFrequency.propTypes = {
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
      stats.map((stat) => getStatFreq(stat, filter)),
    )
    graphData = stats.reduce((p, c, i) => {
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

export default StatFrequency
