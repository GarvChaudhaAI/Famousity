import React from 'react'

const Top5 = ({top5}) => {
  return (
    <div className='my-[100px] flex flex-col items-center w-full'>
        <h1 className='text-white text-2xl sm:text-4xl'>Most Popular</h1>
        <ol className='flex flex-col w-full items-center'>
            
            {top5.map((user,index)=>(
                <li key={index} className='flex flex-col w-full items-center'>
                <div className='name-tile my-1 sm:my-2 flex items-center'>
                    <h1 className='flex w-full'>
                        <span className='text-gray-300'>{index+1}. &nbsp;</span>
                        <span className='font-bold'>{user.name} &nbsp;</span>
                        <span className='text-gray-300 italic'>(@{user.id})</span>
                    </h1>
                    <h2>{user.stars}</h2>
                    <img className="w-[2rem] mx-3" src="./star.svg"/>
                </div> 
                </li>
                )
            )}
        </ol>
    </div>
  )
}

export default Top5