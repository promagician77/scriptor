import Swal from 'sweetalert'
import { toast } from 'react-toastify'
import { createClient } from '@configs/supabase'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'

interface ProjectCardProps {
  title: string
  category: string
  completionPercentage: number
  lastUpdated: string
  id: string
  onUpdate: () => void
}

const ProjectCard = ({ title, category, completionPercentage, lastUpdated, id, onUpdate }: ProjectCardProps) => {
  const supabase = createClient()
  
  const handleDelete = async () => {
    const willDelete = await Swal({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      buttons: ['Cancel', 'Delete'],
      dangerMode: true,
    })

    if (willDelete) {
      try {
        const { error } = await supabase
          .from('Project')
          .delete()
          .eq('id', id)

        if (error) {
          toast.error('Error deleting project')
        } else {
          toast.success('Project deleted successfully')
          onUpdate()
        }
      } catch (error) {
        toast.error('Error deleting project')
        console.error('Error:', error)
      }
    }
  }

  const handleEdit = async () => {
    console.log('edit')
  }
  
  return (
    <Card className='bg-white shadow-sm'>
      <CardContent className='space-y-3'> 
        <div>
          <Typography variant='h6' className='text-gray-900'>
            {title}
          </Typography>
          <div className='flex items-center gap-2 text-gray-500'>
            <Typography variant='body2'>{category}</Typography>
            <Typography variant='body2'>•</Typography>
            <Typography variant='body2'>{lastUpdated}</Typography>
          </div>
        </div>

        <div className='space-y-1'>
          <LinearProgress
            variant="determinate"
            value={completionPercentage}
            className='h-1.5 rounded-full'
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.08)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#7C3AED'
              }
            }}
          />
          <Typography variant='body2' className='text-gray-500'>
            {completionPercentage}% complete
          </Typography>
        </div>

        <div className='flex gap-2 pt-2 justify-end'>
          <Button
            variant='outlined'
            size='small'
            className='min-w-0 px-3 py-1'
            sx={{
              borderColor: 'rgba(0, 0, 0, 0.12)',
              '&:hover': {
                borderColor: 'rgba(0, 0, 0, 0.24)',
              }
            }}
            startIcon={<i className='bx-edit-alt' />}
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            variant='outlined'
            size='small'
            className='min-w-0 px-3 py-1'
            sx={{
              borderColor: 'rgba(0, 0, 0, 0.12)',
              '&:hover': {
                borderColor: 'rgba(0, 0, 0, 0.24)',
              }
            }}
            startIcon={<i className='bx-export' />}
          >
            Export
          </Button>
          <Button
            variant='outlined'
            color='error'
            size='small'
            sx={{
              borderColor: 'rgba(0, 0, 0, 0.12)',
              '&:hover': {
                borderColor: 'rgba(0, 0, 0, 0.24)',
              }
            }}
            startIcon={<i className='bx-trash' />}
            onClick={handleDelete}
          >
            Delete
          </Button> 
        </div>
      </CardContent>
    </Card>
  )
}

export default ProjectCard
