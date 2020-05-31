import * as d3 from 'd3'
import d3Tip from 'd3-tip'

export const canvasSize = {
  height: 800,
}

export const margin = {
  top: 10,
  bottom: 50,
  right: 10,
  left: 80,
}

export const chartSize = {
  height: canvasSize.height - margin.top - margin.bottom,
}

function getJitterData(data) {
  const flattenData = []

  for (let i = 0; i < data.length; i++) {
    const key = data[i].type
    const values = data[i].values

    for (let j = 0; j < values.length; j++) {
      flattenData.push({
        key,
        value: values[j],
      })
    }
  }

  return flattenData
}

export const draw = (
  svg,
  data,
  canvasWidth,
  update = false,
  enableJitter = false,
) => {
  const chartW = canvasWidth - margin.left - margin.right
  let maxInAll = 0

  const sumStat = d3
    .nest()
    .key((d) => d.type)
    .rollup((d) => {
      const values = d[0].values
      const sortedValues = values.sort((a, b) => a - b)
      const q1 = d3.quantile(sortedValues, 0.25)
      const median = d3.quantile(sortedValues, 0.5)
      const q3 = d3.quantile(sortedValues, 0.75)
      const interQuantileRange = q3 - q1
      const min = sortedValues[0]
      const max = sortedValues[sortedValues.length - 1]

      if (maxInAll < max) {
        maxInAll = max
      }

      return {
        q1,
        median,
        q3,
        interQuantileRange,
        min,
        max,
      }
    })
    .entries(data)

  const y = d3
    .scaleBand()
    .range([chartSize.height, 0])
    .domain(sumStat.map((s) => s.key))
    .padding(0.4)

  const x = d3.scaleLinear().domain([0, maxInAll]).range([0, chartW])

  let whisker = null
  let box = null
  let medianLine = null
  let jitter = null
  const jitterWidth = 15

  if (update) {
    svg.selectAll('.x-axis').call(d3.axisBottom(x))
    svg.selectAll('.y-axis').call(d3.axisLeft(y))

    whisker = svg.selectAll('.whisker').data(sumStat)
    box = svg.selectAll('.box').data(sumStat)
    medianLine = svg.selectAll('.median-line').data(sumStat)

    whisker.exit().remove()
    box.exit().remove()
    medianLine.exit().remove()

    whisker.enter().append('line').attr('class', 'whisker')
    box.enter().append('rect').attr('class', 'bar box')
    medianLine.enter().append('line').attr('class', 'median-line')

    whisker = svg.selectAll('.whisker')
    box = svg.selectAll('.box')
    medianLine = svg.selectAll('.median-line')

    if (enableJitter) {
      jitter = svg.selectAll('.jitter').data(getJitterData(data))
      jitter.exit().remove()
      jitter.enter().append('circle').attr('class', 'jitter')
      jitter = svg.selectAll('.jitter')
    } else {
      svg.selectAll('.jitter').data([]).exit().remove()
    }
  } else {
    svg
      .append('g')
      .attr('class', 'y-axis')
      .style('font-size', '12px')
      .call(d3.axisLeft(y))
    svg
      .append('g')
      .attr('class', 'x-axis')
      .style('font-size', '12px')
      .attr('transform', `translate(0, ${chartSize.height})`)
      .call(d3.axisBottom(x))

    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr(
        'transform',
        `translate(${chartW / 2}, ${canvasSize.height - margin.bottom / 3})`,
      )
      .text('Stat')

    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr(
        'transform',
        `translate(${chartW - canvasWidth + margin.left / 4 + 4}, ${
          chartSize.height / 2
        }) rotate(-90)`,
      )
      .text('Type')

    whisker = svg
      .selectAll('vertLines')
      .data(sumStat)
      .enter()
      .append('line')
      .attr('class', 'whisker')

    box = svg
      .selectAll('boxes')
      .data(sumStat)
      .enter()
      .append('rect')
      .attr('class', 'bar box')

    medianLine = svg
      .selectAll('medianLines')
      .data(sumStat)
      .enter()
      .append('line')
      .attr('class', 'median-line')

    if (enableJitter) {
      jitter = svg
        .selectAll('indPoints')
        .data(getJitterData(data))
        .enter()
        .append('circle')
        .attr('class', 'jitter')
    }
  }

  // Whisker
  whisker
    .attr('x1', (d) => x(d.value.min))
    .attr('x2', (d) => x(d.value.max))
    .attr('y1', (d) => y(d.key) + y.bandwidth() / 2)
    .attr('y2', (d) => y(d.key) + y.bandwidth() / 2)
    .attr('stroke', 'black')
    .style('width', 40)

  // Quartile Box
  box
    .attr('x', (d) => x(d.value.q1))
    .attr('width', (d) => x(d.value.q3) - x(d.value.q1))
    .attr('y', (d) => y(d.key))
    .attr('height', y.bandwidth())
    .attr('stroke', 'black')

  // Median line
  medianLine
    .attr('y1', (d) => y(d.key))
    .attr('y2', (d) => y(d.key) + y.bandwidth())
    .attr('x1', (d) => x(d.value.median))
    .attr('x2', (d) => x(d.value.median))
    .attr('height', y.bandwidth())
    .attr('stroke', 'black')
    .style('width', 80)

  const tip = d3Tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html((d) => {
      return `<strong>Stat:</strong> <span style='color:red'>${d.value}</span>`
    })

  svg.call(tip)

  if (enableJitter) {
    jitter
      .attr('cx', (d) => x(d.value))
      .attr('cy', (d) => {
        return (
          y(d.key) +
          y.bandwidth() / 2 -
          jitterWidth / 2 +
          Math.random() * jitterWidth
        )
      })
      .attr('r', 2)
      .attr('stroke', 'black')
      .style('fill', '#dff9fb')
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
  }
}
