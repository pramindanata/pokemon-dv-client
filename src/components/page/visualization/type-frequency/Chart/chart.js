import { axisBottom, axisLeft, scaleLinear, scaleBand, max } from 'd3'
import d3Tip from 'd3-tip'

export const canvasSize = {
  height: 350,
}

export const margin = {
  top: 10,
  bottom: 50,
  right: 10,
  left: 60,
}

export const chartSize = {
  height: canvasSize.height - margin.top - margin.bottom,
}

export const draw = (svg, data, canvasWidth, xLabel, update = false) => {
  function setAxisYTicks(y, size) {
    return axisLeft()
      .scale(y)
      .tickFormat((d) => d)
      .tickSize(size)
  }

  const chartW = canvasWidth - margin.left - margin.right
  let bar = null

  const x = scaleBand()
    .domain(data.map((d) => d.type))
    .range([0, chartW])
    .padding(0.1)

  const y = scaleLinear()
    .domain([0, max(data.map((d) => d.count))])
    .range([chartSize.height, 0])

  const tip = d3Tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html((d) => {
      return `<strong>Frequency:</strong> <span style='color:red'>${d.count}</span>`
    })

  svg.call(tip)

  if (update) {
    bar = svg.selectAll('.bar').data(data)

    bar.exit().remove()

    // Must recreate new bar if received more data
    bar
      .enter()
      .append('g')
      .attr('class', 'bar')
      .append('rect')
      .attr('class', 'rect')

    // MUST SELECT ALL BAR FIRST
    bar = svg.selectAll('.bar')

    svg.selectAll('.x-axis').call(axisBottom(x))
    svg.selectAll('.y-axis').call(setAxisYTicks(y, -chartW))
  } else {
    svg
      .append('g')
      .attr('class', 'x-axis')
      .style('font-size', '12px')
      .attr('transform', `translate(0, ${chartSize.height})`)
      .call(axisBottom(x))

    svg
      .append('g')
      .attr('class', 'y-axis grid')
      .style('font-size', '12px')
      .call(setAxisYTicks(y, -chartW))

    bar = svg
      .selectAll('.bar')
      .data(data)
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
        `translate(${chartW - canvasWidth + margin.left / 3 + 4}, ${
          chartSize.height / 2
        }) rotate(-90)`,
      )
      .text('Frequency')
  }

  bar
    .select('rect')
    .attr('x', (d) => x(d.type))
    .attr('y', (d) => chartSize.height)
    .attr('width', x.bandwidth())
    .attr('height', 0)
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)

  bar
    .select('rect')
    .transition()
    .duration(800)
    .attr('y', (d) => y(d.count))
    .attr('height', (d) => chartSize.height - y(d.count))
}
