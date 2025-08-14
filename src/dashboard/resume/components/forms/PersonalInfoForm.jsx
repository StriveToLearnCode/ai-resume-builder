import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import GlobalApi from '../../../../../service/GlobalApi.js'
import { useParams } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

function BasicInfoForm() {
  const { t } = useTranslation()
  const params = useParams()
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [formData, setFormData] = useState({
    name: '',
    position:'',
    phone: '',
    email: '',
    github: '',
    blog: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setFormData({
      name: resumeInfo?.name || '',
      position:resumeInfo?.position || '',
      phone: resumeInfo?.phone || '',
      email: resumeInfo?.email || '',
      github: resumeInfo?.github || '',
      blog: resumeInfo?.blog || ''
    })
  }, [resumeInfo])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setResumeInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        data: {
          ...formData,
        }
      }
      await GlobalApi.updateResumeDetail(params?.resumeId, payload)
      toast.success(t('update_success'))
    } catch (error) {
      console.error(error)
      toast.error(t('update_failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-5 shadow-lg border-t-black border-t-5'>
      <h2 className='font-bold text-lg'>{t('personal_info')}</h2>
      <p>{t('start_fill_personal_info')}</p>

      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 mt-5 gap-3'>
          <div>
            <label className='text-sm'>{t('name')}</label>
            <Input value={formData.name} required name="name" onChange={handleInputChange} />
          </div>
          <div>
            <label className='text-sm'>{t('phone')}</label>
            <Input value={formData.phone} required name="phone" onChange={handleInputChange} />
          </div>
          <div>
            <label className='text-sm'>{t('email')}</label>
            <Input value={formData.email} required name="email" onChange={handleInputChange} />
          </div>
          <div>
            <label className='text-sm'>职位</label>
            <Input value={formData.position} required name="position" onChange={handleInputChange} />
          </div>
          <div>
            <label className='text-sm'>{t('github_link')}</label>
            <Input placeholder={t('optional')} value={formData.github} name="github" onChange={handleInputChange} />
          </div>
          <div>
            <label className='text-sm'>{t('blog_link')}</label>
            <Input placeholder={t('optional')} value={formData.blog} name="blog" onChange={handleInputChange} />
          </div>
        </div>
        <div className='mt-4 flex justify-end'>
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className='animate-spin' /> : t('save')}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default BasicInfoForm
