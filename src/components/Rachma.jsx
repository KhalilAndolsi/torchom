import React from 'react'

function Rachma({nb}) {
  return (
    <div className={`relative m-1.5 h-[60px] md:h-[90px] transition-all duration-300 ${nb >= 5 ? "bg-zinc-600" : ""}`}>
      {nb >= 1 && <div className='line-animate-y w-[3px] bg-black h-full absolute'/>}
      {nb >= 2 && <div className='line-animate-y w-[3px] bg-black h-full absolute left-1/2 -translate-x-1/2'/>}
      {nb >= 3 && <div className='line-animate-y w-[3px] bg-black h-full absolute right-0'/>}
      {nb >= 4 && <div className='line-animate-x w-full bg-black h-[3px] absolute bottom-0'/>}
      {nb >= 5 && <div className='line-animate-x w-full bg-black h-[3px] absolute'/>}
    </div>
  )
}

export default Rachma