import React, { useContext } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import PersonalInfo from './components/PersonalInfo'
import BasicInfo from './components/BasicInfo'
import Skills from './components/Skills'
import WorkExperience from './components/WorkExperience'
import ProjectExperience from './components/ProjectExperience'
import SelfEvaluation from './components/SelfEvaluation'
import SortableItem from '../SortableItem'


const ResumePreviewTemplate1 = ({ modules }) => {
  const { resumeInfo } = useContext(ResumeInfoContext)
  
  return (
    <div className="whitespace-pre-wrap break-words">
      {modules.map(({ order, value }) => {
        switch (value) {
          case 'personalInfo':
            if (!(resumeInfo?.name || resumeInfo?.phone || resumeInfo?.email)) return null
            return <SortableItem key={order} id={order}><PersonalInfo resumeInfo={resumeInfo} /></SortableItem>
          case 'basicInfo':
            if (!resumeInfo?.education?.length) return null
            return <SortableItem key={order} id={order}><BasicInfo order={order- 1}  resumeInfo={resumeInfo} /></SortableItem>
          case 'skills':
            if (!resumeInfo?.skills?.length) return null
            return <SortableItem key={order} id={order}><Skills order={order - 1} resumeInfo={resumeInfo} /></SortableItem>
          case 'experience':
            if (!resumeInfo?.experience?.length) return null
            return <SortableItem key={order} id={order}><WorkExperience order={order - 1} resumeInfo={resumeInfo} /></SortableItem>
          case 'projectExperience':
            if (!resumeInfo?.projectExperience?.length) return null
            return <SortableItem key={order} id={order}><ProjectExperience resumeInfo={resumeInfo}  order={order - 1}/></SortableItem>
          case 'selfEvaluation':
            if (!resumeInfo?.selfEvaluation) return null
            return <SortableItem key={order} id={order}><SelfEvaluation order={order - 1} resumeInfo={resumeInfo} /></SortableItem>
          default:
            return null
        }
      })}
    </div>
  )
}

export default ResumePreviewTemplate1
