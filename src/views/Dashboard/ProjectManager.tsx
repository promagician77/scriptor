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
    if (projectId && (mode === 'edit' || mode === 'show')) {
      const fetchProject = async () => {
        const { data: projectData, error } = await supabase
          .from('Project')
          .select('*')
          .eq('id', projectId)
          .single()

        if (error) {
          toast.error('Error fetching project')
          router.push('/home')
        } else if (projectData) {
          setData({
            title: projectData.title,
            genre: projectData.genre,
            tone: projectData.tone,
            concept: projectData.concept || '',
            imageUrl: projectData.imageUrl || '',
            duration: projectData.duration || '1.5 hours',
            lectures: projectData.lectures || 19,
            level: projectData.level || 'All Level',
            students: projectData.students || 38815,
            language: projectData.language || 'English'
          })
        }
      }

      fetchProject()
    }
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

  const isReadOnly = mode === 'show'

  return (
    <Card className='w-full max-w-2xl mx-auto mt-8'>
      <CardContent className='space-y-6'>
        <div>
          <Typography variant='h5' className='mb-2'>
            {mode === 'create' ? 'Create New Project' : 
             mode === 'edit' ? 'Edit Project' : 'Project Details'}
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
              disabled={isReadOnly}
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
              disabled={isReadOnly}
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
              disabled={isReadOnly}
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
              disabled={isReadOnly}
            />
          </div>

          <div className='flex gap-3 justify-end'>
            <Button
              variant="outlined"
              onClick={() => router.push('/home')}
            >
              {isReadOnly ? 'Back' : 'Cancel'}
            </Button>
            {!isReadOnly && (
              <Button
                type="submit"
                variant="contained"
                className='bg-purple-600 hover:bg-purple-700'
              >
                {mode === 'edit' ? 'Update Project' : 'Create Project'}
              </Button>
            )}
            {isReadOnly && (
              <Button
                variant="contained"
                className='bg-purple-600 hover:bg-purple-700'
                onClick={() => router.push(`/home/${projectId}/edit`)}
              >
                Edit Project
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default ProjectManager 
