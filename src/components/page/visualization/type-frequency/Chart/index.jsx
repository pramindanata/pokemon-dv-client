import { Card } from 'react-bootstrap'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useEffect, useState, useRef } from 'react'
import { select } from 'd3'
import { canvasSize, draw, margin } from './chart'
import { getSvgWrapperWidth } from '~/util'
// import styles from './index.module.css'

const Chart = (props) => {
  const { className, type, data, ...rest } = props
  const selector = `chart-type-${type}`
  const label = type === 'a' ? 'Primary Type' : 'Secondary Type'
  const classes = classnames(className)
  const svgRef = useRef(null)
  const [pageReady, setPageReady] = useState(false)
  const [firstFetch, setFirstFetch] = useState(true)

  useEffect(() => {
    if (pageReady && svgRef.current !== null) {
      const width = getSvgWrapperWidth(`.${selector}`)

      draw(svgRef.current, data, width, label, !firstFetch)
      setFirstFetch(false)
    }
  }, [data, pageReady])

  useEffect(() => {
    try {
      document.querySelector(`.${selector} svg`).remove()
    } catch (err) {}

    const width = getSvgWrapperWidth(`.${selector}`)
    const svg = select(`.${selector}`)
      .append('svg')
      .attr('width', width)
      .attr('height', canvasSize.height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    svgRef.current = svg

    setPageReady(true)
  }, [])

  return (
    <div className={classes} {...rest}>
      <Card>
        <Card.Body>
          <div className="overflow-auto">
            <div className={`${selector} chart`}></div>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

Chart.propTypes = {
  className: PropTypes.any,
  type: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
}

export default Chart
