import { FontContext } from '@/context/FontContext'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'

function BasicInfo({ resumeInfo, order }) {
  const { t } = useTranslation()
  const { lineHeight, baseSize, subTitleSize, margin, fontClass } = useContext(FontContext)

  // 格式化日期 YYYY-MM -> YYYY.MM
  const formatMonth = (value) => {
    if (!value) return ''
    return value.replace('-', '.')
  }

  return (
    <div
      className={`space-y-2 mt-2 ${fontClass} whitespace-pre-wrap break-words`}
      style={{
        lineHeight: lineHeight,
        padding: margin,
      }}
    >
      {/* 标题 */}
      <h2
        className="font-bold border-b"
        style={{
          color: resumeInfo?.themeColor,
          borderColor: resumeInfo?.themeColor,
          fontSize: subTitleSize,
        }}
      >
        {order}. {t('basic_info')}
      </h2>

      {/* 学历 */}
      {resumeInfo?.education &&
        resumeInfo.education.map((item, index) => (
          <div style={{ fontSize: baseSize }} className="font-semibold" key={item.id || index}>
            {`1.${index + 1} - ${item.universityName} - ${item.degree} - ${item.major}`}
            <span className="ml-2">
              ({formatMonth(item.startDate)} - {formatMonth(item.endDate)})
            </span>
            {/* 奖项 */}
            <ul className="list-disc px-8">
              {item?.awards &&
                item.awards.map((award, idx) => (
                  <li className="p-1" key={idx}>
                    {t('awarded')}: {award.title}
                    <span className="text-red-500 font-bold">{award.level}</span>
                    {award.prize}
                  </li>
                ))}
            </ul>
          </div>
        ))}

      {/* Github & 博客 */}
      <p style={{ fontSize: baseSize }} className="whitespace-pre-wrap break-word">
        {resumeInfo?.github && (
          <span className="mr-1">
            <span className="font-bold">{t('github')}：</span>
            <a
              href={resumeInfo?.github}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {resumeInfo?.github.replace('https://github.com/', '')}
            </a>
          </span>
        )}
        {resumeInfo?.github && resumeInfo?.blog && ' | '}
        {resumeInfo?.blog && (
          <span className="ml-1">
            <span className="font-bold">{t('personal_blog')}：</span>
            <a
              href={resumeInfo?.blog}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {resumeInfo?.blog.replace('https://', '')}
            </a>
          </span>
        )}
      </p>
    </div>
  )
}

export default BasicInfo
