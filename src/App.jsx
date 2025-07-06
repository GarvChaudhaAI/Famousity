import { useEffect, useState } from 'react'
import './index.css'
import NavigationBar from './components/navigation_bar'
import Top5 from './components/top5'
import SearchBox from './components/searchBox'
import SearchResult from './components/searchResult'
import { getTop5 } from './appwrite'
const dummy =[
    {name:"Garv" ,id:"thegarv" ,stars:5},
    {name:"Robin",id:"therobin",stars:4},
    {name:"Joyce",id:"joyce"   ,stars:3},
    {name:"Mark" ,id:"mark"    ,stars:2},
    {name:"Mike" ,id:"mike"    ,stars:1},
]
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [top5, setTop5] = useState([]);
  const [user, setUser] = useState({});
  const loadTop5 = async () => {
    try {
      const result = await getTop5();
      setTop5(result);
    } catch (error) {
      console.log("Error fetching movies:",error)
    }
  }
  useEffect(()=>{
    console.log(user);
  },[user])

  useEffect(()=>{
    loadTop5();
  },[isLoggedIn])
  return (
    <div>
      <div className='pattern'></div>
      <NavigationBar
          isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
          user={user} setUser={setUser}
      />
      <div className='wrapper'>
        <h1 className='heading'>Know your <span className='text-gradient'>Popularity</span> Ranking </h1>
        <Top5 top5={top5}/>
        <SearchBox/>
        <SearchResult results={dummy}/>
      </div>

      
    </div>
  )
}

export default App
