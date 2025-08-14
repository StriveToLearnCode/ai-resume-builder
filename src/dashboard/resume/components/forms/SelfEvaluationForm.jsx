import { Button } from '@/components/ui/button'
import React, { useContext, useEffect, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Brain, LoaderCircle } from 'lucide-react'
import GlobalApi from '../../../../../service/GlobalApi.js'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import {AIChatSession} from '../../../../../service/AIModal.js'
const prompt = `
  你是一名资深简历优化专家，请根据以下个人信息，生成一段 80~120 字的中文自我评价，要求内容积极、专业，突出个人优势与职业潜力，适合放在求职简历中。避免使用过于口语化或笼统的形容词，语言简洁有力。

  【个人信息】：
  - 专业技能：{{skills}}
  - 工作/实习经历：{{experience}}
  - 项目经验：{{projectExperience}}
  - 荣誉奖项：{{awards}}
`
function SelfEvaluationForm() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const params = useParams()

  const [selfEvaluation,setSelfEvaluation] = useState()

  const [loading,setLoading] = useState(false)

  useEffect(() => {
    selfEvaluation && setResumeInfo({
      ...resumeInfo,
      selfEvaluation
    })
  },[selfEvaluation])

  const onSave =async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
      data: {
          selfEvaluation,
        }
      }
      await GlobalApi.updateResumeDetail(params?.resumeId, payload)
      toast('更新成功')
    } catch (error) {
      console.error(error)
      toast.error('更新失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const AIGenerate = async () => {
    setLoading(true)
    try {
      const skills = resumeInfo?.skills?.map(s => s.text).join('、') || ''
      const experience = resumeInfo?.experience?.map(exp => `${exp.title} at ${exp.companyName} (${exp.startDate} - ${exp.endDate || '至今'})`).join('；') || ''
      const projectExperience = resumeInfo?.projectExperience?.map(proj => proj.title).join('、') || ''
      const awards = resumeInfo?.awards?.map(award => `${award.title} (${award.level})`).join('、') || ''

      const aiPrompt = prompt
        .replace('{{skills}}', skills)
        .replace('{{experience}}', experience)
        .replace('{{projectExperience}}', projectExperience)
        .replace('{{awards}}', awards)

      const response = await AIChatSession(aiPrompt)
      if (!response.text) {
        throw new Error('AI response is empty')
      }
      setSelfEvaluation(response.text) 
      toast.success('AI 生成成功')
    } catch (error) {
      console.error('AI 生成失败:', error)
      toast.error('AI 生成失败，请重试')
    } finally {
      (true)
      setLoading(false)
    }
  }

  return (
    <div className="p-5 shadow-lg border-t-black border-t-5">
      <h2 className="font-bold text-lg">自我评价</h2>
      <p>填写你的自我评价</p>

      <form onSubmit={onSave} className='mt-2'>
        <div className='flex justify-end items-end'>
          <Button onClick={AIGenerate} variant="outline" type="button"  size='sm' className='border-primary text-primary flex gap-2'>
            <Brain className='h-4 w-4' />  AI 生成
          </Button>
        </div>
        <Textarea value={selfEvaluation || resumeInfo?.selfEvaluation || ''} className='mt-4' onChange={(e) => setSelfEvaluation(e.target.value)} />
        <div className='mt-4 flex justify-end'>
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className='animate-spin' /> : '保存'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SelfEvaluationForm