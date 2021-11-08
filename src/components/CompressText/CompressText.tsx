import { Typography, TextField } from '@mui/material'
import { compress } from '../../utils/rle'
import { useState } from 'react'

const CompressText = () => {
  const [text, setText] = useState('')
  const [compressedText, setCompressText] = useState('')

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
        <div>
          <TextField
            onChange={(e) => {
              const { value } = e.target
              setText(value)
              setCompressText(compress(value))
            }}
            label='Text'
            variant='outlined'
          />
          {text.length > 0 && (
            <Typography variant='body1' mt='.5rem'>
              sign count: {text.length}
            </Typography>
          )}
        </div>
        {compressedText.length > 0 && (
          <>
            <span
              style={{
                margin: '0 1rem',
              }}
            >
              ---
            </span>
            <div>
              <TextField value={compressedText} label='Compressed text' variant='outlined' disabled />
              <Typography variant='body1' mt='.5rem'>
                sign count: {compressedText.length}
              </Typography>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CompressText
