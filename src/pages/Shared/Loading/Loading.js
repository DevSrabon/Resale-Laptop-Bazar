import React from 'react'

const Spinner = () => {
  return (
    <div className='h-screen flex justify-center items-center'>
      <p className='text-7xl'>L</p>
      <div className='w-12 h-12 border-8 border-dotted rounded-full animate-ping mt-5 border-green-400'></div>
      <p className='text-7xl'>ading....</p>
    </div>
  )
}

export default Spinner
