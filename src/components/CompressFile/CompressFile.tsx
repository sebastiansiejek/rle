import React, { useRef, useState } from 'react'
import { downloadTextFile } from '../../utils/downloadTextFile'
import { compress } from '../../utils/rle'
import Spinner from '../Spinner'

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
      </button>
      {file && compressedFile?.file && (
        <div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Original</th>
                <th>Compressed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <b>Size</b>
                </td>
                <td style={{ textAlign: 'center' }}>{file.size} B</td>
                <td style={{ textAlign: 'center' }}>{compressedFile.file.size} B</td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={() => {
              downloadTextFile(file.name + '-compressed.txt', compressedFile.text)
            }}
          >
            Download
          </button>
        </div>
      )}
    </form>
  )
}

export default CompressFile
