const data = [
    { industry: 'Промисловість', percentage: 43 },
    { industry: 'Сільське господарство', percentage: 22 },
    { industry: 'Торгівля', percentage: 15 },
    { industry: 'Транспорт', percentage: 10 },
    { industry: 'Туризм', percentage: 5 },
    { industry: 'Інше', percentage: 5 }
];

const svgWidth = 1000;
const svgHeight = 600;
const margin = { top: 50, right: 50, bottom: 70, left: 70 };
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;
const radius = Math.min(width, height) / 2;

const svg = d3.select('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

const pie = d3.pie().value(d => d.percentage);

const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

const color = d3.scaleOrdinal(d3.schemeCategory10);
const g = svg.selectAll('.arc')
    .data(pie(data))
    .enter().append('g')
    .attr('class', 'arc');

g.append('path')
    .attr('d', arc)
    .attr('fill', d => color(d.data.industry));

g.append('text')
    .attr('transform', d => `translate(${arc.centroid(d)})`)
    .attr('dy', '.35em')
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .attr('font-weight', 'bold')
    .attr('font-size', '24px')
    .text(d => `${d.data.percentage}%`);

const legend = svg.selectAll('.legend')
    .data(data)
    .enter().append('g')
    .attr('class', 'legend')
    .attr('transform', (d, i) => `translate(${width / 3}, ${i * 30 - height / 6})`);

legend.append('rect')
    .attr('x', 0)
    .attr('width', 20)
    .attr('height', 20)
    .attr('fill', d => color(d.industry));

legend.append('text')
    .attr('x', 30)
    .attr('y', 10)
    .attr('dy', '.35em')
    .attr('fill', 'black')
    .attr('font-size', '16px')
    .text(d => d.industry);
