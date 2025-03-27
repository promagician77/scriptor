'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import type { BoxProps } from '@mui/material/Box'

// Third-party Imports
import { useDropzone } from 'react-dropzone'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Styled Component Imports
import AppReactDropzone from '@/libs/styles/AppReactDropzone'

type FileProp = {
  name: string
  type: string
  size: number
}

// Styled Dropzone Component
const Dropzone = styled(AppReactDropzone)<BoxProps>(({ theme }) => ({
  '& .dropzone': {
    minHeight: 'unset',
    padding: theme.spacing(12),
    [theme.breakpoints.down('sm')]: {
      paddingInline: theme.spacing(5)
    },
    '&+.MuiList-root .MuiListItem-root .file-name': {
      fontWeight: theme.typography.body1.fontWeight
    }
  }
}))

interface ProductImageProps {
  onImageSelect: (file: File) => void
  previewUrl?: string
  isReadOnly?: boolean
}

const ImageUpload = ({ onImageSelect, previewUrl, isReadOnly }: ProductImageProps) => {
  // States
  const [files, setFiles] = useState<File[]>([])

  // Hooks
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))

      // Send the first file to parent component
      if (acceptedFiles.length > 0) {
        onImageSelect(acceptedFiles[0])
      }
    },
    disabled: isReadOnly
  })

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />
    } else {
      return <i className='bx-file' />
    }
  }

  const handleRemoveFile = (file: FileProp) => {
    if (isReadOnly) return
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)

    setFiles([...filtered])
  }

  const fileList = files.map((file: FileProp) => (
    <ListItem key={file.name} className='pis-4 plb-3'>
      <div className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography variant='h6' className='file-name'>
            {file.name}
          </Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      {!isReadOnly && (
        <IconButton onClick={() => handleRemoveFile(file)}>
          <i className='bx-x text-xl' />
        </IconButton>
      )}
    </ListItem>
  ))

  const handleRemoveAllFiles = () => {
    if (isReadOnly) return
    setFiles([])
  }

  return (
    <Dropzone>
      <Card>
        <CardHeader
          title='Product Image'
          action={
            !isReadOnly && (
              <Link href='#' className='text-primary font-medium'>
                Add media from URL
              </Link>
            )
          }
          sx={{ '& .MuiCardHeader-action': { alignSelf: 'center' } }}
        />
        <CardContent>
          {!isReadOnly ? (
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <div className='flex items-center flex-col gap-2 text-center'>
                <CustomAvatar variant='rounded' skin='light' color='secondary' size={40}>
                  <i className='bx-upload' />
                </CustomAvatar>
                <Typography variant='h4'>Drag and Drop Your Image Here.</Typography>
                <Typography color='text.disabled'>or</Typography>
                <Button variant='tonal' size='small'>
                  Browse Image
                </Button>
              </div>
            </div>
          ) : previewUrl ? (
            <div className='flex items-center justify-center'>
              <img src={previewUrl} alt='Project preview' style={{ maxWidth: '100%', maxHeight: '300px' }} />
            </div>
          ) : (
            <div className='flex items-center justify-center'>
              <Typography color='text.disabled'>No image available</Typography>
            </div>
          )}
          {files.length && !isReadOnly ? (
            <>
              <List>{fileList}</List>
              <div className='buttons'>
                <Button color='error' variant='tonal' onClick={handleRemoveAllFiles}>
                  Remove All
                </Button>
                <Button variant='contained'>Upload Files</Button>
              </div>
            </>
          ) : null}
        </CardContent>
      </Card>
    </Dropzone>
  )
}

export default ImageUpload
