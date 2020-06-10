import { Card, Form } from 'react-bootstrap'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useEffect, useState, useRef } from 'react'
import * as d3 from 'd3'
import { canvasSize, draw, margin } from './chart'
import { getSvgWrapperWidth } from '~/util'
// import styles from './index.module.css'

const Chart = (props) => {
  const { className, data, ...rest } = props
  const selector = `chart-stat-distribution`
  const classes = classnames(className)
  const svgRef = useRef(null)
  const [pageReady, setPageReady] = useState(false)
  const [firstFetch, setFirstFetch] = useState(true)
  const [jitter, setJitter] = useState(false)

  useEffect(() => {
    if (pageReady && svgRef.current !== null) {
      const width = getSvgWrapperWidth(`#${selector}`)

      draw(svgRef.current, data, width, !firstFetch, jitter)
      setFirstFetch(false)
    }
  }, [data, pageReady, jitter])

  useEffect(() => {
    try {
      document.querySelector(`#${selector} svg`).remove()
    } catch (err) {}

    const width = getSvgWrapperWidth(`#${selector}`)
    const svg = d3
      .select(`#${selector}`)
      .append('svg')
      .attr('width', width)
      .attr('height', canvasSize.height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    svgRef.current = svg

    setPageReady(true)

    return () => {
      d3.selectAll('.d3-tip').remove()
    }
  }, [])

  return (
    <div className={classes} {...rest}>
      <Card>
        <Card.Body>
          <div className="mb-3">
            <Form.Check
              custom
              type="checkbox"
              id="cb-jitter"
              label="Enable jitter"
              value={jitter}
              onChange={(e) => setJitter(e.target.checked)}
            />
          </div>

          <div className="overflow-auto">
            <div id={selector} className="chart"></div>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

Chart.propTypes = {
  className: PropTypes.any,
  data: PropTypes.array.isRequired,
}

export default Chart
