import { ADD_STOCK, DELETE_STOCK, SHOW_STOCK } from './types'

const initialState = {
    stocks: [],
    activeStock: []
}

export const stocksReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_STOCK:
            return { ...state, stocks: state.stocks.concat(action.payload) }
        case SHOW_STOCK:
            return { ...state, activeStock: state.stocks.filter(item => item.chart.result[0].meta.symbol === action.payload) }
        case DELETE_STOCK:
            return { ...state, stocks: state.stocks.filter(item => item.chart.result[0].meta.symbol !== action.payload) }
        default: return state
    }
}