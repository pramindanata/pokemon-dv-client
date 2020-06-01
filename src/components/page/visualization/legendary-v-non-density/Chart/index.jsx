import { Card } from 'react-bootstrap'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useEffect, useState, useRef } from 'react'
import { select } from 'd3'
import { canvasSize, draw, margin } from './chart'
import { debounce, getSvgWrapperWidth } from '~/util'
// import styles from './index.module.css'

const legends = [
  {
    name: 'Legendary',
    color: '#30336b',
  },
  {
    name: 'Non Legendary',
    color: '#ff7979',
  },
]

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

      draw(svgRef.current, data.data, width, stat.name, !firstFetch)
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

    const resizeHandler = debounce(250, () => {
      const width = getSvgWrapperWidth(`.${selector}`)

      draw(svgRef.current, data.data, width, stat.name, true)
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
          <div className="d-flex justify-content-center mt-2">
            {legends.map((l, i) => (
              <div
                key={l.name}
                className={`d-flex align-items-center text-sm ${
                  i === 0 && 'mr-4'
                }`}
              >
                <div
                  className="rounded-circle mr-2"
                  style={{
                    width: 15,
                    height: 15,
                    backgroundColor: l.color,
                  }}
                ></div>
                <div>{l.name}</div>
              </div>
            ))}
          </div>
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
