import React from 'react'
import './Spinner.styles.css'

const Spinner: React.FunctionComponent<{ size?: number }> = ({ size }) => {
  return (
    <svg className='spinner' viewBox='0 0 50 50' style={{ width: size, height: size }}>
      <circle className='path' cx='25' cy='25' r='20' fill='none' stroke='tomato' strokeWidth='5'></circle>
    </svg>
  )
}

export default Spinner
