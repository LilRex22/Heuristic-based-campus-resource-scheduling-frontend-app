// import React from 'react'
import ReactDOM from 'react-dom/client';
// import NavigationBar  from './components/navbar';
import Home from './pages/home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './components/layout';
import './components/app.css'; 
// our custom css file


function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout/>}>
              <Route index element={<Home />} />
            </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
ReactDOM.createRoot(document.getElementById('root')).render(<App />);