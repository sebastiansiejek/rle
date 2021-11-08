import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

export interface CompressImageProps {}

const Input = styled('input')({
  display: 'none',
})

const CompressImage: React.FunctionComponent<CompressImageProps> = ({}) => {
  const [image, setImage] = useState('')

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography mb='1rem' variant='h3'>
        Compress Image
      </Typography>
      {image && <img src={image} width={100} alt='compress' />}
      <label>
        <Input
          accept='image/*'
          type='file'
          onChange={(e) => {
            const { target } = e
            if (target) {
              // @ts-ignore
              setImage(URL.createObjectURL(target?.files[0]))
            }
          }}
        />
        <Button variant='contained' component='span'>
          Upload
        </Button>
      </label>
    </div>
  )
}

export default CompressImage
