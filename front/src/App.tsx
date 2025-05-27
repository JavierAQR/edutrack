import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router'
import Login from './Pages/Login'
import Register from './Pages/Register'
import HomeUser from './Pages/HomeStudent'
import HomeAdmin from './Pages/HomeAdmin'
import VerificationPage from './Pages/VerificationPage'
import Home from './Pages/Home'

function App() {

  return (
    <Router>
      <div className='App'>
        <Routes>
          {/* Ruta para auth */}
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/homeUser' element={<HomeUser/>}/>
          <Route path='/homeAdmin' element={<HomeAdmin/>}/>
          <Route path='/verification' element={<VerificationPage/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
