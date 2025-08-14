import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { FontContext } from '@/context/FontContext'

function PersonalInfo({ resumeInfo }) {
  const { t } = useTranslation()
  const { fontClass, baseSize, lineHeight, margin, titleSize } = useContext(FontContext)

  return (
    <div
      className={`${fontClass} text-center`}
      style={{
        lineHeight: lineHeight,
        padding: margin,
      }}
    >
      <h2 className="font-bold" style={{ fontSize: titleSize }}>
        {resumeInfo?.name}
      </h2>
      <div style={{ fontSize: baseSize }} className="my-2">
        {resumeInfo?.position}
      </div>

      {/* 联系方式 */}
      <div style={{ fontSize: baseSize }} className="flex justify-center gap-4 mt-1 text-sm flex-wrap">
        <div className="whitespace-nowrap">
          {t('phone')}:
          <a href={`tel:${resumeInfo?.phone}`} className="ml-1 text-[#e3306c]">
            {resumeInfo?.phone}
          </a>
        </div>
        <div className="whitespace-nowrap">
          {t('email')}:
          <a href={`mailto:${resumeInfo?.email}`} className="ml-1 text-[#e3306c]">
            {resumeInfo?.email}
          </a>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfo
