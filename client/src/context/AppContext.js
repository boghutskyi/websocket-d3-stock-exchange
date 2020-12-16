import { createContext } from 'react'


export const AppContext = createContext({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight
})