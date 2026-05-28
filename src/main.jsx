// import React from 'react'
import ReactDOM from 'react-dom/client';
import NavigationBar  from './components/navbar';
import Home from './pages/home';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Home />
    </div>
  )
}

export default App
ReactDOM.createRoot(document.getElementById('root')).render(<App />);