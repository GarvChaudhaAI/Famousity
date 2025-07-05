import React, { useState } from 'react'
import '../index.css'
const LoginWindow = ({showLoginWindow, setShowLoginWindow}) => {
    const [logOrSign, setLogOrSign] = useState(true)
    function toggleLogOrSign() {
        setLogOrSign(!logOrSign)
    }
    function toggleLoginWindow(){
        setShowLoginWindow(!showLoginWindow)
    }
    const [fullName, setFullName] = useState('');
    const [email   , setEmail   ] = useState('');
    const [userID  , setUserID  ] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className='login-window-bg'>
            <button className='styled-button absolute top-0 right-0 mt-10 mr-10' onClick={toggleLoginWindow}>x</button>
            {logOrSign ?
                <div className='login-window'>
                    <div>
                        <h1 >Full Name</h1>
                        <input className='search mt-3' placeholder='Enter your name'
                         value={fullName} onChange={(e)=>setFullName(e.target.value)}/>
                    </div>
                    <div className='mt-5'>
                        <h1 >User ID</h1>
                        <input className='search mt-3' placeholder='Enter User Name'
                        value={userID} onChange={(e)=>setUserID(e.target.value)}/>
                    </div>
                    <div className='mt-5'>
                        <h1 >Email</h1>
                        <input className='search mt-3' placeholder='Enter your email'
                        value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className='mt-5'>
                        <h1>Password</h1>
                        <input className='search mt-3' placeholder='Enter password'
                        value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div className='flex w-full justify-center mt-5'>
                        <button className='styled-button'>Sign Up</button>
                    </div> 
                    <div className='absolute bottom-0 left-0 right-0 mb-5 flex justify-center items-center'>
                        <h1>Already have an account? &nbsp; &nbsp; </h1>
                        <button className='underline text-purple-400' onClick={toggleLogOrSign}>Login</button>
                    </div>      
                </div>
            :   <div className='login-window'>
                    <div className='mt-10'>
                        <h1 >Email</h1>
                        <input className='search mt-3' placeholder='Enter email'
                        value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className='mt-10'>
                        <h1>Password</h1>
                        <input className='search mt-3' placeholder='Enter password'
                         value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div className='flex w-full justify-center mt-5'>
                        <button className='styled-button'>Login</button>
                    </div>
                    <div className='absolute bottom-0 left-0 right-0 mb-10 flex justify-center items-center'>
                        <h1>Don't have an account &nbsp; &nbsp; </h1>
                        <button className='underline text-purple-400' onClick={toggleLogOrSign}>Sign Up</button>
                    </div>      
                </div>
            }
        </div>
    )
}

export default LoginWindow