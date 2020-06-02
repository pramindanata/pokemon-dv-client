import { Card } from 'react-bootstrap'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useEffect, useState, useRef } from 'react'
import * as d3 from 'd3'
import { canvasSize, draw, margin } from './chart'
import { debounce, getSvgWrapperWidth } from '~/util'
// import styles from './index.module.css'

const Chart = (props) => {
  const { className, stat, data, ...rest } = props
  const selector = `chart-${stat.key}`
  const classes = classnames(className)
  const svgRef = useRef(null)
  const [pageReady, setPageReady] = useState(false)
  const [firstFetch, setFirstFetch] = useState(true)

  useEffect(() => {
    if (pageReady && svgRef.current !== null) {
      const width = getSvgWrapperWidth(`.${selector}`)

      draw(svgRef.current, data.data, width, !firstFetch)
      setFirstFetch(false)
    }
  }, [data, pageReady])

  useEffect(() => {
    try {
      document.querySelector(`.${selector} svg`).remove()
    } catch (err) {}

    const width = getSvgWrapperWidth(`.${selector}`)
    const svg = d3
      .select(`.${selector}`)
      .append('svg')
      .attr('width', width)
      .attr('height', canvasSize.height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    svgRef.current = svg

    setPageReady(true)

    const resizeHandler = debounce(250, () => {
      const width = getSvgWrapperWidth(`.${selector}`)

      d3.select(`.${selector} svg`).attr('width', width)
      draw(svgRef.current, data.data, width, true)
    })

    window.addEventListener('resize', resizeHandler)

    return () => {
      d3.selectAll('.d3-tip').remove()
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  return (
    <div className={classes} {...rest}>
      <Card>
        <Card.Header>
          <Card.Title className="mb-0">{stat.name}</Card.Title>
        </Card.Header>
        <Card.Body>
          <div className={`${selector} avg-stat-chart chart`}></div>
        </Card.Body>
      </Card>
    </div>
  )
}

Chart.propTypes = {
  className: PropTypes.any,
  stat: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}

export default Chart
