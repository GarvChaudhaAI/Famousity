import React from 'react'

const SearchBox = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='search mt-10 '>
        <div>
        <img src='./search.svg'/>
        <input 
        placeholder='Search your friend'
        value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}
        />
        </div>
    </div>
  )
}

export default SearchBox