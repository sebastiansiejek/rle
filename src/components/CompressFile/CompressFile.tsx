import React, { useRef, useState } from 'react'
import { downloadTextFile } from '../../utils/downloadTextFile'
import { compress } from '../../utils/rle'
import Spinner from '../Spinner'

const CompressFile: React.FunctionComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | ''>()
  const [isLoading, setLoading] = useState(false)

  return (
    <form
      style={{
        display: 'grid',
        gap: '1rem',
        justifyContent: 'start',
      }}
    >
      <label
        style={{
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            marginBottom: '.5rem',
          }}
        >
          Choose file
        </div>
        <input
          type='file'
          ref={inputRef}
          onChange={(e) => {
            if (e.target.files) {
              const file = e.target.files[0]
              setFile(file)
            }
          }}
          required
        />
      </label>
      <button
        style={{
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        disabled={isLoading}
        onClick={() => {
          if (file) {
            setLoading(true)
            const reader = new FileReader()
            reader.readAsText(file)
            reader.addEventListener('loadend', function () {
              const { result } = reader
              const compressedResult = compress(String(result))
              downloadTextFile(file.name + '-compressed.txt', compressedResult)
              setLoading(false)
              if (inputRef.current) {
                inputRef.current.value = ''
              }
              setFile('')
            })
          }
        }}
      >
        <span>Compress file</span>
        {isLoading && <Spinner size={15} />}
      </button>
    </form>
  )
}

export default CompressFile