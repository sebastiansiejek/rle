import CompressFile from './components/CompressFile'
import ConvertText from './components/ConvertText'
import { compress, decompress } from './utils/rle'

function App() {
  return (
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
        <ConvertText title='Decompress' convertFunction={decompress} convertedTitle='Decompress text' />
      </div>
    </div>
  )
}

export default App
