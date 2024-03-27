const data = [
    { department: 'Підрозділ 1', count: 25 },
    { department: 'Підрозділ 2', count: 22 },
    { department: 'Підрозділ 3', count: 28 },
    { department: 'Підрозділ 4', count: 26 },
    { department: 'Підрозділ 5', count: 23 },
    { department: 'Підрозділ 6', count: 27 }
];

const svgWidth = 1000;
const svgHeight = 600;
const margin = { top: 50, right: 50, bottom: 70, left: 70 };
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

const xScale = d3.scaleBand()
    .domain(data.map(d => d.department))
    .range([0, width])
    .padding(0.2);

const yScale = d3.scaleLinear()
    .domain([0, 50])
    .range([height, 0]);

const svg = d3.select('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

const gradient = svg.append('defs')
    .append('linearGradient')
    .attr('id', 'bar-gradient')
    .attr('x1', '0%')
    .attr('y1', '0%')
    .attr('x2', '0%')
    .attr('y2', '100%');

gradient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', '#f4762d');

gradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', '#ffd78a');

svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => xScale(d.department))
    .attr('y', d => yScale(d.count))
    .attr('width', xScale.bandwidth())
    .attr('height', d => height - yScale(d.count))
    .attr('fill', 'url(#bar-gradient)')
    .append('title')
    .text(d => d.count);

svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('x', d => xScale(d.department) + xScale.bandwidth() / 2)
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
    .attr('font-size', '14px');

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