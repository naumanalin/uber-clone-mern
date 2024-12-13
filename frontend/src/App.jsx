import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Start from './pages/Start'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Start/>} />
          <Route path='/login' element={<UserLogin/>} />
          <Route path='/signup' element={<UserSignup/>} />
          <Route path='/riding' element={<Home/>} />
          <Route path='/captain-login' element={<CaptainLogin/>} />
          <Route path='/captain-signup' element={<CaptainSignup/>} />
          <Route path='/captain-riding' element={<Home/>} />


          <Route path='/home' element={<Home/>} />



        

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App