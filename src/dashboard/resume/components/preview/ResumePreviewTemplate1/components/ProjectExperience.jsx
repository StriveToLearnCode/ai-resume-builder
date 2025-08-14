import { FontContext } from '@/context/FontContext'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'

function ProjectExperience({ resumeInfo, order }) {
  const { t } = useTranslation()
  const { lineHeight, baseSize, subTitleSize, margin, fontClass } = useContext(FontContext)

  return (
    <div
      className={`${fontClass} space-y-2 mt-2`}
      style={{ lineHeight, padding: margin }}
    >
      {/* 标题 */}
      <h2
        className="font-bold border-b"
        style={{ color: resumeInfo?.themeColor, borderColor: resumeInfo?.themeColor, fontSize: subTitleSize }}
      >
        {order}. {t('project_experience')}
      </h2>

      {/* 项目列表 */}
      {resumeInfo?.projectExperience?.map((project, index) => (
        <div key={index} style={{ fontSize: baseSize }}>
          {/* 项目标题 */}
          <div className="font-semibold">
            {`4.${index + 1}. ${project.title}`}
          </div>

          {/* 项目链接单独显示 */}
          {project?.link && project?.link !== '' && (
            <div
              className="mt-1 "
              style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}
            >
              项目链接: <a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a>
            </div>
          )}

          {/* 项目详情 */}
          <div
            className="mt-1 space-y-1 tiptap prose whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{ __html: project?.details || '' }}
          />
        </div>
      ))}
    </div>
  )
}

export default ProjectExperience
