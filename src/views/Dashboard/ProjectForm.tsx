'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@configs/supabase'
import { toast } from 'react-toastify'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

const genres = ['Romance', 'Mystery', 'Sci-Fi', 'Drama', 'Comedy', 'Horror']
const tones = ['Light', 'Dark', 'Humorous', 'Serious', 'Mysterious']

interface ProjectFormProps {
  projectId?: string // Optional - if provided, we're editing an existing project
}

const ProjectForm = ({ projectId }: ProjectFormProps) => {
  const router = useRouter()
  const supabase = createClient()
  
  const [data, setData] = useState({
    title: '',
    genre: '',
    tone: '',
    concept: ''
  })

  useEffect(() => {
    // If projectId exists, fetch project data
    if (projectId) {
      const fetchProject = async () => {
        const { data: projectData, error } = await supabase
          .from('Project')
          .select('*')
          .eq('id', projectId)
          .single()

        if (error) {
          toast.error('Error fetching project')
          router.push('/about')
        } else if (projectData) {
          setData({
            title: projectData.title,
            genre: projectData.genre,
            tone: projectData.tone,
            concept: projectData.concept || ''
          })
        }
      }

      fetchProject()
    }
  }, [projectId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (projectId) {
        // Update existing project
        const { error } = await supabase
          .from('Project')
          .update(data)
          .eq('id', projectId)

        if (error) throw error
        toast.success('Project updated successfully')
      } else {
        // Create new project
        const { error } = await supabase
          .from('Project')
          .insert(data)

        if (error) throw error
        toast.success('Project created successfully')
      }

      router.push('/about')
    } catch (error) {
      toast.error(projectId ? 'Error updating project' : 'Error creating project')
      console.error('Error:', error)
    }
  }

  return (
    <Card className='w-full max-w-2xl mx-auto mt-8'>
      <CardContent className='space-y-6'>
        <div>
          <Typography variant='h5' className='mb-2'>
            {projectId ? 'Edit Project' : 'Create New Project'}
          </Typography>
          <Typography variant='body2' className='text-gray-600'>
            {projectId ? 'Update your project details' : 'Enter details for your new project'}
          </Typography>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-2'>
            <Typography variant='subtitle2' className='text-gray-700'>Title</Typography>
            <TextField
              name="title"
              placeholder="Enter project title"
              fullWidth
              required
              value={data.title}
              onChange={handleChange}
              size="small"
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
            />
          </div>

          <div className='flex gap-3 justify-end'>
            <Button
              variant="outlined"
              onClick={() => router.push('/about')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              className='bg-purple-600 hover:bg-purple-700'
            >
              {projectId ? 'Update Project' : 'Create Project'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default ProjectForm 
