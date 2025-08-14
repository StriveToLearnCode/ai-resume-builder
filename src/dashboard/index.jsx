import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from '../../service/GlobalApi.js'
import AddResume from './components/AddResume'
import ResumeCardItem from './components/ResumeCardItem'
import { useTranslation } from 'react-i18next'

function Dashboard() {
  const { user } = useUser()
  const { t } = useTranslation()
  const [resumeList, setResumeList] = useState([])
  useEffect(() => {
    if (user) {
      getResumeList()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const getResumeList = async () => {
    try {
      const userEmail = user?.primaryEmailAddress?.emailAddress
      const res = await GlobalApi.getUserResumes(userEmail)
      setResumeList(res.data.data)
      console.log('获取简历列表:', res.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="p-10 md:px-20 lg:px-32 animate__animated animate__zoomIn">
      <h2 className="text-3xl font-bold">{t('my_resumes')}</h2>
      <p>{t('dashboard_desc')}</p>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        <AddResume />
        {resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <ResumeCardItem key={index} refreshPage={getResumeList} resume={resume} />
          ))}
      </div>
    </div>
  )
}

export default Dashboard
