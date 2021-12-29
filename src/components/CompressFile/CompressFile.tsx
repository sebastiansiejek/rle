import { Button, InputLabel } from '@mui/material'
import React, { useRef, useState } from 'react'
import { downloadTextFile } from '../../utils/downloadTextFile'
import { compress } from '../../utils/rle'
import Spinner from '../Spinner'
import ComparisonTable from '../ComparisonTable'

const CompressFile: React.FunctionComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | ''>()
  const [compressedFile, setCompressedFile] = useState<{
    file: File | null
    text: string
  }>()
  const [isLoading, setLoading] = useState(false)

  return (
    <form
      style={{
        display: 'grid',
        gap: '1rem',
        justifyContent: 'start',
      }}
    >
      <InputLabel
        style={{
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            textAlign: 'left',
            marginBottom: '.5rem',
          }}
        >
          Choose file
        </div>
        <input
          type='file'
          ref={inputRef}
          accept='.txt'
          onChange={(e) => {
            setCompressedFile({
              file: null,
              text: '',
            })
            if (e.target.files) {
              const file = e.target.files[0]
              setFile(file)
            }
          }}
          required
        />
      </InputLabel>
      {file && !compressedFile?.file && (
        <Button
          variant='outlined'
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
                const compressedFile = new File([compressedResult], `${file.name}`, {
                  type: 'text/plain',
                })
                setCompressedFile({
                  file: compressedFile,
                  text: compressedResult,
                })
                setLoading(false)
              })
            }
          }}
        >
          <span>Compress file</span>
          {isLoading && <Spinner size={15} />}
        </Button>
      )}
      {file && compressedFile?.file && (
        <div>
          <ComparisonTable fileSize={file.size} comparisonFileSize={compressedFile.file.size} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              variant='outlined'
              style={{
                marginTop: '1rem',
              }}
              onClick={() => {
                downloadTextFile(file.name + '-compressed.txt', compressedFile.text)
              }}
            >
              Download
            </Button>
          </div>
        </div>
      )}
    </form>
  )
}

export default CompressFile
