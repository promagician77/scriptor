'use client'

// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// External Imports
import swal from 'sweetalert'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import { Divider } from '@mui/material'

// Internal Imports
import { createClient } from '@configs/supabase'
import type { ThemeColor } from '@core/types'

const chipColor: ThemeColor[] = ["primary", "success", "error", "warning", "info"]

const Dashboard = () => {
  const supabase = createClient()
  const router = useRouter()

  const [projects, setProjects] = useState<any[]>([])
  const [rerender, setRerender] = useState(false)
  const [activePage, setActivePage] = useState(0)

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('Project')
        .select('*')
      if (error) {
        console.error('Error fetching projects:', error)
      } else {
        setProjects(data)
      }
    }

    fetchProjects()
  }, [rerender, activePage, supabase])

  const handleDelete = async (projectId: string) => {
    const willDelete = await swal({
      title: 'Delete Project?',
      text: 'Are you sure you want to delete this project? This action cannot be undone.',
      icon: 'warning',
      buttons: ['Cancel', 'Yes, delete it!'],
      dangerMode: true,
    });

    if (willDelete) {
      try {
        swal({
          title: 'Deleting project...',
          text: 'Please wait...',
          icon: 'info',
          closeOnClickOutside: false,
        });

        const { error } = await supabase
          .from('Project')
          .delete()
          .eq('id', projectId);

        if (error) throw error;

        await swal({
          title: 'Success!',
          text: 'Project deleted successfully',
          icon: 'success',
        });

        setRerender(prev => !prev);
      } catch (error) {
        console.error('Error:', error);
        await swal({
          title: 'Error!',
          text: 'Error deleting project',
          icon: 'error',
        });
      }
    }
  };

  return (
    <Card className='w-full h-full'>
      <CardContent className='flex flex-col gap-6'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div>
            <Typography variant='h3'>Projects</Typography>
            <Typography>Total {projects.length} projects you have created</Typography>
          </div>
          <div>
            <Button
              fullWidth
              variant='tonal'
              color='primary'
              startIcon={<i className='bx-plus' />}
              className='is-auto flex-auto'
              onClick={() => router.push('/home/new')}
            >
              Create
            </Button>
          </div>
        </div>
        <Divider />
        <Grid container spacing={2} className='mt-4'>
        {
          projects.map((project) => (
            <Grid item xs={12} md={4} key={project.id}>
              <div 
                className='border rounded bs-full h-[600px] flex flex-col'
                onClick={(e) => {
                  // Only navigate if the click is not on a button
                  if (!(e.target as HTMLElement).closest('button')) {
                    router.push(`/home/${project.id}/show`)
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className='pli-2 pbs-2 border-radius-10 h-[250px]'>
                  <img 
                    src={project.imageUrl} 
                    className='w-full h-full object-cover border-radius-10' 
                    alt={project.title}
                  />
                </div>
                <div className='flex flex-col gap-4 p-6 flex-1'>
                  <div className='flex items-center justify-between'>
                    <Chip 
                      label={project.genre} 
                      variant='tonal' 
                      size='small' 
                      color={chipColor[project.id % chipColor.length] as ThemeColor} 
                    />
                    <div className='flex items-start'>
                      <Typography className='font-medium mie-1'>4.8</Typography>
                      <i className='bx-bxs-star text-xl text-warning mie-2' />
                      <Typography>{`(${10})`}</Typography>
                    </div>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <Typography
                      variant='h5'
                      component={Link}
                      href={`/apps/academy/course-details`}
                      className='hover:text-primary line-clamp-1'
                    >
                      {project.title}
                    </Typography>
                    <Typography className='line-clamp-2 h-[48px]'>{project.concept}</Typography>
                  </div>
                  <div className='flex flex-col gap-1 mt-auto'>
                      <div className='flex items-center gap-1'>
                        <i className='bx-time-five text-xl' />
                        <Typography>{`20h 46m`}</Typography>
                      </div>
                    <LinearProgress
                      color='primary'
                      value={Math.floor(80)}
                      variant='determinate'
                      className='is-full bs-2'
                    />
                  </div>
                    <div className='flex flex-wrap gap-4'>
                      <Button
                        fullWidth
                        variant='tonal'
                        color='primary'
                        startIcon={<i className='bx-edit-alt' />}
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/home/${project.id}/edit`);
                        }}
                        className='is-auto flex-auto'
                      >
                        Edit
                      </Button>
                      <Button
                        fullWidth
                        variant='tonal'
                        color='error'
                        startIcon={<i className='bx-trash' />}
                        onClick={(e) => {
                          e.stopPropagation(); 
                          handleDelete(project.id);
                        }}
                        className='is-auto flex-auto'
                      >
                        Delete
                      </Button>
                    </div>
                  {/* )} */}
                </div>
              </div>
            </Grid>
          ))
        }
        </Grid>
        <div className='flex justify-center'>
          <Pagination
            count={Math.ceil(projects.length / 6)}
            page={activePage + 1}
            showFirstButton
            showLastButton
            shape='rounded'
            variant='tonal'
            color='primary'
            onChange={(e, page) => setActivePage(page - 1)}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default Dashboard
