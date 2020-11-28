import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteStock, showStock } from '../redux/action'

export const StockItem = ({ stock }) => {

    const dispatch = useDispatch()

    const deleteHandler = (event) => {
        dispatch(deleteStock(event.currentTarget.getAttribute('data-id')))
    }
    const showHandler = (event) => {
        dispatch(showStock(event.currentTarget.getAttribute('data-id')))
    }
    
    return (
        <div className="list-item" data-id={stock.chart.result[0].meta.symbol} onClick={showHandler}>
            <div className="info">
                <div>{stock.chart.result[0].meta.symbol}</div>
                <div>{stock.chart.result[0].meta.regularMarketPrice}</div>
              
            </div>
            <div className="action"></div>
            <div className="btn" data-id={stock.chart.result[0].meta.symbol} onClick={deleteHandler}>
                <span className="material-icons-round">close</span>
            </div>
        </div>
    )
}