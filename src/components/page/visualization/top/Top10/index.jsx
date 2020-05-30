import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { select } from 'd3'
import { canvasSize, redraw, margin } from './chart'
// import styles from './index.module.css'

const Top10 = (props) => {
  const { className, pokemons, ...rest } = props
  const [pageReady, setPageReady] = useState(false)
  const classes = classnames(className)
  const svgRef = useRef(null)

  useEffect(() => {
    if (pageReady && svgRef.current !== null) {
      redraw(svgRef.current, pokemons)
    }
  }, [pokemons, pageReady])

  useEffect(() => {
    try {
      document.querySelector('#top-10-bar-chart svg').remove()
    } catch (err) {}

    const svg = select('#top-10-bar-chart')
      .append('svg')
      .attr('width', canvasSize.width)
      .attr('height', canvasSize.height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    svgRef.current = svg

    setPageReady(true)
  }, [])

  return (
    <div className={classes} {...rest}>
      <h5>Top 10</h5>

      <hr className="mb-3" />

      <div className="overflow-auto">
        <div id="top-10-bar-chart" className="chart top-x-chart"></div>
      </div>
    </div>
  )
}

Top10.propTypes = {
  className: PropTypes.any,
  pokemons: PropTypes.array.isRequired,
}

export default Top10
