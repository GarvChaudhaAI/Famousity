import React from 'react'

const SearchBox = () => {
  return (
    <div className='search mt-10 '>
        <div>
        <img src='./search.svg'/>
        <input 
        placeholder='Search your friend'
        />
        </div>
    </div>
  )
}

export default SearchBox