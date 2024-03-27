const data = [
    { age: '18 - 20 років', count: 10 },
    { age: '21 - 25 років', count: 12 },
    { age: '26 - 30 років', count: 15 },
    { age: '31 - 35 років', count: 25 },
    { age: '36 - 40 років', count: 9 },
    { age: '41 - 45 років', count: 10 },
    { age: '46 - 50 років', count: 8 },
    { age: '51 рік і більше', count: 5 },
];

const svgWidth = 1000;
const svgHeight = 600;
const margin = { top: 50, right: 50, bottom: 70, left: 70 };
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

const xScale = d3.scaleBand()
    .domain(data.map(d => d.age))
    .range([0, width])
    .padding(0.2);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([height, 0]);

const svg = d3.select('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

const colors = d3.scaleOrdinal(d3.schemeCategory10);
svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => xScale(d.age))
    .attr('y', d => yScale(d.count))
    .attr('width', xScale.bandwidth())
    .attr('height', d => height - yScale(d.count))
    .attr('fill', (d, i) => colors(i))
    .append('title')
    .text(d => d.count);

svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('x', d => xScale(d.age) + xScale.bandwidth() / 2)
    .attr('y', d => yScale(d.count) + 20)
    .attr('text-anchor', 'middle')
    .attr('font-weight', 'bold')
    .attr('font-size', '24px')
    .attr('fill', 'white')
    .text(d => d.count + '%');

svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale))
    .append('text')
    .attr('x', width / 2)
    .attr('y', 40)
    .attr('text-anchor', 'middle')
    .attr('fill', 'black')
    .attr('font-size', '14px')
    .text('Вікова група');

svg.append('g')
    .call(d3.axisLeft(yScale).ticks(10))
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', -60)
    .attr('x', -height / 2)
    .attr('dy', '1em')
    .attr('text-anchor', 'middle')
    .attr('fill', 'black')
    .attr('font-size', '14px')
    .text('Рівень плинності кадрів (%)');