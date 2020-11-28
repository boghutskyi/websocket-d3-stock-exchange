import React from 'react'
import { useSelector } from 'react-redux'
import { Chart } from './Chart'
import { Loader } from './Loader'

export const Graph = () => {
    const stockName = useSelector(state => {
        return state.stocks.activeStock.length && state.stocks.activeStock[0].chart.result[0].meta.symbol
    })
    const loading = useSelector(state => state.app.loading)
    const chart = useSelector(state => state.stocks.activeStock[0])

    return (
        <div className="row">
            <div className="header">
                <div className="stock-description">Stock Exchange</div>
                <div className="stock-name">{stockName || 'Stock name'}</div>
            </div>
            {loading && <Loader />}
            {chart && <Chart />}
            
        </div>
    )
}