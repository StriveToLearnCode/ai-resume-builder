import { FontContext } from '@/context/FontContext'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'

function SelfEvaluation({ resumeInfo,order }) {
  const { t } = useTranslation()
  const {  lineHeight,baseSize, subTitleSize,margin,fontClass } = useContext(FontContext)
  return (
    <div className={`${fontClass} space-y-2 mt-2`}
    style={{
        lineHeight: lineHeight,
        padding: margin,
      }}>
      <h2
        className="font-bold border-b"
        style={{ color: resumeInfo?.themeColor, borderColor: resumeInfo?.themeColor,fontSize:subTitleSize }}
      >
        {order}. {t('self_evaluation')}
      </h2>
      <p style={{
        fontSize:baseSize
      }} className="space-y-1">{resumeInfo?.selfEvaluation}</p>
    </div>
  )
}

export default SelfEvaluation
