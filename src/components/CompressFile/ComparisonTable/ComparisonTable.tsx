import prettyBytes from 'pretty-bytes'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

export interface ComparisonTableProps {
  fileSize: number
  comparisonFileSize: number
}

const ComparisonTable: React.FunctionComponent<ComparisonTableProps> = ({ fileSize, comparisonFileSize }) => {
  const percent = Math.abs(Math.round(((comparisonFileSize - fileSize) / fileSize) * 100))
  const isCompressedFileBigger = fileSize > comparisonFileSize ? true : false
  const difference = Math.abs(fileSize - comparisonFileSize)

  return (
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
          <TableCell style={{ textAlign: 'center' }}>{prettyBytes(fileSize)}</TableCell>
          <TableCell style={{ textAlign: 'center' }}>{prettyBytes(comparisonFileSize)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            style={{ textAlign: 'center', color: isCompressedFileBigger ? 'green' : 'red' }}
            colSpan={3}
          >{`${percent}% (~${prettyBytes(difference)}) ${isCompressedFileBigger ? 'less ' : 'more '} than original`}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default ComparisonTable
