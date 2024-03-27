const data = [
    { category: 'Категорія 1', income: 20, salary: 20 },
    { category: 'Категорія 2', income: 30, salary: 30 },
    { category: 'Категорія 3', income: 40, salary: 40 },
    { category: 'Категорія 4', income: 50, salary: 50 },
    { category: 'Категорія 5', income: 60, salary: 60 }
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
    .domain(data.map(d => d.category))
    .range([0, width])
    .padding(0.2);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.income)])
    .range([height, 0]);

const gradient = svg.append('defs')
    .append('linearGradient')
    .attr('id', 'gradient')
    .attr('x1', '0%')
    .attr('y1', '0%')
    .attr('x2', '100%')
    .attr('y2', '0%');

gradient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', '#12b3eb')
    .attr('stop-opacity', 1);

gradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', '#5460f9')
    .attr('stop-opacity', 1);

svg.selectAll('.incomeBar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'incomeBar')
    .attr('x', d => xScale(d.category))
    .attr('y', d => yScale(d.income))
    .attr('width', xScale.bandwidth())
    .attr('height', d => height - yScale(d.income))
    .attr('fill', 'url(#gradient)');

const yScaleSalary = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.salary)])
    .range([height, 0]);

const line = d3.line()
    .x(d => xScale(d.category) + xScale.bandwidth() / 2)
    .y(d => yScaleSalary(d.salary));

svg.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', '#c81d77')
    .attr('stroke-width', 2)
    .attr('d', line);

svg.selectAll('.dot')
    .data(data)
    .enter().append('circle')
    .attr('class', 'dot')
    .attr('cx', d => xScale(d.category) + xScale.bandwidth() / 2)
    .attr('cy', d => yScaleSalary(d.salary))
    .attr('r', 5)
    .attr('fill', '#c81d77');

svg.selectAll('.text')
    .data(data)
    .enter().append('text')
    .attr('class', 'incomeLabel')
    .attr('x', d => xScale(d.category) + xScale.bandwidth() / 2)
    .attr('y', d => yScale(d.income) + 55)
    .attr('text-anchor', 'middle')
    .attr('font-weight', 'bold')
    .attr('font-size', '24px')
    .attr('fill', 'white')
    .text(d => d.income);

svg.selectAll('.text')
    .data(data)
    .enter().append('text')
    .attr('class', 'dotLabel')
    .attr('x', d => xScale(d.category) + xScale.bandwidth() / 2)
    .attr('y', d => yScaleSalary(d.salary) - 10)
    .attr('text-anchor', 'middle')
    .attr('font-size', '18px')
    .attr('fill', 'black')
    .text(d => d.salary);

svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

svg.append('g')
    .call(d3.axisLeft(yScale));

const legend = svg.append('g')
    .attr('transform', `translate(${width - 200}, ${height + 30})`);

legend.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 20)
    .attr('height', 20)
    .attr('fill', '#5460f9');

legend.append('text')
    .attr('x', 30)
    .attr('y', 15)
    .text('Дохід')
    .attr('fill', 'black');

legend.append('rect')
    .attr('x', 100)
    .attr('y', 0)
    .attr('width', 20)
    .attr('height', 20)
    .attr('fill', '#c81d77');

legend.append('text')
    .attr('x', 130)
    .attr('y', 15)
    .text('Зарплата');