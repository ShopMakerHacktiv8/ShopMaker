import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <Spinner
      className='mx-auto mt-5'
      animation='border'
      role='status'
      style={{
        width: '80px',
        height: '80px',
        display: 'block',
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  )
}

export default Loader