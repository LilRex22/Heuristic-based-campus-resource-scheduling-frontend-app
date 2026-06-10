// import React from 'react'
import ReactDOM from 'react-dom/client';
// import NavigationBar  from './components/navbar';
import Home from './pages/home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './components/layout';
import './components/app.css'; 
import Login from './pages/login';
import SignUp from './pages/signup';
import Dashboard from './pages/dashboard';
import DashboardLayout from './components/dashboardLayout';
// our custom css file


function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* this page this route routes to doesn't need the default page layout settings, it standsalone with its own design, so we put it outside the layout route */}
          <Route path='/dashboard' element={<Dashboard/>} />

            {/* this is the whole page layout, the dashboard is excluded because it has its own layout (sidebar + navbar) */}
            <Route path='/' element={<Layout/>}>
              <Route index element={<Home />} />
              <Route  path='/login' element={<Login/> } />
              <Route path='/signup' element={<SignUp/>} />
            </Route>
        
            {/* dashboard uses its own layout (sidebar + navbar) */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
            </Route>


        </Routes>
      </BrowserRouter>
  )
}

export default App
ReactDOM.createRoot(document.getElementById('root')).render(<App />);