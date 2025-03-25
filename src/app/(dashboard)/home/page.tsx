import ProjectCard from '@/views/Dashboard/ProjectCard'

import { Grid, Typography, Button } from '@mui/material'

export default function Page() {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <Typography variant='h5' color='primary' className='mbe-3'> Projects </Typography>
        <Button variant='contained' color='primary'> Add Project </Button>
      </div>
      <Grid container spacing={2} className='mt-4'>
        <Grid item xs={12} md={4}>
          <ProjectCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <ProjectCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <ProjectCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <ProjectCard /> 
        </Grid>
        <Grid item xs={12} md={4}>
          <ProjectCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <ProjectCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <ProjectCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <ProjectCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <ProjectCard />
        </Grid>
      </Grid>
    </div>
  )
}
