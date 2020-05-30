import { Card } from 'react-bootstrap'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useEffect, useState, useRef } from 'react'
import { select } from 'd3'
import { canvasSize, initialDraw, margin } from './chart'
import { debounce } from '~/util'
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
      const width = parseInt(select(`.${selector}`).style('width'), 10)

      initialDraw(svgRef.current, data.data, width, stat.name, !firstFetch)
      setFirstFetch(false)
    }
  }, [data, pageReady])

  useEffect(() => {
    try {
      document.querySelector(`.${selector} svg`).remove()
    } catch (err) {}

    const width = parseInt(select(`.${selector}`).style('width'), 10)
    const svg = select(`.${selector}`)
      .append('svg')
      .attr('width', width)
      .attr('height', canvasSize.height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    svgRef.current = svg

    setPageReady(true)

    const resizeHandler = debounce(250, () => {
      const width = parseInt(select(`.${selector}`).style('width'), 10)

      initialDraw(svgRef.current, data.data, width, stat.name, true)
    })

    window.addEventListener('resize', resizeHandler)

    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  return (
    <div className={classes} {...rest}>
      <Card>
        <Card.Body>
          <div className={`${selector} chart`}></div>
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