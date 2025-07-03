import React from 'react'
import '../index.css'

const NavigationBar = () => {
  return (
    <div className='nav-bar'>
        <img src="./vite.svg" className='m-2 w-[30px] h-[30px] sm:w-[50px] sm:h-[50px]'></img>
        <h1 className='flex text-white font-bold text-2xl w-full sm:text-4xl'>Famousity</h1>
        <button className='styled-button'>login</button>
    </div>
  )
}

export default NavigationBar