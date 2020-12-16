import React from 'react'
import { io } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { deleteStock, hideStock, showStock, updateStock } from '../redux/action'

export const StockItem = ({ stock }) => {

    const dispatch = useDispatch()
    const stocks = useSelector(state => state.stocks.stocks)
    const activeStock = useSelector(state => state.stocks.activeStock)

    const socket = io('https://www.alphavantage.co', {
        path: `/query?function=TIME_SERIES_INTRADAY&symbol=${stock.data["Meta Data"]["2. Symbol"]}&interval=5min&apikey=9RIZRNZXIP6DCYIL`,
        reconnectionDelay: 4000,
        reconnectionDelayMax: 6000,
        reconnectionAttempts: 5
    })
    socket.on('connect', () => {
        console.log(socket.id)
    })
    socket.on('data', json => dispatch(updateStock({id: stock.id, data: json})))

    const deleteHandler = (event) => {
        event.stopPropagation()
        const id = event.currentTarget.getAttribute('data-id')
        dispatch(deleteStock(id))
        if (stocks.length === 1) {
            return dispatch(hideStock())
        }
        if (activeStock[0].id === id) {
            dispatch(showStock(stocks[stocks.indexOf(stock) - 1].id))  //previous index of deeted element
        }
    }
    const showHandler = (event) => { dispatch(showStock(event.currentTarget.getAttribute('data-id'))) }

    const low = Object.values(stock.data["Time Series (5min)"]) //Whole array
    const value = parseFloat(low[99]["3. low"]).toFixed(2) //Current latest value

    return (
        <div className="list-item" data-id={stock.id} onClick={showHandler}>
            <div className="list-item-info">
                <div>{stock.data["Meta Data"]["2. Symbol"]}</div>
                <div className={low[99]["3. low"] - low[0]["3. low"] < 0
                    ? "red"
                    : "green"}>{value}</div>
            </div>
            <div className="btn" data-id={stock.id} onClick={deleteHandler}>
                <span className="material-icons-round">close</span>
            </div>
        </div>
    )
}