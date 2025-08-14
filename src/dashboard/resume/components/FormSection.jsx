import React, { useState, useEffect } from 'react'
import PersonalInfoForm from './forms/PersonalInfoForm'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home } from 'lucide-react'
import BasicInfoForm from './forms/BasicInfoForm'
import SkillsForm from './forms/SkillsForm'
import ExperienceForm from './forms/ExperienceForm'
import ProjectExperienceForm from './forms/ProjectExperienceForm'
import SelfEvaluationForm from './forms/SelfEvaluationForm'
import { Link, Navigate, useParams } from 'react-router-dom'
import ThemeColor from './ThemeColor'
import { useTranslation } from 'react-i18next'

const STORAGE_KEY = 'activeFormIndex'

function FormSection() {
  const { t } = useTranslation()
  const params = useParams()

  // 初始化时从 localStorage 读取，没值默认 1
  const [activeFormIndex, setActiveFormIndex] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? Number(saved) : 1
  })

  // 状态变更时同步存储
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, activeFormIndex)

    return () => {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [activeFormIndex])



  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div className="flex gap-2">
          <Link to="/dashboard">
            <Button size="sm">
              <Home />
            </Button>
          </Link>
          <ThemeColor />
        </div>

        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button size="sm" onClick={() => setActiveFormIndex(pre => pre - 1)}>
              <ArrowLeft />
            </Button>
          )}
          <Button size="sm" onClick={() => setActiveFormIndex(pre => pre + 1)}>
            {t('next_page')}
            <ArrowRight />
          </Button>
        </div>
      </div>

      {activeFormIndex === 1 && <PersonalInfoForm  />}
      {activeFormIndex === 2 && <BasicInfoForm  />}
      {activeFormIndex === 3 && <SkillsForm  />}
      {activeFormIndex === 4 && <ExperienceForm  />}
      {activeFormIndex === 5 && <ProjectExperienceForm  />}
      {activeFormIndex === 6 && <SelfEvaluationForm  />}
      {activeFormIndex > 6 && <Navigate to={`/my-resume/${params.resumeId}/view`} />}
    </div>
  )
}

export default FormSection
