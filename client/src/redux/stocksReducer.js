import { ADD_STOCK, DELETE_STOCK, HIDE_STOCK, SHOW_STOCK, UPDATE_STOCK } from './types'

const initialState = {
    stocks: [],
    activeStock: []
}

export const stocksReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_STOCK:
            return { ...state, stocks: state.stocks.concat(action.payload) }
        case SHOW_STOCK:
            return { ...state, activeStock: state.stocks.filter(item => item.id === parseInt(action.payload)) }
        case HIDE_STOCK:
            return { ...state, activeStock: [] }
        case UPDATE_STOCK:
            return {
                ...state, stocks: state.stocks.map(item => {
                    if (item.id === parseInt(action.payload.id)) {
                        return { ...item, data: action.payload.data }
                    }
                    return item
                })
            }
        case DELETE_STOCK:
            return { ...state, stocks: state.stocks.filter(item => item.id !== parseInt(action.payload)) }
        default: return state
    }
}

