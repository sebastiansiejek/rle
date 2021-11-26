import { Typography, TextField } from '@mui/material'
import { useState } from 'react'

const ConvertText = ({
  title,
  convertFunction,
  convertedTitle,
}: {
  title: string
  convertFunction: (text: string) => string
  convertedTitle: string
}) => {
  const [text, setText] = useState('')
  const [convertedText, setConvertedText] = useState('')

  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <Typography mb='1rem' variant='h3'>
        {title}
      </Typography>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <TextField
            fullWidth
            onChange={(e) => {
              const { value } = e.target
              setText(value)
              setConvertedText(convertFunction(value))
            }}
            label='Text'
            variant='outlined'
          />
          {text.length > 0 && (
            <Typography variant='body1' mt='.5rem'>
              signs count: {text.length}
            </Typography>
          )}
        </div>
        {convertedText.length > 0 && (
          <div
            style={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                margin: '0 1rem',
              }}
            >
              -
            </span>
            <div
              style={{
                flex: 1,
              }}
            >
              <TextField value={convertedText} label={convertedTitle} variant='outlined' fullWidth disabled />
              <Typography variant='body1' mt='.5rem'>
                signs count: {convertedText.length}
              </Typography>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConvertText
