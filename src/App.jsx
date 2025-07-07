import { useEffect, useState } from 'react'
import './index.css'
import NavigationBar from './components/navigation_bar'
import Top5 from './components/top5'
import SearchBox from './components/searchBox'
import SearchResult from './components/searchResult'
import { getRank, getSearchResults, getTop5} from './appwrite'
import { useDebounce } from 'react-use';
import {useGSAP } from '@gsap/react';
import gsap from 'gsap';
function App() {
  const [showLoginWindow, setShowLoginWindow] = useState(false);
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
      const result = await getSearchResults(searchTerm,user);
      setSearchResult(result);

    } catch(error){
      console.log("Error loading searh results",error)
    }
  }
  function toggleLoginWindow(){
        setShowLoginWindow(!showLoginWindow)
    }
  useGSAP(()=>{
    gsap.from('.heading',{
      y:100,
      opacity:0,
      duration:1,
      ease:'power1.inOut'
    })
  },[])
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
    if(isLoggedIn){
      loadSearchResults(debouncedSearchTerm);
    }
  },[debouncedSearchTerm,isLoggedIn]);
  useEffect(()=>{
    if(!isLoggedIn){
      setRank(0);
    }
  },[isLoggedIn])
  return (
    <div>
      <div className='pattern'></div>
      <NavigationBar
          isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
          user={user} setUser={setUser}
          showLoginWindow={showLoginWindow} setShowLoginWindow={setShowLoginWindow}
      />
      <div className='wrapper'>
        <h1 className='heading'>Know your <span className='text-gradient'>Popularity</span> Ranking </h1>
        <Top5 top5={top5}/>
        {isLoggedIn?
          <>
            <h1 className='heading mt-10 mb-10'>Your Popularity :&nbsp;<span className='text-gradient'>{rank}</span></h1>
            <h1 className='text-4xl flex'>Your Stars: &nbsp;&nbsp; {user.count}<img className="w-[2rem] mx-3" src="./star.svg"/></h1>
            <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <SearchResult results={searchResult} user={user} setSearchResult={setSearchResult}/>
          </>
          :<>
            <h1 className='text-3xl font-bold mb-6'>Login to know your Popularity</h1>
            <button className='styled-button' onClick={toggleLoginWindow}>Login</button>
            <h1 className='text-3xl font-bold mt-10 mb-6'>And see your friends</h1>
          </>
        }
      </div>
    </div>
  )
}

export default App
