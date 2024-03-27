const data = [
    { region: 'Захід', births: 15 },
    { region: 'Північ', births: 17 },
    { region: 'Схід', births: 14 },
    { region: 'Південь', births: 16 },
    { region: 'Центр', births: 5 }
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

const xScale = d3.scaleLinear()
    .domain([0, 50])
    .range([0, width]);

const yScale = d3.scaleBand()
    .domain(data.map(d => d.region))
    .range([height, 0])
    .padding(0.4);

const gradient = svg.append('defs')
    .append('linearGradient')
    .attr('id', 'gradient')
    .attr('x1', '0%')
    .attr('y1', '0%')
    .attr('x2', '100%')
    .attr('y2', '0%');

gradient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', '#f4f269')
    .attr('stop-opacity', 1);

gradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', '#5cb270')
    .attr('stop-opacity', 1);

svg.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', 0)
    .attr('y', d => yScale(d.region))
    .attr('width', d => xScale(d.births))
    .attr('height', yScale.bandwidth())
    .attr('fill', 'url(#gradient)');

svg.append('g')
    .call(d3.axisLeft(yScale))
    .selectAll('text')
    .attr('font-size', '14px')
    .attr('fill', 'black');

svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale))
    .append('text')
    .attr('x', width / 2)
    .attr('y', 40)
    .attr('text-anchor', 'middle')
    .attr('fill', 'black')
    .attr('font-size', '14px')
    .text('Народжуваність (на 1000 осіб)');

svg.selectAll('.text')
    .data(data)
    .enter().append('text')
    .attr('class', 'text')
    .attr('x', d => xScale(d.births) + 10)
    .attr('y', d => yScale(d.region) + yScale.bandwidth() / 2 + 5)
    .attr('text-anchor', 'start')
    .attr('fill', 'black')
    .attr('font-weight', 'bold')
    .attr('font-size', '24px')
    .text(d => d.births);