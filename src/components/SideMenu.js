import React, { useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { StockItem } from './StockItem'
import {addStock, showAlert} from '../redux/action'

const SideMenu = () => {
    const dispatch = useDispatch()
    const stocks = useSelector(state => state.stocks.stocks)
    const loading = useSelector(state => state.app.loading)
    const [state, setState] = useState({ name: '' })

    const addHandler = (event) => {
        event.preventDefault()
        if (!state.name.trim()) {
            return dispatch(showAlert('Input field can not be empty'))
            
        }
        const duplicate = stocks.filter(item => item.chart.result[0].meta.symbol === (state.name).toUpperCase())
        if (duplicate.length) {
            return dispatch(showAlert('This stock as already added'))
        }
        const newStock = {
            name: state.name
        }
        dispatch(addStock(newStock))
        
        setState(prev => ({ ...prev, ...{ name: '' } }))
    }

    const inputChangeHandler = (event) => {
        setState(prev => ({ ...prev, ...{ [event.target.name]: event.target.value } }))
    }

    return (
        <div className="side-menu">
            <form className="list-item inactive" onSubmit={addHandler}>
                <input type="text" value={state.name} name="name" className="input" onChange={inputChangeHandler} placeholder="Stock code..."></input>
                <button disabled={loading} className="btn" ><span className="material-icons-round">search</span></button>
            </form>
            <ul className="list">
                {stocks && stocks.map(stock => <li key={stock.chart.result[0].meta.symbol}><StockItem stock={stock} /></li>)}
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        stocks: state.stocks.stocks
    }
}

const mapDispatchToProps = {
    addStock
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)