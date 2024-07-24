import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Products from './Products'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/products' element={<Products />}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

