const data = [
    { year: '2014', price: 21 },
    { year: '2015', price: 20 },
    { year: '2016', price: 17 },
    { year: '2017', price: 15 },
    { year: '2018', price: 13 },
    { year: '2019', price: 11 },
    { year: '2020', price: 10 },
    { year: '2021', price: 7 },
    { year: '2022', price: 5 },
    { year: '2023', price: 2 },
];

const svgWidth = 1000;
const svgHeight = 600;
const margin = { top: 50, right: 50, bottom: 70, left: 70 };
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

const svg = d3.select('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

const xScale = d3.scaleBand()
    .domain(data.map(d => d.year))
    .range([0, width])
    .padding(0.4);

const yScale = d3.scaleLinear()
    .domain([0, 30])
    .range([height, 0]);

const line = d3.line()
    .x(d => xScale(d.year) + xScale.bandwidth() / 2)
    .y(d => yScale(d.price));

svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale))
    .append('text')
    .attr('x', width / 2)
    .attr('y', 40)
    .attr('text-anchor', 'middle')
    .attr('fill', 'black')
    .attr('font-size', '14px')
    .text('Рік');

svg.append('g')
    .call(d3.axisLeft(yScale))
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', -50)
    .attr('x', -height / 2)
    .attr('dy', '1em')
    .attr('text-anchor', 'middle')
    .attr('fill', 'black')
    .attr('font-size', '14px')
    .text('Прибутковість акцій (%)');

svg.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', '#c5302e')
    .attr('stroke-width', 2)
    .attr('d', line);

svg.selectAll('.dot')
    .data(data)
    .enter().append('circle')
    .attr('class', 'dot')
    .attr('cx', d => xScale(d.year) + xScale.bandwidth() / 2)
    .attr('cy', d => yScale(d.price))
    .attr('r', 5)
    .attr('fill', '#4a313e');

svg.selectAll('.text')
    .data(data)
    .enter().append('text')
    .attr('class', 'text')
    .attr('x', d => xScale(d.year) + xScale.bandwidth() / 2)
    .attr('y', d => yScale(d.price) - 10)
    .attr('text-anchor', 'middle')
    .attr('fill', 'black')
    .attr('font-size', '14px')
    .text(d => `${d.price}%`);