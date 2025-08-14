import { FontContext } from '@/context/FontContext'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'

function Skills({ resumeInfo,order }) {
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
        {order}. {t('professional_skills')}
      </h2>
      {/* 列表 */}
      <ul style={{
        fontSize:baseSize
      }} className="list-disc pl-6 space-y-1">
        {resumeInfo?.skills &&
          resumeInfo?.skills.map((skill, index) => <li key={index}>{skill.text}</li>)}
      </ul>
    </div>
  )
}

export default Skills
