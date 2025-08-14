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
  return `你是一名专业简历写作助手。根据以下简历信息 resumeInfo，生成 6 条技能描述：

  每条技能控制在 30 到 40 个字，句子完整、简洁、有力；

  突出技能的实际应用和优势，符合职业简历风格；

  每次生成必须与之前不同，句式、动词、专业术语和表达方式尽量多样化；
  不要和我给你发的内容有重复的点
  使用多种动词和短语，如“精通”“掌握”“熟练运用”“具备能力”等，避免模板化；
    请全部使用中文输出，不要夹杂英文或拼音。
  输出顺序、结构和内容尽量随机化，使每次调用结果独特；

  为保证多样化，在提示中加入随机标识： ${Date.now()}-${Math.floor(Math.random()*1000)}；

  以 “- ” 开头列出，每条一行，直接输出列表内容，不要额外说明；

  随机标识: ${Date.now()}-${Math.floor(Math.random()*1000)}
  resumeInfo: ${JSON.stringify(resumeInfo)}

  请直接生成技能列表，确保每次输出都不重复且自然。
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
