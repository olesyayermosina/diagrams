const data = [
    { year: 2024, count: 5000 },
    { year: 2025, count: 4900 },
    { year: 2026, count: 4800 },
    { year: 2027, count: 4700 },
    { year: 2028, count: 4600 },
    { year: 2029, count: 4500 },
    { year: 2030, count: 4400 },
    { year: 2031, count: 4300 },
    { year: 2032, count: 4200 },
    { year: 2033, count: 4100 }
];

const svgWidth = 1000;
const svgHeight = 600;
const margin = { top: 50, right: 50, bottom: 70, left: 70 };
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

const svg = d3.select('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

const xScale = d3.scaleBand().range([0, width]).domain(data.map(d => d.year)).padding(0.4);
const yScale = d3.scaleLinear().range([height, 0]).domain([0, d3.max(data, d => d.count)]);

svg.append('g')
    .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
    .call(d3.axisBottom(xScale))
    .append('text')
    .attr('x', width / 2)
    .attr('y', 40)
    .attr('text-anchor', 'middle')
    .attr('fill', 'black')
    .attr('font-size', '14px')
    .text('Рік');

svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .call(d3.axisLeft(yScale))
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', -50)
    .attr('x', -height / 2)
    .attr('text-anchor', 'middle')
    .attr('fill', 'black')
    .attr('font-size', '14px')
    .text('Кількість навчальних закладів');

const gradient = svg.append('defs')
    .append('linearGradient')
    .attr('id', 'bar-gradient')
    .attr('x1', '0%')
    .attr('y1', '0%')
    .attr('x2', '0%')
    .attr('y2', '100%');

gradient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', '#f68080');

gradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', '#f9b16e');

svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => xScale(d.year) + margin.left)
    .attr('y', d => yScale(d.count) + margin.top)
    .attr('width', xScale.bandwidth())
    .attr('height', d => height - yScale(d.count))
    .attr('fill', 'url(#bar-gradient)');

svg.selectAll('.text')
    .data(data)
    .enter()
    .append('text')
    .attr('class', 'label')
    .attr('x', d => xScale(d.year) + margin.left + xScale.bandwidth() / 2)
    .attr('y', d => yScale(d.count) + margin.top - 5)
    .attr('font-family', 'sans-serif')
    .attr('font-size', '12px')
    .attr('fill', 'black')
    .attr('text-anchor', 'middle')
    .text(d => d.count);
