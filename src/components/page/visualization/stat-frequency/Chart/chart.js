import {
  axisBottom,
  axisLeft,
  histogram as d3Histogram,
  scaleLinear,
  range,
  extent,
  format,
  max as d3Max,
} from 'd3'
import d3Tip from 'd3-tip'

function stepper(min, max, step) {
  const result = []
  const maxIterate = Math.floor(max / step)

  for (let i = min; i <= maxIterate; i++) {
    result.push(step * i)
  }

  return result
}

export const canvasSize = {
  height: 200,
}

export const margin = {
  top: 10,
  bottom: 40,
  right: 10,
  left: 40,
}

export const chartSize = {
  width: canvasSize.width - margin.left - margin.right,
  height: canvasSize.height - margin.top - margin.bottom,
}

export const initialDraw = (svg, data, canvasWidth, xLabel, update = false) => {
  const chartW = canvasWidth - margin.left - margin.right
  const [min, max] = extent(data)
  const thresholds = range(min, max, (max - min) / 50)
  const x = scaleLinear().domain([min, max]).range([0, chartW])
  const y = scaleLinear().range([chartSize.height, 0])

  function setAxisXTicks(x, size) {
    return axisBottom()
      .scale(x)
      .tickFormat((d) => d)
      .tickSize(size)
  }

  function setAxisYTicks(y, size, maxBins) {
    return axisLeft()
      .scale(y)
      .tickValues(stepper(0, maxBins, maxBins >= 30 ? 10 : 3))
      .tickFormat(format('d'))
      .tickSize(size)
  }

  const histogram = d3Histogram()
    .value((d) => d)
    .domain(x.domain())
    .thresholds(thresholds)

  const bins = histogram(data)
  const maxBins = d3Max(bins, (d) => d.length)

  y.domain([0, maxBins])

  let bar = null

  const tip = d3Tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html((d) => {
      return `<strong>Frequency:</strong> <span style='color:red'>${d.length}</span>`
    })

  svg.call(tip)

  if (update) {
    // Updating
    bar = svg.selectAll('.bar').data(bins)

    bar.exit().remove()

    bar
      .enter()
      .append('g')
      .attr('class', 'bar')
      .append('rect')
      .attr('class', 'rect')

    bar = svg.selectAll('.bar')

    svg.selectAll('.x-axis').call(setAxisXTicks(x, -chartSize.height))
    svg.selectAll('.y-axis').call(setAxisYTicks(y, -chartW, maxBins))
  } else {
    svg
      .append('g')
      .attr('class', 'grid x-axis')
      .style('font-size', '12px')
      .attr('transform', `translate(0, ${chartSize.height})`)
      .call(setAxisXTicks(x, -chartSize.height))

    svg
      .append('g')
      .attr('class', 'grid y-axis')
      .style('font-size', '12px')
      .call(setAxisYTicks(y, -chartW, maxBins))

    bar = svg
      .selectAll('.bar')
      .data(bins)
      .enter()
      .append('g')
      .attr('class', 'bar')

    bar.append('rect').attr('class', 'rect')

    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr(
        'transform',
        `translate(${chartW / 2}, ${canvasSize.height - margin.bottom / 3})`,
      )
      .text(xLabel)

    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr(
        'transform',
        `translate(${chartW - canvasWidth + margin.left / 2 + 4}, ${
          chartSize.height / 2
        }) rotate(-90)`,
      )
      .text('Frequency')
  }

  bar
    .select('rect')
    .attr('transform', (d) => `translate(${x(d.x0)}, ${chartSize.height})`)
    .attr('x', 1)
    .attr('y', 0)
    .attr('width', (d) => {
      const width = x(d.x1) - x(d.x0) - 1

      if (width < 0) {
        return 0
      }

      return width
    })
    .attr('height', 0)
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)

  bar
    .select('rect')
    .transition()
    .duration(800)
    .attr('y', (d) => -(chartSize.height - y(d.length)))
    .attr('height', (d) => chartSize.height - y(d.length))
}
