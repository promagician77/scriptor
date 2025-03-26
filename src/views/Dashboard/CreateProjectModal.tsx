'use client'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'

interface CreateProjectModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (projectData: {
    title: string
    genre: string
    tone: string
    concept: string
  }) => void
}

const genres = ['Romance', 'Mystery', 'Sci-Fi', 'Drama', 'Comedy', 'Horror']
const tones = ['Light', 'Dark', 'Humorous', 'Serious', 'Mysterious']

const CreateProjectModal = ({ open, onClose, onSubmit }: CreateProjectModalProps) => {
  const [data, setData] = useState({
    title: '',
    genre: '',
    tone: '',
    concept: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(data)
  }

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        className: 'bg-white'
      }}
    >
      <DialogTitle className='flex justify-between items-center'>
        <div>
          <Typography variant='h6'>Create New Project</Typography>
          <Typography variant='body2' className='text-gray-600'>
            Enter the details for your new screenplay project.
          </Typography>
        </div>
        <IconButton onClick={onClose} className='text-gray-600'>
          <i className='bx-x text-xl' />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 pt-2'>
          <div className='space-y-2'>
            <Typography variant='subtitle2' className='text-gray-700'>Title</Typography>
            <TextField
              name="title"
              placeholder="Enter project title"
              fullWidth
              required
              variant="outlined"
              value={data.title}
              onChange={handleChange}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.12)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.24)',
                  },
                },
              }}
            />
          </div>

          <div className='space-y-2'>
            <Typography variant='subtitle2' className='text-gray-700'>Genre</Typography>
            <TextField
              name="genre"
              select
              fullWidth
              required
              value={data.genre}
              onChange={handleChange}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.12)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.24)',
                  },
                },
              }}
            >
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className='space-y-2'>
            <Typography variant='subtitle2' className='text-gray-700'>Tone</Typography>
            <TextField
              name="tone"
              select
              fullWidth
              required
              value={data.tone}
              onChange={handleChange}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.12)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.24)',
                  },
                },
              }}
            >
              {tones.map((tone) => (
                <MenuItem key={tone} value={tone}>
                  {tone}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className='space-y-2'>
            <Typography variant='subtitle2' className='text-gray-700'>Concept</Typography>
            <TextField
              name="concept"
              multiline
              rows={4}
              fullWidth
              placeholder="Brief description of your concept (optional)"
              value={data.concept}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.12)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.24)',
                  },
                },
              }}
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            className='self-end bg-purple-600 hover:bg-purple-700'
          >
            Create Project
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateProjectModal
