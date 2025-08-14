import { FontContext } from '@/context/FontContext'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'

function ProjectExperience({ resumeInfo,order }) {
  const { t } = useTranslation()
  const {  lineHeight,baseSize, subTitleSize,margin,fontClass } = useContext(FontContext)
  return (
    <div className={`${fontClass} space-y-2 mt-2`}
      style={{
          lineHeight: lineHeight,
          padding: margin,
        }}>
      <h2
        className=" font-bold border-b"
        style={{ color: resumeInfo?.themeColor, borderColor: resumeInfo?.themeColor,fontSize:subTitleSize }}
      >
        {order}. {t('project_experience')}
      </h2>

      {resumeInfo?.projectExperience?.map((project, index) => (
        <div style={{
            fontSize:baseSize
          }} key={index}>
          {/* 项目标题 + 链接 */}
          <div className="flex justify-between font-semibold ">
            {project?.link && project?.link !== '' ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={project?.link ? 'hover:underline' : ''}
              >
                {`4.${index + 1}. ${project.title}`}
              </a>
            ) : (
              <span>{`4.${index + 1}. ${project.title}`}</span>
            )}
          </div>

          {/* 项目详情 */}
          <div
            className="mt-1 space-y-1 tiptap prose"
            dangerouslySetInnerHTML={{ __html: project?.details || '' }}
          />
        </div>
      ))}
    </div>
  )
}

export default ProjectExperience
