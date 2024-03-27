const data = [
    { type: 'A-92', price: 23, quality: 75 },
    { type: 'A-95', price: 32, quality: 88 },
    { type: 'A-98', price: 45, quality: 70 },
    { type: 'ДТ', price: 30, quality: 95 }
];

const svgWidth = 1000;
const svgHeight = 600;
const margin = { top: 50, right: 50, bottom: 100, left: 70 };
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

const xScale = d3.scaleBand()
    .domain(data.map(d => d.type))
    .range([0, width])
    .padding(0.2);

const yScalePrice = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0]);

const yScaleQuality = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0]);

const svg = d3.select('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

svg.selectAll('.priceBar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'priceBar')
    .attr('x', d => xScale(d.type))
    .attr('y', d => yScalePrice(d.price))
    .attr('width', xScale.bandwidth() / 2)
    .attr('height', d => height - yScalePrice(d.price))
    .attr('fill', '#6e78ff');

svg.selectAll('.qualityBar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'qualityBar')
    .attr('x', d => xScale(d.type) + xScale.bandwidth() / 2)
    .attr('y', d => yScaleQuality(d.quality))
    .attr('width', xScale.bandwidth() / 2)
    .attr('height', d => height - yScaleQuality(d.quality))
    .attr('fill', '#30c67c');

svg.selectAll('.text')
    .data(data)
    .enter()
    .append('text')
    .attr('x', d => xScale(d.type) + xScale.bandwidth() / 2 - 40)
    .attr('y', d => yScalePrice(d.price) + 20)
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .attr('font-size', '18px')
    .attr('font-weight', 'bold')
    .text(d => d.price + ' грн');

svg.selectAll('.text')
    .data(data)
    .enter()
    .append('text')
    .attr('x', d => xScale(d.type) + xScale.bandwidth() / 2 + 40)
    .attr('y', d => yScaleQuality(d.quality) + 20)
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .attr('font-size', '18px')
    .attr('font-weight', 'bold')
    .text(d => d.quality + '%');

svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale))
    .append('text')
    .attr('x', width / 2)
    .attr('y', 40)
    .attr('text-anchor', 'middle')
    .attr('fill', 'black')
    .attr('font-size', '14px')
    .text('Сорт бензину');

svg.append('g')
    .call(d3.axisLeft(yScalePrice).ticks(10))
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', -50)
    .attr('x', -height / 2)
    .attr('dy', '1em')
    .attr('text-anchor', 'middle')
    .attr('fill', 'black')
    .attr('font-size', '14px');

const legend = svg.append('g')
    .attr('transform', `translate(${width / 2 - 100}, ${height + 50})`);

legend.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 20)
    .attr('height', 20)
    .attr('fill', '#6e78ff');

legend.append('text')
    .attr('x', 30)
    .attr('y', 15)
    .text('Ціна за літр (грн)');

legend.append('rect')
    .attr('x', 150)
    .attr('y', 0)
    .attr('width', 20)
    .attr('height', 20)
    .attr('fill', '#30c67c');

legend.append('text')
    .attr('x', 180)
    .attr('y', 15)
    .text('Якість (%)');