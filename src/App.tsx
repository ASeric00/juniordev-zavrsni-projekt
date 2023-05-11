import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

import NavBar from './webComponents/NavBar'
import Naslovna from './webComponents/Naslovna'
import Popis from './webComponents/Popis'
import Unos from './webComponents/Unos'
import Donacije from './webComponents/Donacije'
import Obavijesti from './webComponents/Obavijesti'
import { Routes, Route } from 'react-router-dom'

import PravaContext from './addComponents/kontekst'


function App() {
  const [prava, postaviPrava] = useState('korisnik')
  const [zivotinje, postaviZivotinje] = useState([])


  useEffect(() => {
    axios
      .get('http://localhost:3001/zivotinje')
      .then(res => postaviZivotinje(res.data))
  }, [])

  function promjenaPrava() {
    postaviPrava(prava == 'korisnik' ? 'admin' : 'korisnik')
  }

  return (
    <div>
      <NavBar promjena={promjenaPrava} />
      <PravaContext.Provider value={prava}>
        <Routes>
          <Route path='/' element={<Naslovna />} />
          <Route path='/popis'
            element={<Popis
              zivotinje={zivotinje}
              postaviZivotinje={postaviZivotinje}
              filtriraj={postaviZivotinje} />} />
          <Route path='/donacije' element={<Donacije />} />
          <Route path='/obavijesti' element={<Obavijesti />} />
          <Route path='/unos' element={<Unos dodaj={postaviZivotinje} />} />
        </Routes>
      </PravaContext.Provider>
    </div>
  )
}

export default App
