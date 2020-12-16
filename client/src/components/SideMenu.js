import React, { useState, useRef, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { StockItem } from './StockItem'
import { addStock, showAlert, updateStock } from '../redux/action'

const SideMenu = () => {

    const dispatch = useDispatch()
    const stocks = useSelector(state => state.stocks.stocks)
    const loading = useSelector(state => state.app.loading)
    const [state, setState] = useState({ name: '' })
    const sideMenu = useRef(null)
    const inputFocus = useRef(null)

    const addHandler = (event) => {
        event.preventDefault()
        if (!state.name.trim()) {
            return dispatch(showAlert('Input field can not be empty'))
        }
        const duplicate = stocks.filter(item => item.data["Meta Data"]["2. Symbol"] === (state.name).toUpperCase())
        if (duplicate.length) {
            return dispatch(showAlert('This stock as already added'))
        }
        const newStock = {
            id: Date.now(),
            name: state.name
        }
        dispatch(addStock(newStock))

        setState(prev => ({ ...prev, ...{ name: '' } }))
    }
    useEffect(() => {
        inputFocus.current.focus()
    }, [])

    const inputChangeHandler = (event) => {
        setState(prev => ({ ...prev, ...{ [event.target.name]: event.target.value } }))
    }

    const burgerHandler = () => {
        sideMenu.current.classList.toggle('open')
    }

    return (
        <div className="side-menu" ref={sideMenu}>
            <div className="burger" onClick={burgerHandler}>
                <div className="burger-line"></div>
                <div className="burger-line"></div>
                <div className="burger-line"></div>
            </div>
            <form className="list-item inactive" onSubmit={addHandler}>
                <button disabled={loading} className="btn search-btn" ><span className="material-icons-round">search</span></button>
                <input type="text" ref={inputFocus} value={state.name} name="name" className="input" onChange={inputChangeHandler} placeholder="Stock code..."></input>
            </form>
            <ul className="list">
                {stocks.map(stock => <li key={stock.id}><StockItem stock={stock} /></li>)}
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