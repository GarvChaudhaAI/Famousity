import { useEffect, useState } from 'react'
import './index.css'
import NavigationBar from './components/navigation_bar'
import Top5 from './components/top5'
import SearchBox from './components/searchBox'
import SearchResult from './components/searchResult'
import { getRank, getSearchResults, getTop5 } from './appwrite'
import { useDebounce } from 'react-use';
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
  const [rank, setRank] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] =useState('');
  const [searchResult, setSearchResult] =useState([]);

  useDebounce(()=>
    setDebouncedSearchTerm(searchTerm)
  ,500,[searchTerm])
  const loadTop5 = async () => {
    try {
      const result = await getTop5();
      setTop5(result);
    } catch (error) {
      console.log("Error fetching most popular:",error)
    }
  }
  const loadRank = async()=>{
    try{
      const result = await getRank(user.count);
      setRank(result+1);
    } catch(error){
      console.log("Error fetching rank:", error)
    }
  }
  const loadSearchResults = async()=>{
    try{
      const result = await getSearchResults(searchTerm);
      setSearchResult(result);

    } catch(error){
      console.log("Error loading searh results",error)
    }
  }

  useEffect(()=>{
    if(isLoggedIn && user){
      console.log(user);
      loadRank();
    }
  },[user, isLoggedIn])
  useEffect(()=>{
      loadTop5();
  },[isLoggedIn])
  useEffect(()=>{
    loadSearchResults(debouncedSearchTerm);
  },[debouncedSearchTerm]);
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
        <h1 className='heading'>Your Popularity:<span className='text-gradient'>{rank}</span></h1>
        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <SearchResult results={searchResult}/>
      </div>
    </div>
  )
}

export default App
