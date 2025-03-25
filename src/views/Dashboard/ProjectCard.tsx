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
}

const ProjectCard = ({ title = 'The Last Horizon', category = 'Sci-Fi', completionPercentage = 65, lastUpdated = '2 days ago' }: ProjectCardProps) => {
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

        <div className='flex gap-2 pt-2'>
          <Button
            variant='outlined'
            size='small'
            className='min-w-0 px-3 py-1'
            sx={{
              borderColor: 'rgba(0, 0, 0, 0.12)',
              color: 'text.primary',
              '&:hover': {
                borderColor: 'rgba(0, 0, 0, 0.24)',
              }
            }}
            startIcon={<i className='bx-edit-alt' />}
          >
            Edit
          </Button>
          <Button
            variant='outlined'
            size='small'
            className='min-w-0 px-3 py-1'
            sx={{
              borderColor: 'rgba(0, 0, 0, 0.12)',
              color: 'text.primary',
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
            size='small'
            className='min-w-0 px-3 py-1'
            sx={{
              borderColor: '#DC2626',
              color: '#DC2626',
              '&:hover': {
                borderColor: '#EF4444',
                backgroundColor: 'rgba(220, 38, 38, 0.04)'
              }
            }}
            startIcon={<i className='bx-trash' />}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default ProjectCard
