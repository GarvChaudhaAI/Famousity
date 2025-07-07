import React, { useState } from 'react'
import '../index.css'
import LoginWindow from './loginWindow';
const NavigationBar = ({isLoggedIn, setIsLoggedIn, user, setUser, showLoginWindow, setShowLoginWindow}) => {
  function signOutButton() {
    setIsLoggedIn(false);
    setUser({});
  }
  function toggleLoginWindow(){
        setShowLoginWindow(!showLoginWindow)
  }
  
  return (
    <div className='nav-bar'>
        <img src="./vite.svg" className='m-2 w-[30px] h-[30px] sm:w-[50px] sm:h-[50px]'></img>
        <h1 className='flex text-white font-bold text-2xl grow sm:text-4xl'>Famousity</h1>
        { showLoginWindow ? <></> :
         isLoggedIn ?
        <button className='styled-button' onClick={signOutButton}>SignOut</button>
        : <button className='styled-button' onClick={toggleLoginWindow}>Login</button>
        }
        {showLoginWindow? 
        <LoginWindow showLoginWindow={showLoginWindow} setShowLoginWindow={setShowLoginWindow}
         isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
         user={user} setUser={setUser}/>
        : <></>
        }
    </div>
  )
}

export default NavigationBar