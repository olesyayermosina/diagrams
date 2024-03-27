const data = [
    { experience: '0-5 років', bonus: 10 },
    { experience: '6-10 років', bonus: 15 },
    { experience: '10-15 років', bonus: 9 },
    { experience: '16-20 років', bonus: 12 },
    { experience: '21 рік і більше', bonus: 11 }
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
    .domain(data.map(d => d.experience))
    .range([0, width])
    .padding(0.4);

const yScale = d3.scaleLinear()
    .domain([0, 30])
    .range([height, 0]);

const line = d3.line()
    .x(d => xScale(d.experience) + xScale.bandwidth() / 2)
    .y(d => yScale(d.bonus));

svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale))
    .append('text')
    .attr('x', width / 2)
    .attr('y', 40)
    .attr('text-anchor', 'middle')
    .attr('fill', 'black')
    .attr('font-size', '14px')
    .text('Трудовий стаж');

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
    .text('Розмір надбавки (%)');

svg.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', '#d397fa')
    .attr('stroke-width', 2)
    .attr('d', line);

svg.selectAll('.dot')
    .data(data)
    .enter().append('circle')
    .attr('class', 'dot')
    .attr('cx', d => xScale(d.experience) + xScale.bandwidth() / 2)
    .attr('cy', d => yScale(d.bonus))
    .attr('r', 5)
    .attr('fill', '#8364e8');

svg.selectAll('.text')
    .data(data)
    .enter().append('text')
    .attr('class', 'text')
    .attr('x', d => xScale(d.experience) + xScale.bandwidth() / 2)
    .attr('y', d => yScale(d.bonus) - 10)
    .attr('text-anchor', 'middle')
    .attr('fill', 'black')
    .attr('font-size', '14px')
    .text(d => `${d.bonus}%`);