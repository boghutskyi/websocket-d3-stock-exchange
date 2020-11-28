import { ADD_STOCK, DELETE_STOCK, HIDE_ALERT, HIDE_LOADER, SHOW_ALERT, SHOW_LOADER, SHOW_STOCK } from "./types";

export function addStock(stock) {
    return async dispatch => {
        try {
            dispatch(showLoader())
            const headers = {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "734df0a96bmsh06fb7b7bb028531p1e6e10jsnd5824bb8ad0d",
                    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
                }
            }
            const response = await fetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?symbol=${stock.name}&range=1mo&region=US`, headers)
            const json = await response.json()
            if (!json.chart.result) {
                return showAlert(json.chart.error.description)
            }
            dispatch({ type: ADD_STOCK, payload: json })
            dispatch(showStock((stock.name).toUpperCase()))
            
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
        }, 2500)
    }
}
export function hideAlert() {
    return {
        type: HIDE_ALERT
    }
}