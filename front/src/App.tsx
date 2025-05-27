import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router'
import Login from './Components/Login'
import Register from './Components/Register'
import HomeUser from './Components/HomeUser'
import HomeAdmin from './Components/HomeAdmin'
import VerificationPage from './Components/VerificationPage'

function App() {

  return (
    <Router>
      <div className='App'>
        <Routes>
          {/* Ruta para auth */}
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/homeUser' element={<HomeUser/>}/>
          <Route path='/homeAdmin' element={<HomeAdmin/>}/>
          <Route path='/verification' element={<VerificationPage/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
