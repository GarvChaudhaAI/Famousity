import React from 'react'

const SearchResult = ({results}) => {
  return (
    <div className='my-[100px] flex flex-col items-center w-full'>
        <ol className='flex flex-col w-full items-center'>
            {results.map((user,index)=>(
                <div className='name-tile my-1 sm:my-2 flex items-center'>
                    <h1 className='flex w-full'>
                        <span className='text-gray-300'>{index+1}. &nbsp;</span>
                        <span className='font-bold'>{user.name} &nbsp;</span>
                        <span className='text-gray-300 italic'>(@{user.id})</span>
                    </h1>
                    <h2>{user.stars}</h2>
                    <button><img className="w-[2rem] mx-3" src="./star.svg"/></button>
                </div> 
                )
            )}
        </ol>
    </div>
  )
}

export default SearchResult