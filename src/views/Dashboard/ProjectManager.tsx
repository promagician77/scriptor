'use client'

// React Imports
import type { ChangeEvent } from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Next Imports
import Link from 'next/link'
import { createClient } from '@configs/supabase'
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import LinearProgress from '@mui/material/LinearProgress'
import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'

// Type Imports
import type { Course } from '@/types/projectTypes'
import type { ThemeColor } from '@core/types'

// Component Imports
import ImageUpload from './ImageUpload'


const genres = ['Romance', 'Mystery', 'Sci-Fi', 'Drama', 'Comedy', 'Horror']
const tones = ['Light', 'Dark', 'Humorous', 'Serious', 'Mysterious']

interface ProjectManagerProps {
  mode: 'create' | 'edit' | 'show'
  projectId?: string
}

const ProjectManager = ({ mode, projectId }: ProjectManagerProps) => {
  const router = useRouter()
  const supabase = createClient()
  
  const [data, setData] = useState({
    title: '',
    genre: '',
    tone: '',
    concept: '',
    imageUrl: '',
    duration: '1.5 hours',
    lectures: 19,
    level: 'All Level',
    students: 38815,
    language: 'English'
  })

  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')

  useEffect(() => {
    // ... existing fetch project code ...
  }, [projectId, mode])

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setSelectedImage(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const isReadOnly = mode === 'show'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Handle image upload if there's a new image
      let imageUrl = data.imageUrl
      if (selectedImage) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('course-images')
          .upload(`${Date.now()}-${selectedImage.name}`, selectedImage)

        if (uploadError) throw uploadError
        imageUrl = uploadData.path
      }

      const submitData = {
        ...data,
        imageUrl
      }

      if (mode === 'edit') {
        const { error } = await supabase
          .from('Project')
          .update(submitData)
          .eq('id', projectId)

        if (error) throw error
        toast.success('Course updated successfully')
      } else if (mode === 'create') {
        const { error } = await supabase
          .from('Project')
          .insert(submitData)

        if (error) throw error
        toast.success('Course created successfully')
      }

      router.push('/home')
    } catch (error) {
      toast.error(mode === 'edit' ? 'Error updating course' : 'Error creating course')
      console.error('Error:', error)
    }
  }

  return (
    <Card className='w-full h-full'>
      <CardContent className='flex flex-col gap-6 h-full'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div>
            <Typography variant='h3'>{mode === 'edit' ? 'Edit Project' : 'Create Project'}</Typography>
          </div>
          <div>
            <Button type="submit" variant="contained" color="primary">
                {mode === 'edit' ? 'Update' : 'Create'}
            </Button>
          </div>
        </div>
        <Divider />
        <Grid container spacing={2} className='mt-4'>
            <Grid item xs={12} md={7}>
                <ImageUpload />
            </Grid>
            <Divider orientation='vertical' flexItem className='pl-3'/>
            <Grid item xs={12} md={4.88} className='pl-3 space-y-5'>
                <TextField
                    fullWidth
                    label='Title'
                    name='title'
                    value={data.title}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    select
                    label="Genre"
                    name="genre"
                    value={data.genre}
                    onChange={handleChange}
                    disabled={isReadOnly}
                >
                    {genres.map(genre => (
                    <MenuItem key={genre} value={genre}>
                        {genre}
                    </MenuItem>
                    ))}
                </TextField>
                <TextField
                    fullWidth
                    select
                    label="Tone"
                    name="tone"
                    value={data.tone}
                    onChange={handleChange}
                    disabled={isReadOnly}
                >
                    {tones.map(tone => (
                    <MenuItem key={tone} value={tone}>
                        {tone}
                    </MenuItem>
                    ))}
                </TextField>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Concept"
                    name="concept"
                    value={data.concept}
                    onChange={handleChange}
                    disabled={isReadOnly}
                />
            </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProjectManager
