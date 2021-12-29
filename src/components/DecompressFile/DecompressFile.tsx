import { Button, InputLabel } from '@mui/material'
import React, { useRef, useState } from 'react'
import { downloadTextFile } from '../../utils/downloadTextFile'
import { decompress } from '../../utils/rle'
import Spinner from '../Spinner'
import ComparisonTable from '../ComparisonTable'

export interface DecompressFileProps {}

const DecompressFile: React.FunctionComponent<DecompressFileProps> = ({}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | ''>()
  const [convertedFile, setConvertedFile] = useState<{
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
            setConvertedFile({
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
      {file && !convertedFile?.file && (
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
                const compressedResult = decompress(String(result))
                const convertedFile = new File([compressedResult], `${file.name}`, {
                  type: 'text/plain',
                })
                setConvertedFile({
                  file: convertedFile,
                  text: compressedResult,
                })
                setLoading(false)
              })
            }
          }}
        >
          <span>Decompress file</span>
          {isLoading && <Spinner size={15} />}
        </Button>
      )}
      {file && convertedFile?.file && (
        <div>
          <ComparisonTable
            fileSize={file.size}
            comparisonFileSize={convertedFile.file.size}
            columns={[
              {
                title: 'Compressed',
              },
              {
                title: 'Uncompressed',
              },
            ]}
          />
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
                const fileName = `${file.name.split('.')[0]}_decompressed.txt`
                downloadTextFile(fileName, convertedFile.text)
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

export default DecompressFile
