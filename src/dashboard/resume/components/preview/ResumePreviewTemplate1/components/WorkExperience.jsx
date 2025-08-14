import { FontContext } from '@/context/FontContext'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'

function WorkExperience({ resumeInfo,order }) {
  const { t } = useTranslation()
  const {  lineHeight,baseSize, subTitleSize,margin,fontClass } = useContext(FontContext)
  return (
    <div className={`${fontClass} space-y-2 mt-2`}
    style={{
        lineHeight: lineHeight,
        padding: margin,
      }}>
      {/* 标题 */}
      <h2
        className=" font-bold border-b"
        style={{ color: resumeInfo?.themeColor, borderColor: resumeInfo?.themeColor,fontSize:subTitleSize }}
      >
        {order}. {t('work_experience')}
      </h2>

      {/* 工作列表 */}
      {resumeInfo?.experience &&
        resumeInfo?.experience.map((job, index) => (
          <div key={index} style={{fontSize:baseSize}}>
            {/* 职位与公司 */}
            <div className="flex justify-between font-semibold" >
              <span>{`3.${index + 1}. ${job?.companyName} - ${job?.title}`}</span>
              <span className=" text-gray-600">
                {job?.startDate}-
                {job?.endDate === '' ? t('present') : job?.endDate}
              </span>
            </div>

            {/* 详情 */}
            <div
                className=" mt-1 space-y-1 tiptap prose"
                dangerouslySetInnerHTML={{ __html: job?.details || '' }}
              />
          </div>
        ))}
    </div>
  )
}

export default WorkExperience
