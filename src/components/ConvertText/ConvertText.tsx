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
    <div>
      <Typography mb='1rem' variant='h3'>
        {title}
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
              setConvertedText(convertFunction(value))
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
        {convertedText.length > 0 && (
          <>
            <span
              style={{
                margin: '0 1rem',
              }}
            >
              ---
            </span>
            <div>
              <TextField value={convertedText} label={convertedTitle} variant='outlined' disabled />
              <Typography variant='body1' mt='.5rem'>
                sign count: {convertedText.length}
              </Typography>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ConvertText
