import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useState, useEffect, useMemo } from 'react'
import GlobalApi from '../../../../../service/GlobalApi.js'
import { useParams } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import AiSuggest from '../AiSuggest.jsx'



function SkillsForm() {
  const { t } = useTranslation()
  const params = useParams()
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(false)
  const prompt = useMemo(() => {
  if(!resumeInfo) return
  return `你是一名专业简历写作助手。请根据以下简历信息 resumeInfo，生成大约6条技能描述。

  要求：
  - 每条技能点控制在30到40字，句子完整、简洁且有力；
  - 突出技能的实际应用和优势，符合职业简历风格；
  - 多次调用时请尽量避免重复，确保内容多样化；
  - 请以“- ”开头列出，每条一行，直接输出列表内容，不要额外说明。

  resumeInfo:
  ${JSON.stringify(resumeInfo)}

  请开始输出：
  -
  `
}, [resumeInfo])

  useEffect(() => {
    if (resumeInfo?.skills && Array.isArray(resumeInfo.skills)) {
      setSkills(JSON.parse(JSON.stringify(resumeInfo.skills)))
    } else {
      setSkills([])
    }
  }, [resumeInfo])

  const handleSkillChange = (index, value) => {
    const newSkills = [...skills]
    newSkills[index].text = value
    setSkills(newSkills)
    setResumeInfo({
      ...resumeInfo,
      skills: newSkills
    })
  }

  const addSkill = () => {
    const newSkills = [
      ...skills,
      { text: '' }
    ]
    setSkills(newSkills)
    setResumeInfo({
      ...resumeInfo,
      skills: newSkills
    })
  }

  const removeSkill = (index) => {
    const newSkills = [...skills]
    newSkills.splice(index, 1)
    setSkills(newSkills)
    setResumeInfo({
      ...resumeInfo,
      skills: newSkills
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const cleanedSkills = skills.map(skill => ({
      text: skill.text.trim(),
    }))
    setLoading(true)

    try {
      const payload = {
        data: {
          skills: cleanedSkills,
        }
      }
      await GlobalApi.updateResumeDetail(params?.resumeId, payload, 'skills')
      toast(t('skills.updateSuccess'))
    } catch (error) {
      console.error(error)
      toast.error(t('skills.updateFail'))
    } finally {
      setLoading(false)
    }
  }
  const setAiSuggest = (suggest) => {
    console.log(suggest);
    const newSkills = [...skills, {
      text: suggest
    }]
    setSkills(newSkills)
    setResumeInfo({
      ...resumeInfo,
      skills: newSkills
    })
  }
  return (
    <div className='p-5 shadow-lg border-t-black border-t-5'>
      <div className='flex justify-between'>
        <div>
          <h2 className='font-bold text-lg'>{t('skills.title')}</h2>
          <p>{t('skills.description')}</p>
        </div>
        <div>
          <AiSuggest prompt={prompt} setAiSuggest={setAiSuggest} />
        </div>
      </div>  

      <form className='mt-2' onSubmit={handleSubmit}>
        {skills.map((skill, index) => (
          <div key={index} className='flex items-center gap-3 mb-3'>
            <Input
              value={skill.text}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              placeholder={t('skills.placeholder')}
              required
            />
            <Button
              variant='destructive'
              size='sm'
              type='button'
              onClick={() => removeSkill(index)}
            >
              {t('delete')}
            </Button>
          </div>
        ))}

        <Button variant='outline' type='button' onClick={addSkill} className='my-4'>
          {t('skills.add')}
        </Button>

        <div className='flex justify-end'>
          <Button type='submit' disabled={loading}>
            {loading ? <LoaderCircle className='animate-spin' /> : t('save')}
          </Button>
        </div>
      </form>
      
    </div>
  )
}

export default SkillsForm
