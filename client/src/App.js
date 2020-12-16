import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import { Alert } from './components/Alert';
import { Info } from './components/Info'
import SideMenu from './components/SideMenu'
import { AppContext } from './context/AppContext';
import './index.css'

function App() {
  const alert = useSelector(state => state.app.alert)
  const { windowWidth, windowHeight } = useContext(AppContext)
  return (
    <AppContext.Provider value={{windowWidth, windowHeight}}>
        <div className="container">
          <Info />
          <SideMenu />
          {alert && <Alert alert={alert} />}
        </div>
    </AppContext.Provider>
  );
}

export default App;
