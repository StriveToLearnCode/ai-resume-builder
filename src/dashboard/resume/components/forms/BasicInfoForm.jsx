import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useState, useEffect } from 'react'
import GlobalApi from '../../../../../service/GlobalApi.js'
import { useParams } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

function BasicInfoForm() {
  const { t } = useTranslation()
  const params = useParams()
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

  const [formData, setFormData] = useState([])

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (resumeInfo?.education && Array.isArray(resumeInfo.education)) {
      setFormData(JSON.parse(JSON.stringify(resumeInfo.education)))
    } else {
      setFormData([])
    }
  }, [resumeInfo])

  // 修改某条教育经历字段
  const handleEducationChange = (index, field, value) => {
    const newData = [...formData]
    newData[index][field] = value
    setFormData(newData)
    setResumeInfo({
      ...resumeInfo,
      education: newData
    })
  }

  // 修改某条教育经历里某个奖项字段
  const handleAwardChange = (eduIndex, awardIndex, field, value) => {
    const newData = [...formData]
    if (!newData[eduIndex].awards) newData[eduIndex].awards = []
    if (!newData[eduIndex].awards[awardIndex]) newData[eduIndex].awards[awardIndex] = {}
    newData[eduIndex].awards[awardIndex][field] = value
    setFormData(newData)
    setResumeInfo({
      ...resumeInfo,
      education: newData
    })
  }

  // 添加一条新的教育经历
  const addEducation = () => {
    const newData = [
      ...formData,
      {
        universityName: '',
        startDate: '',
        endDate: '',
        degree: '',
        major: '',
        awards: []
      }
    ]
    setFormData(newData)
    setResumeInfo({
      ...resumeInfo,
      education: newData
    })
  }

  // 添加奖项
  const addAward = (eduIndex) => {
    const newData = [...formData]
    if (!newData[eduIndex].awards) newData[eduIndex].awards = []
    newData[eduIndex].awards.push({
      title: '',
      level: '',
      prize: ''
    })
    setFormData(newData)
    setResumeInfo({
      ...resumeInfo,
      education: newData
    })
  }

  // 删除教育经历
  const removeEducation = (index) => {
    const newData = [...formData]
    newData.splice(index, 1)
    setFormData(newData)
    setResumeInfo({
      ...resumeInfo,
      education: newData
    })
  }

  // 删除奖项
  const removeAward = (eduIndex, awardIndex) => {
    const newData = [...formData]
    if (!newData[eduIndex].awards) return
    newData[eduIndex].awards.splice(awardIndex, 1)
    setFormData(newData)
    setResumeInfo({
      ...resumeInfo,
      education: newData
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // eslint-disable-next-line no-unused-vars
    const cleanFormData = formData.map(({ id, awards, ...rest }) => {
      // 去掉 awards 中每个对象的 id
      const cleanedAwards = Array.isArray(awards)
        // eslint-disable-next-line no-unused-vars
        ? awards.map(({ id, ...awardRest }) => awardRest)
        : []

      return {
        ...rest,
        awards: cleanedAwards
      }
    })
    setLoading(true)
    try {
      const payload = {
        data: {
          education: cleanFormData,
        }
      }
      const res = await GlobalApi.updateResumeDetail(params?.resumeId, payload, 'education.awards')

      if (res?.data?.data) {
        setResumeInfo(res.data.data)
      }
      toast.success(t('update_success'))
    } catch (error) {
      console.error(error)
      toast.error(t('update_failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-5 shadow-lg border-t-black border-t-5">
      <h2 className="font-bold text-lg">{t('education_background')}</h2>
      <p>{t('education_description')}</p>

      <form onSubmit={handleSubmit}>
        {formData.map((edu, eduIndex) => (
          <div key={eduIndex} className="mb-6 border p-4 rounded">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">
                {t('education_item', { num: eduIndex + 1 })}
              </h3>
              <Button variant="destructive" size="sm" onClick={() => removeEducation(eduIndex)}>
                {t('delete')}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm">{t('school')}</label>
                <Input
                  name="universityName"
                  value={edu.universityName}
                  onChange={(e) => handleEducationChange(eduIndex, 'universityName', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm">{t('degree')}</label>
                <Input
                  name="degree"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(eduIndex, 'degree', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm">{t('major')}</label>
                <Input
                  name="major"
                  value={edu.major}
                  onChange={(e) => handleEducationChange(eduIndex, 'major', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm">{t('start_date')}</label>
                <Input
                  type="date"
                  name="startDate"
                  value={edu.startDate}
                  onChange={(e) => handleEducationChange(eduIndex, 'startDate', e.target.value)}
                  placeholder="YYYY.MM"
                  required
                />
              </div>
              <div>
                <label className="text-sm">{t('end_date')}</label>
                <Input
                  type="date"
                  name="endDate"
                  value={edu.endDate}
                  onChange={(e) => handleEducationChange(eduIndex, 'endDate', e.target.value)}
                  placeholder="YYYY.MM"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-medium mb-2">{t('awards')}</h4>
              {edu.awards && edu.awards.length > 0 ? (
                edu.awards.map((award, awardIndex) => (
                  <div key={awardIndex} className="grid grid-cols-4 gap-3 items-center mb-2">
                    <Input
                      placeholder={t('award_name')}
                      value={award.title}
                      onChange={(e) => handleAwardChange(eduIndex, awardIndex, 'title', e.target.value)}
                      required
                    />
                    <Input
                      placeholder={t('award_level')}
                      value={award.level}
                      onChange={(e) => handleAwardChange(eduIndex, awardIndex, 'level', e.target.value)}
                      required
                    />
                    <Input
                      placeholder={t('award_prize')}
                      value={award.prize}
                      onChange={(e) => handleAwardChange(eduIndex, awardIndex, 'prize', e.target.value)}
                      required
                    />
                    <Button variant="destructive" size="sm" onClick={() => removeAward(eduIndex, awardIndex)}>
                      {t('delete')}
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">{t('no_awards')}</p>
              )}
              <Button variant="outline" size="sm" className="mt-2" onClick={() => addAward(eduIndex)}>
                {t('add_award')}
              </Button>
            </div>
          </div>
        ))}

        <Button variant="outline" type="button" onClick={addEducation} className="my-4">
          {t('add_education')}
        </Button>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : t('save')}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default BasicInfoForm
