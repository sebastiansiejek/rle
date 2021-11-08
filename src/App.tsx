import ConvertText from './components/ConvertText'
import { compress, decompress } from './utils/rle'

function App() {
  return (
    <div
      className='App'
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        textAlign: 'center',
        gap: '5rem',
      }}
    >
      <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />
      <ConvertText title='Compress' convertFunction={compress} convertedTitle='Compress text' />
      <ConvertText title='Decompress' convertFunction={decompress} convertedTitle='Decompress text' />
    </div>
  )
}

export default App
