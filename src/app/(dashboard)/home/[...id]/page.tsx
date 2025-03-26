'use client'

import { useParams } from 'next/navigation'
import ProjectManager from '@/views/Dashboard/ProjectManager'

const ProjectPage = () => {
  const params = useParams()
  
  // Handle different routes:
  // /home/new -> create mode
  // /home/[id] -> show mode
  // /home/[id]/edit -> edit mode
  const id = params?.id?.[0]
  const isEdit = params?.id?.[1] === 'edit'
  const isNew = id === 'new'

  let mode: 'create' | 'edit' | 'show' = 'show'
  if (isNew) mode = 'create'
  else if (isEdit) mode = 'edit'

  return (
    <div className='flex flex-col justify-center items-center p-6'>
      <ProjectManager 
        mode={mode}
        projectId={!isNew ? id : undefined}
      />
    </div>
  )
}

export default ProjectPage
