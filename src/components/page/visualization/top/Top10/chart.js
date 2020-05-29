import * as d3 from 'd3'
import d3Tip from 'd3-tip'

export const canvasSize = {
  width: 800,
  height: 500,
}

export const margin = {
  top: 0,
  bottom: 50,
  right: 30,
  left: 175,
}

export const chartSize = {
  width: canvasSize.width - margin.left - margin.right,
  height: canvasSize.height - margin.top - margin.bottom,
}

export const redraw = (svg, data) => {
  data.reverse()

  function setAxisTick(axis, size) {
    return d3
      .axisBottom()
      .scale(axis)
      .tickFormat((d) => d)
      .tickSize(size)
  }

  const tip = d3Tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html((d) => {
      return `<strong>Stat:</strong> <span style='color:red'>${d.stat}</span>`
    })

  const x = d3
    .scaleLinear()
    .domain([0, d3.max(data.map((d) => d.stat))])
    .range([0, chartSize.width])

  const y = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([chartSize.height, 0])
    .padding(0.1)

  if (d3.select('.x-axis').empty()) {
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('class', 'grid')
      .style('font-size', '12px')
      .attr('transform', `translate(0, ${chartSize.height})`)
      .call(setAxisTick(x, -chartSize.height))

    svg
      .append('g')
      .style('font-size', '12px')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y))
  } else {
    svg.selectAll('.x-axis').call(setAxisTick(x, -chartSize.height))
    svg.selectAll('.y-axis').call(d3.axisLeft(y))
  }

  svg.call(tip)

  svg
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .style('fill', '#ff7979')
    // .attr('x', (d) => x(d.value))
    .attr('y', (d) => y(d.name))
    .attr('width', 0)
    .attr('height', y.bandwidth())
    .attr('desc', 'yeet')
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)

  svg
    .selectAll('rect')
    .transition()
    .duration(800)
    .attr('width', (d) => x(d.stat))
  // .delay((d, i) => i * 100)

  svg.exit().remove()

  svg
    .append('text')
    .attr('text-anchor', 'middle')
    .attr(
      'transform',
      `translate(${chartSize.width / 2}, ${
        canvasSize.height - margin.bottom / 3
      })`,
    )
    .text('Stat')

  svg
    .append('text')
    .attr('text-anchor', 'middle')
    .attr(
      'transform',
      `translate(${chartSize.width - canvasSize.width + margin.left / 3}, ${
        chartSize.height / 2
      }) rotate(-90)`,
    )
    .text('Pokemon')
}
