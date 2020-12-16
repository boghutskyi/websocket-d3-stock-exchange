import React, { useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import * as d3 from 'd3'
import { useWindowSize } from '../hooks/useWindowSize'

export const Chart = () => {

    const [windowWidth, windowHeight] = useWindowSize();
    
    let color;

    const timestamp = useSelector(state => state.stocks.activeStock.length && Object.keys(state.stocks.activeStock[0].data["Time Series (5min)"]).reverse())
    const low = useSelector(state => state.stocks.activeStock.length && Object.values(state.stocks.activeStock[0].data["Time Series (5min)"]))
    
    const difference = low[99]["3. low"] - low[0]["3. low"] 
    
    if (difference < 0) {
        color = '#EB5757'
    } else {
        color = '#27AE60'
    }

    const drawHandler = useCallback(() => {

        d3.select('svg').remove()

        let data = []
        timestamp.map((item, index) => {
            if (!low[index]) {
                return null
            }
            return data.push({ dataX: Date.parse(item), dataY: parseFloat(low[index]["3. low"]) })
        })
        const margin = { top: 10, right: 30, bottom: 30, left: 50 }

        let width;
        let height = windowHeight - 150 - margin.top - margin.bottom

        if (windowWidth > 1200) {
            width = 1140 - 271
        } else if (windowWidth > 992 && windowWidth < 1199.98) {
            width = 960 - 271
        } else if (windowWidth > 768 && windowWidth < 991.98) {
            width = 720 - 271
        } else if (windowWidth > 576 && windowWidth < 767.98) {
            width = 500
        } else {
            width = windowWidth - 50
        }

        width = width - 20 - margin.left - margin.right

        const svg = d3
            .select('#chart')
            .append('svg')
            .attr('class', 'axis')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)

        //START OF AXIS

        const x = d3
            .scaleTime()
            .domain(d3.extent(data, d => d.dataX))
            .range([0, width])

        svg.append('g').attr('class', 'axis').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x).ticks(5).tickSizeOuter(0))

        const y = d3
            .scaleLinear()
            .domain([d3.min(data, d => d.dataY), d3.max(data, d => d.dataY)])
            .range([height, 0])

        svg.append('g').attr('class', 'axis').call(d3.axisLeft(y).tickSizeOuter(0))

        function makeXGridlines() {
            return d3.axisBottom(x).ticks(5)
        }
        svg.append('g').attr('class', 'axis').attr('transform', `translate(0, ${height})`).call(makeXGridlines().tickSize(-height).tickFormat('')
        )

        function makeYGridlines() {
            return d3.axisLeft(y).ticks(5)
        }

        svg.append('g').attr('class', 'axis').call(makeYGridlines().tickSize(-width).tickFormat(''))

        //END OF AXIS

        const linearGradient = svg.append('defs')
            .append('linearGradient')
            .attr('id', 'linear-gradient')
            .attr('gradientTransform', 'rotate(90)')

        linearGradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', color)

        linearGradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', 'rgba(0,0,0,0)')

        svg.append('path')
            .datum(data)
            .attr('fill', 'url(#linear-gradient)')
            .attr('fill-opacity', 0.7)
            .attr('d', d3.area()
                .x(d => x(d.dataX))
                .y0(height)
                .y1(d => y(d.dataY))
            )
        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', color)
            .attr('stroke-linejoin', 'round')
            .attr('stroke-width', 2)
            .attr('d', d3.line()
                .x(d => x(d.dataX))
                .y(d => y(d.dataY)))

        const bisect = d3.bisector(d => d.dataX).left

        const focusLine = svg.append('g')
            .append('rect')
            .attr('width', 2)
            .attr('height', height)
            .attr('transform', 'translate(-1, 0)')
            .style('opacity', 0)
            .style('fill', color)

        const focus = svg.append('g')
            .append('circle')
            .style('fill', color)
            .attr('stroke', '#F2F2F2')
            .attr('stroke-width', 1)
            .attr('r', 6)
            .style('opacity', 0)

        const focusTextBg = svg.append('g')
            .append('rect')
            .attr('width', 55)
            .attr('height', 22)
            .attr('transform', 'translate(-27, 23)')
            .style('opacity', 0)
            .style('fill', '#F2F2F2')
            .style('stroke', color)
            .attr('rx', '7')
            .attr('ry', '7')
            .style('stroke-width', 2)

        const focusText = svg.append('g')
            .append('text')
            .style('opacity', 0)
            .style('font-size', 14)
            .style('fill', color)
            .attr('transform', 'translate(0, 40)')
            .attr('text-anchor', 'middle')
            .attr('aligment-baseline', 'middle')

        svg.append('rect')
            .style('fill', 'none')
            .style('pointer-events', 'all')
            .attr('width', width)
            .attr('height', height)
            .on('mouseover', mouseover)
            .on('mousemove', mousemove)
            .on('mouseout', mouseout)

        function mouseover() {
            focus.style('opacity', 1)
            focusLine.style('opacity', 1)
            focusTextBg.style('opacity', 1)
            focusText.style('opacity', 1)
        }
        function mousemove(event) {
            let x0 = x.invert(d3.pointer(event)[0])
            let i = bisect(data, x0, 0)
            let selectedData = data[i]
            focus.attr('cx', x(selectedData.dataX)).attr('cy', y(selectedData.dataY))
            focusLine.attr('x', x(selectedData.dataX))
            focusTextBg.attr('x', x(selectedData.dataX))
            focusText.html(`${(Math.round(selectedData.dataY * 1000) / 1000).toFixed(2)}`).attr('x', x(selectedData.dataX))
        }
        function mouseout() {
            focus.style('opacity', 0)
            focusLine.style('opacity', 0)
            focusTextBg.style('opacity', 0)
            focusText.style('opacity', 0)
        }
    }, [color, low, timestamp, windowHeight, windowWidth])

    useEffect(() => {
        drawHandler()
    }, [low, timestamp, windowWidth, windowHeight, drawHandler])

    return (
        <>
            <div id="chart"></div>
        </>
    )
}