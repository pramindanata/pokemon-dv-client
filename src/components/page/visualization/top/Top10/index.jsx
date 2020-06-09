import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { canvasSize, draw, margin } from './chart'
// import styles from './index.module.css'

const Top10 = (props) => {
  const { className, pokemons, ...rest } = props
  const [pageReady, setPageReady] = useState(false)
  const classes = classnames(className)
  const svgRef = useRef(null)

  useEffect(() => {
    if (pageReady && svgRef.current !== null) {
      draw(svgRef.current, pokemons)
    }
  }, [pokemons, pageReady])

  useEffect(() => {
    try {
      document.querySelector('#top-10-bar-chart svg').remove()
    } catch (err) {}

    const svg = d3
      .select('#top-10-bar-chart')
      .append('svg')
      .attr('width', canvasSize.width)
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
