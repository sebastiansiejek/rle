import { Divider, Typography } from '@mui/material'
import CompressFile from './components/CompressFile'
import ConvertText from './components/ConvertText'
import DecompressFile from './components/DecompressFile'
import { compress, decompress } from './utils/rle'

function App() {
  return (
    <div>
      <div
        style={{
          textAlign: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <strong>
          <Typography variant='h1' fontSize={'5rem'} paddingBottom={'1.5rem'}>
            Run-Length Encoding
          </Typography>
        </strong>
        <Divider light />
      </div>
      <div
        style={{
          display: 'grid',
          gap: '2rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            textAlign: 'center',
            gap: '5rem',
          }}
        >
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />
          <div>
            <ConvertText title='Compress' convertFunction={compress} convertedTitle='Compress text' />
            <div
              style={{
                marginTop: '1rem',
              }}
            >
              <CompressFile />
            </div>
          </div>
          <div>
            <ConvertText title='Decompress' convertFunction={decompress} convertedTitle='Decompress text' />
            <div
              style={{
                marginTop: '1rem',
              }}
            >
              <DecompressFile />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
