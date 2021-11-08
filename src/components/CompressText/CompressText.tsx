import React, { useState } from 'react'
import { Typography, TextField } from '@mui/material'
import { compress } from '../../utils/rle'

const CompressText = () => {
  const [text, setText] = useState('')

  return (
    <div>
      <Typography mb='1rem' variant='h3'>
        Compress
      </Typography>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <TextField onChange={(e) => setText(e.target.value)} label='Text' variant='outlined' />
        {text && (
          <>
            <span
              style={{
                margin: '0 1rem',
              }}
            >
              -
            </span>
            <TextField value={compress(text)} label='Compressed text' variant='outlined' disabled />
          </>
        )}
      </div>
    </div>
  )
}

export default CompressText
