import React from 'react'
import { toggleStarFriend } from '../appwrite'

const SearchResult = ({results,setSearchResult,user}) => {
  const toggleStarButton = async(user, otherUser,index)=>{
    const temp =await toggleStarFriend(user, otherUser,index,results,setSearchResult);
    setSearchResult(temp);
  }  
  return (
    <div className='my-[100px] flex flex-col items-center w-full'>
        <ol className='flex flex-col w-full items-center'>
            {results.map((otherUser,index)=>(
                <li key={otherUser.userID} className='flex flex-col w-full items-center'>
                <div className='name-tile my-1 sm:my-2 flex items-center'>
                    <h1 className='flex w-full'>
                        <span className='text-gray-300'>{index+1}. &nbsp;</span>
                        <span className='font-bold'>{otherUser.fullName} &nbsp;</span>
                        <span className='text-gray-300 italic'>(@{otherUser.userID})</span>
                    </h1>
                    <h2>{otherUser.count}</h2>
                    <button onClick={()=>{
                        toggleStarButton(user, otherUser,index);
                    }}>{otherUser.hasStarred ?
                        <img className="w-[2rem] mx-3" src="./star.svg"/>
                        : <img className="w-[2rem] mx-3" src="./star_grey.svg"/>
                    }
                    </button>
                </div> 
                </li>
                )
            )}
        </ol>
    </div>
  )
}

export default SearchResult