import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { useRef, useState } from 'react'
import { downloadTextFile } from '../../utils/downloadTextFile'
import { compress } from '../../utils/rle'
import Spinner from '../Spinner'
import prettyBytes from 'pretty-bytes'

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
      </label>
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Original</TableCell>
                <TableCell>Compressed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <b>Size</b>
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>{prettyBytes(file.size)}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{prettyBytes(compressedFile.file.size)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
      )}
    </form>
  )
}

export default CompressFile
