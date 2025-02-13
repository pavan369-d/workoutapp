import { useEffect, useState } from 'react'
import {BrowserRouter, Route, Routes,Navigate} from 'react-router-dom'

import Workouts from './components/Home'
import {Nav} from './components/Nav'
import Home from './components/Home'
import Signup from '../pages/Signup'
import Signin from '../pages/Signin'
import { useAuthContext } from '../hooks/useAuthContext'

function App() {
  const {user} = useAuthContext()
 
  return (
    <>
     <BrowserRouter>
     <Nav/>
      <Routes>
      

        <Route path='/' element={user ? <Home/> : <Navigate to="/login"/>}/>
        <Route path='/login' element={!user ? <Signin/> : <Navigate to="/"/>}/>
        <Route path='/signup'element={!user ? <Signup/> : <Navigate to="/"/>}/> 
             </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
