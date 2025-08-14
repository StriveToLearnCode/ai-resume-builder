import { Button } from '@/components/ui/button'
import React from 'react'
import resumeImg from '../homeAssets/Frame 28.png'
import { Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function MainPage() {
  const { t } = useTranslation()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-18 pb-6 grid grid-cols-1 md:grid-cols-2 gap-12 relative">
      {/* 左侧文案 */}
      <div className="max-w-xl relative text-center lg:text-left mx-auto lg:mx-0">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-6 backdrop-blur-sm max-w-max shadow-sm">
          <Sparkles className="w-5 h-5" />
          <span className="text-sm font-semibold whitespace-nowrap">{t('free_resume_creation')}</span>
        </div>

        <h1 className="text-5xl font-extrabold mb-8 leading-snug">
          {t('ai_resume_title')}
        </h1>
        <p className="text-gray-700 mb-10 text-lg sm:text-xl max-w-md mx-auto lg:mx-0">
          {t('ai_resume_desc')}
        </p>

        <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-6 mb-10">
          <Link to='/dashboard' >
            <Button
              size="lg"
              className="bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700 transition min-w-[140px] flex items-center justify-center gap-2"
            >
              {t('start_now')}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Button>
          </Link>
          <Link to="/my-template">
            <Button size="lg" variant="outline" className="min-w-[140px]">
              {t('browse_templates')}
            </Button>
          </Link>
          
        </div>
      </div>

      {/* 右侧内容 */}
      <div className="relative mx-auto flex items-center justify-center">
        <img
          alt="Resume"
          src={resumeImg}
          className="object-cover object-center rounded-xl w-full h-full"
        />
      </div>
    </div>
  )
}

export default MainPage
