import React from 'react'
import { useSelector } from 'react-redux';
import { Alert } from './components/Alert';
import { Graph } from './components/Graph'
import SideMenu from './components/SideMenu'
import './index.css'

function App() {
  const alert = useSelector(state => state.app.alert)
  return (
    <div className="app">
      <div>
        <Graph />
      </div>
      <div>
        <SideMenu />
      </div>
      {alert && <Alert alert={alert} />}
    </div>
  );
}

export default App;
