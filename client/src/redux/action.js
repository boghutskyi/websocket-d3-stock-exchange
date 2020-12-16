import { ADD_STOCK, DELETE_STOCK, HIDE_ALERT, HIDE_LOADER, HIDE_STOCK, SHOW_ALERT, SHOW_LOADER, SHOW_STOCK, UPDATE_STOCK } from "./types";

export function addStock(stock) {
    return async dispatch => {
        try {
            dispatch(showLoader())
            const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock.name.toUpperCase()}&interval=5min&apikey=9RIZRNZXIP6DCYIL`)
            const json = await response.json()
            if (json["Error Message"]) {
                return dispatch(showAlert("Incorrected name of stock"))
            }
            dispatch({
                type: ADD_STOCK,
                payload: {
                    id: stock.id,
                    data: json
                }
            })
            dispatch(showStock(stock.id))

        } catch (e) {
            dispatch(showAlert('Request error'))
        } finally {
            dispatch(hideLoader())
        }
    }
}

export function showStock(id) {
    return {
        type: SHOW_STOCK,
        payload: id
    }
}

export function hideStock() {
    return {
        type: HIDE_STOCK
    }
}
export function updateStock(id) {
    return {
        type: UPDATE_STOCK,
        payload: id
    }
}

export function deleteStock(id) {
    return {
        type: DELETE_STOCK,
        payload: id
    }
}

export function showLoader() {
    return {
        type: SHOW_LOADER
    }
}

export function hideLoader() {
    return {
        type: HIDE_LOADER
    }
}

export function showAlert(text) {
    return dispatch => {
        dispatch({
            type: SHOW_ALERT,
            payload: text
        })
        setTimeout(() => {
            dispatch(hideAlert())
        }, 3500)
    }
}
export function hideAlert() {
    return {
        type: HIDE_ALERT
    }
}