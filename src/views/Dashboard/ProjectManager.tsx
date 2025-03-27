'use client'

// React Imports
import type { ChangeEvent } from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Next Imports
import { createClient } from '@configs/supabase'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'

// Component Imports
import ImageUpload from './ImageUpload'
import swal from 'sweetalert'


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
  })

  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')

  useEffect(() => {
    if (projectId) {
      const fetchProject = async () => {
        const { data, error } = await supabase
          .from('Project')
          .select('*')
          .eq('id', projectId)
          .single()

        if (error) {
          console.error('Error fetching project:', error)
          await swal({
            title: 'Error!',
            text: 'Failed to fetch project data',
            icon: 'error',
          })
        } else if (data) {
          setData(data)
          // Set preview URL if there's an existing image
          if (data.imageUrl) {
            setPreviewUrl(data.imageUrl)
          }
        }
      }

      fetchProject()
    }
  }, [projectId, mode])

  const handleImageSelect = (file: File) => {
    setSelectedImage(file)
    setPreviewUrl(URL.createObjectURL(file))
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
    
    const willCreate = await swal({
      title: 'Create Project?',
      text: 'Are you sure you want to create this project?',
      icon: 'warning',
      buttons: ['Cancel', 'Yes, create it!'],
      dangerMode: true,
    })

    if (willCreate) {
      try {
        swal({
          title: mode === 'create' ? 'Creating project...' : 'Updating project...',
          text: 'Please wait...',
          icon: 'info',
          closeOnClickOutside: false,
        })

        let imageUrl = data.imageUrl
        if (selectedImage) {
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('scriptor')
            .upload(`${Date.now()}-${selectedImage.name}`, selectedImage)

          if (uploadError) throw uploadError

          const { data: publicUrlData } = supabase.storage
            .from('scriptor')
            .getPublicUrl(uploadData.path)

          imageUrl = publicUrlData.publicUrl
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
          
          await swal({
            title: 'Success!',
            text: 'Project updated successfully',
            icon: 'success',
          })
        } else if (mode === 'create') {
          const { error } = await supabase
            .from('Project')
            .insert(submitData)

          if (error) throw error
          
          await swal({
            title: 'Success!',
            text: 'Project created successfully',
            icon: 'success',
          })
        }

        router.push('/home')
      } catch (error) {
        console.error('Error:', error)
        await swal({
          title: 'Error!',
          text: mode === 'edit' ? 'Error updating project' : 'Error creating project',
          icon: 'error',
        })
      }
    }
  }

  return (
    <Card className='w-full h-full'>
      <CardContent className='flex flex-col gap-6 h-full'>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-wrap items-center justify-between gap-4'>
            <div>
              <Typography variant='h3'>{mode === 'edit' ? 'Edit Project' : mode === 'create' ? 'Create Project' : data.title}</Typography>
            </div>
          </div>
          <Divider />
          <Grid container spacing={2} className='mt-4'>
              <Grid item xs={12} md={7}>
                  <ImageUpload 
                    onImageSelect={handleImageSelect} 
                    previewUrl={previewUrl}
                    isReadOnly={isReadOnly}
                  />
              </Grid>
              <Divider orientation='vertical' flexItem className='pl-3'/>
              <Grid item xs={12} md={4.88} className='pl-3 space-y-5'>
                  <TextField
                      fullWidth
                      label='Title'
                      name='title'
                      value={data.title}
                      onChange={handleChange}
                      disabled={isReadOnly}
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
          <Divider flexItem className='mt-4 mb-4'/>
          <div className='flex justify-end'>
            {
              mode !== 'show' && (
                <Button type="submit" variant="tonal" color="primary" startIcon={mode === 'edit' ? <i className='bx-edit-alt' /> : <i className='bx-plus' />}>
                  {mode === 'edit' ? 'Update' : 'Create'}
                </Button>
              )
            }
            <Button type="submit" variant="tonal" color="error" className='ml-4' startIcon={<i className='bx-x' />}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default ProjectManager
