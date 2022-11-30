import React from 'react'

const Spinner = () => {
  return (
    <div className='flex justify-center items-center'>
      <p className='text-7xl font-bold'>L</p>
      <div className='w-12 font-bold h-12 border-8 border-dotted rounded-full animate-spin mt-5 border-green-400'></div>
      <p className='text-7xl font-bold'>ading....</p>
    </div>
  )
}

export default Spinner
