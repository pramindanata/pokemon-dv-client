import * as d3 from 'd3'

function kernelDensityEstimator(kernel, X) {
  return (V) => {
    return X.map((x) => {
      return [x, d3.mean(V, (v) => kernel(x - v))]
    })
  }
}

function kernelEpanechnikov(k) {
  return (v) => (Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0)
}

export const canvasSize = {
  height: 225,
}

export const margin = {
  top: 10,
  bottom: 45,
  right: 10,
  left: 65,
}

export const chartSize = {
  width: canvasSize.width - margin.left - margin.right,
  height: canvasSize.height - margin.top - margin.bottom,
}

export const draw = (svg, data, canvasWidth, xLabel, update = false) => {
  const chartW = canvasWidth - margin.left - margin.right
  const legendary = data.legendary
  const nonLegendary = data.nonLegendary

  const concatenateArr = nonLegendary.concat(legendary).sort((a, b) => a - b)

  const min = concatenateArr[0]
  const max = concatenateArr[concatenateArr.length - 1]
  const thresholds = d3.range(min, max, (max - min) / 35)

  const kde = kernelDensityEstimator(kernelEpanechnikov(7), thresholds)
  const densityA = kde(legendary)
  const densityB = kde(nonLegendary)

  const concatenateDensity = densityB.concat(densityA)
  const maxDensity = concatenateDensity.sort((a, b) => b[1] - a[1])[0][1]

  const x = d3.scaleLinear().domain([min, max]).range([0, chartW])
  const y = d3
    .scaleLinear()
    .domain([0, maxDensity])
    .range([chartSize.height, 0])

  function areaGenerator(datum, initial) {
    return d3
      .area()
      .curve(d3.curveBasisOpen)
      .x((d) => x(d[0]))
      .y0(y(0))
      .y1((d) => (initial ? chartSize.height : y(d[1])))(datum)
  }

  if (update) {
    svg.selectAll('.x-axis').call(d3.axisBottom(x))
    svg.selectAll('.y-axis').call(d3.axisLeft().scale(y).ticks(5))

    // Delete path
    svg.selectAll('.density-a-path').remove()
    svg.selectAll('.density-b-path').remove()
  } else {
    // Axis Label
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
        `translate(${chartW - canvasWidth + margin.left / 3 + 4}, ${
          chartSize.height / 2
        }) rotate(-90)`,
      )
      .text('Density')

    // Axis
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${chartSize.height})`)
      .style('font-size', '12px')
      .call(d3.axisBottom(x))

    svg
      .append('g')
      .attr('class', 'y-axis')
      .style('font-size', '12px')
      .call(d3.axisLeft().scale(y).ticks(5))
  }

  // Draw
  svg
    .append('path')
    .attr('class', 'density-a-path')
    .datum(densityA)
    .attr('fill', '#30336b')
    .attr('opacity', '.6')
    .attr('stroke', '#000')
    .attr('stroke-width', 1)
    .attr('stroke-linejoin', 'round')
    .attr('d', (d) => areaGenerator(d, true))
    .transition()
    .duration(800)
    .attr('d', (d) => areaGenerator(d, false))

  svg
    .append('path')
    .attr('class', 'density-b-path')
    .datum(densityB)
    .attr('fill', '#ff7979')
    .attr('opacity', '.6')
    .attr('stroke', '#000')
    .attr('stroke-width', 1)
    .attr('stroke-linejoin', 'round')
    .attr('d', null)
    .attr('d', (d) => areaGenerator(d, true))
    .transition()
    .duration(800)
    .attr('d', (d) => areaGenerator(d, false))
}
