'use client'

// React Imports
import type { ChangeEvent } from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Next Imports
import Link from 'next/link'
import { createClient } from '@configs/supabase'
import { useParams } from 'next/navigation'

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

// Type Imports
import type { Course } from '@/types/projectTypes'
import type { ThemeColor } from '@core/types'
import { Divider } from '@mui/material'

// Component Imports

type ChipColorType = {
  color: ThemeColor
}

const chipColor: { [key: string]: ChipColorType } = {
  Web: { color: 'primary' },
  Art: { color: 'success' },
  'UI/UX': { color: 'error' },
  Psychology: { color: 'warning' },
  Design: { color: 'info' }
}

const Dashboard = () => {
  const supabase = createClient();
  const router = useRouter();

  // States
  const [projects, setProjects] = useState<any[]>([])
  const [rerender, setRerender] = useState(false)
  const [activePage, setActivePage] = useState(0)


  // Hooks

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
  }, [rerender, activePage])

  return (
    <Card className='w-full h-full'>
      <CardContent className='flex flex-col gap-6'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div>
            <Typography variant='h3'>Projects</Typography>
            <Typography>Total 6 course you have purchased</Typography>
          </div>
          <div>
            <Button
              fullWidth
              variant='outlined'
              color='primary'
              startIcon={<i className='bx-plus' />}
              className='is-auto flex-auto'
              onClick={() => router.push('/home/new')}
            >
              Create
            </Button>
          </div>
          {/* <div className='flex flex-wrap items-center gap-y-4 gap-x-6'>
            <CustomTextField
              select
              fullWidth
              id='select-course'
              value={course}
              onChange={e => {
                setCourse(e.target.value)
                setActivePage(0)
              }}
              className='is-[250px] flex-auto'
            >
              <MenuItem value='All'>All Courses</MenuItem>
              <MenuItem value='Web'>Web</MenuItem>
              <MenuItem value='Art'>Art</MenuItem>
              <MenuItem value='UI/UX'>UI/UX</MenuItem>
              <MenuItem value='Psychology'>Psychology</MenuItem>
              <MenuItem value='Design'>Design</MenuItem>
            </CustomTextField>
            <FormControlLabel
              control={<Switch onChange={handleChange} checked={hideCompleted} />}
              label='Hide completed'
            />
          </div> */}
        </div>
        {/* {data.length > 0 ? ( */}
        <Divider />
        <Grid container spacing={2} className='mt-4'>
        {
          projects.map((project) => (
            <Grid item xs={12} md={4}>
              <div 
                className='border rounded bs-full'
                onClick={() => router.push(`/home/${project.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className='pli-2 pbs-2'>
                  <Link href={`/apps/academy/course-details`} className='flex'>
                    <img 
                      src={project.image_url} 
                      className='is-full' 
                      alt={project.title}
                    />
                  </Link>
                </div>
                <div className='flex flex-col gap-4 p-6'>
                  <div className='flex items-center justify-between'>
                    <Chip label="Web" variant='tonal' size='small' color={chipColor["Web"].color} />
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
                      className='hover:text-primary'
                    >
                      {project.title}
                    </Typography>
                    <Typography>Introductory course for Angular and framework basics with TypeScript</Typography>
                  </div>
                  <div className='flex flex-col gap-1'>
                    {/* {item.completedTasks === item.totalTasks ? (
                      <div className='flex items-center gap-1'>
                        <i className='bx-check text-xl text-success' />
                        <Typography color='success.main'>Completed</Typography>
                      </div>
                    ) : ( */}
                      <div className='flex items-center gap-1'>
                        <i className='bx-time-five text-xl' />
                        <Typography>{`20h 46m`}</Typography>
                      </div>
                    {/* )} */}
                    <LinearProgress
                      color='primary'
                      value={Math.floor(80)}
                      variant='determinate'
                      className='is-full bs-2'
                    />
                  </div>
                  {/* {item.completedTasks === item.totalTasks ? (
                    <Button
                      variant='tonal'
                      startIcon={<i className='bx-rotate-right' />}
                      component={Link}
                      href={`/apps/academy/course-details`}
                    >
                      Start Over
                    </Button>
                  ) : ( */}
                    <div className='flex flex-wrap gap-4'>
                      <Button
                        fullWidth
                        variant='tonal'
                        color='primary'
                        startIcon={<i className='bx-edit-alt' />}
                        onClick={() => router.push(`/home/${project.id}/edit`)}
                        className='is-auto flex-auto'
                      >
                        Edit
                      </Button>
                      <Button
                        fullWidth
                        variant='tonal'
                        color='error'
                        endIcon={<i className='bx-trash' />}
                        component={Link}
                        href={`/apps/academy/course-details`}
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
        {/* ) : (
          <Typography className='text-center'>No courses found</Typography>
        )} */}
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
