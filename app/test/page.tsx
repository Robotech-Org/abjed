import Typewriter from '@/components/Typewriter'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col gap-4 bg-slate-950'>

      <h3 className='w-dvw h-dvh flex justify-center items-center text-slate-200 text-3xl animate-pulse font-extrabold '>
        <Typewriter text={'why are you here?'} speed={190}/>
      
      </h3>
    </div>
  )
}

export default page