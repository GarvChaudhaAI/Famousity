import { useState } from 'react'
import './index.css'
import NavigationBar from './components/navigation_bar'

function App() {
  return (
    <div>
      <div className='pattern'></div>
      <NavigationBar/>
      <div className='wrapper'>
        <h1 className='heading flex flex-wrap'>Know your<span className='text-gradient'>Popularity</span>Ranking </h1>
      </div>
      
    </div>
  )
}

export default App
