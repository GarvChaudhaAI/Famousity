import { useState } from 'react'
import './index.css'
import NavigationBar from './components/navigation_bar'
import Top5 from './components/top5'
const top5 =[
    {name:"Garv" ,id:"thegarv" ,stars:5},
    {name:"Robin",id:"therobin",stars:4},
    {name:"Joyce",id:"joyce"   ,stars:3},
    {name:"Mark" ,id:"mark"    ,stars:2},
    {name:"Mike" ,id:"mike"    ,stars:1},
]
function App() {
  return (
    <div>
      <div className='pattern'></div>
      <NavigationBar/>
      <div className='wrapper'>
        <h1 className='heading'>Know your <span className='text-gradient'>Popularity</span> Ranking </h1>
        <Top5 top5={top5}/>
      </div>

      
    </div>
  )
}

export default App
