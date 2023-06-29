import { useState } from 'react'

import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Homepage from './pages/Homepage/Homepage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Episodes from './pages/Episodes/Episodes'
import About from './pages/About/About'
import CharacterDetails from './pages/CharacterDetails/CharacterDetails'
import ThemeContextProvider from './contexts/ThemeContext'
import Favorites from './pages/Favorites/Favorites'
import FavoritesContextProvider from './contexts/FavoritesContext'


function App() {

  return (
    <BrowserRouter>
      <ThemeContextProvider>
      <FavoritesContextProvider>
        <Header />

        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/about' element={<About />} />
          <Route path='/details/:characterId' element={<CharacterDetails />} />
          <Route path='/episodes' element={<Episodes />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>

        <Footer />
      </FavoritesContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  )
}

export default App
