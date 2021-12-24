import prettyBytes from 'pretty-bytes'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

export interface ComparisonTableProps {
  fileSize: number
  comparisonFileSize: number
}

const ComparisonTable: React.FunctionComponent<ComparisonTableProps> = ({ fileSize, comparisonFileSize }) => {
  const percent = Math.abs(Math.round(((comparisonFileSize - fileSize) / fileSize) * 100))
  const isMore = fileSize > comparisonFileSize ? true : false

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
          <TableCell style={{ textAlign: 'center' }} colSpan={3}>{`${percent}% ${isMore ? 'less ' : 'more '} than original`}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default ComparisonTable
