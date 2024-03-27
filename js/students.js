const data = [
    { name: 'Джон Сміт', mark: 99 },
    { name: 'Емма Джонс', mark: 78 },
    { name: 'Макс Браун', mark: 85 },
    { name: 'Олівер Тейлор', mark: 93 },
    { name: 'Софія Міллер', mark: 100 },
    { name: 'Ліам Девіс', mark: 74 },
    { name: 'Емілі Вільсон', mark: 86 },
    { name: 'Емма Моррісон', mark: 90 },
];

const svgWidth = 1000;
const svgHeight = 600;
const margin = { top: 50, right: 50, bottom: 70, left: 130 };
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

const svg = d3.select('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.mark) + 2])
    .range([0, width]);

const yScale = d3.scaleBand()
    .domain(data.map(d => d.name))
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
    .attr('stop-color', '#f9c823')
    .attr('stop-opacity', 1);

gradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', '#fc506e')
    .attr('stop-opacity', 1);

svg.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', 0)
    .attr('y', d => yScale(d.name))
    .attr('width', d => xScale(d.mark))
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
    .text('Успішність (за 100-бальною шкалою)');

svg.selectAll('.text')
    .data(data)
    .enter().append('text')
    .attr('class', 'text')
    .attr('x', d => xScale(d.mark) + 10)
    .attr('y', d => yScale(d.name) + yScale.bandwidth() / 2 + 5)
    .attr('text-anchor', 'start')
    .attr('fill', 'black')
    .attr('font-weight', 'bold')
    .attr('font-size', '24px')
    .text(d => d.mark);