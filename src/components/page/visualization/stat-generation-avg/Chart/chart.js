import * as d3 from 'd3'
import d3Tip from 'd3-tip'

export const canvasSize = {
  height: 225,
}

export const margin = {
  top: 10,
  bottom: 45,
  right: 10,
  left: 55,
}

export const chartSize = {
  width: canvasSize.width - margin.left - margin.right,
  height: canvasSize.height - margin.top - margin.bottom,
}

export const draw = (svg, data, canvasWidth, update = false) => {
  const chartW = canvasWidth - margin.left - margin.right
  const min = d3.min(data, (d) => d.total)
  const max = d3.max(data, (d) => d.total)

  const x = d3
    .scalePoint()
    .domain(data.map((d) => d.generation))
    .range([0, chartW])
    .padding(0.5)
  const y = d3
    .scaleLinear()
    .domain([min > 3 ? min - 3 : min, max])
    .range([chartSize.height, 0])

  const tip = d3Tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html((d) => {
      return `<strong>Average:</strong> <span style='color:red'>${d.total.toFixed(
        2,
      )}</span>`
    })

  svg.call(tip)

  if (update) {
    svg.selectAll('.x-axis').call(d3.axisBottom(x))
    svg.selectAll('.y-axis').call(d3.axisLeft().scale(y).ticks(5))

    // Delete path
    svg.selectAll('.line').remove()
    svg.selectAll('.jitter').remove()
    svg.selectAll('.curtain').remove()
  } else {
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr(
        'transform',
        `translate(${chartW / 2}, ${canvasSize.height - margin.bottom / 3})`,
      )
      .text('Generation')

    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr(
        'transform',
        `translate(${chartW - canvasWidth + margin.left / 2 + 4}, ${
          chartSize.height / 2
        }) rotate(-90)`,
      )
      .text('Average')

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${chartSize.height})`)
      .call(d3.axisBottom(x))
    svg
      .append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft().scale(y).ticks(5))
  }

  svg
    .append('path')
    .datum(data)
    .attr('class', 'line')
    .attr('stroke', '#ff7979')
    .attr('fill', 'none')
    .attr('stroke-width', 1.5)
    .attr(
      'd',
      d3
        .line()
        .x((d) => x(d.generation))
        .y((d) => y(d.total)),
    )

  svg
    .selectAll('indPoints')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'jitter')
    .attr('cx', (d) => x(d.generation))
    .attr('cy', (d) => y(d.total))
    .attr('r', 4)
    .attr('stroke', 'white')
    .style('fill', '#30336b')
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)

  svg
    .append('rect')
    .attr('x', -1 * chartW - 5)
    .attr('y', -1 * chartSize.height)
    .attr('height', chartSize.height + 5)
    .attr('width', chartW)
    .attr('class', 'curtain')
    .attr('transform', 'rotate(180)')
    .style('fill', '#ffffff')

  svg.transition().duration(2500).select('rect.curtain').attr('width', 0)
}
