import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Check, FileUser, Languages, LayoutPanelLeft, Settings, UserStar, Menu } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import ThemeToggle from './ThemeToggle'

const languages = [
  { label: '中文', value: 'zh' },
  { label: 'English', value: 'en' },
]

function Header() {
  const { isSignedIn } = useUser()
  const { t, i18n } = useTranslation()
  const [selectedLang, setSelectedLang] = useState(() => {
    if (i18n.language === 'zh') return '中文'
    if (i18n.language === 'en') return 'English'
    return '中文'
  })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const changeLanguage = (e, lang) => {
    e.preventDefault()
    if (lang.label !== selectedLang) {
      setSelectedLang(lang.label)
      i18n.changeLanguage(lang.value)
      setMobileMenuOpen(false)
    }
  }

  return (
    <>
      {/* 占位撑开头部高度 */}
      <div className="h-14 md:h-16" />

      <header
        id="no-print"
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-11 py-3 transition-colors duration-200 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        {/* 左侧LOGO */}
        <Link to="/">
          <div className="font-bold font-serif cursor-pointer select-none">Resume Builder</div>
        </Link>

        {/* 中间导航：md及以上显示，lg及以上显示文字 */}
        <nav className="hidden md:flex gap-10 text-sm items-center" aria-label={t('主导航')}>
          <Popover>
            <PopoverTrigger
              className="flex items-center gap-2 cursor-pointer select-none"
              aria-haspopup="true"
              aria-expanded="false"
              aria-controls="lang-popover"
            >
              <Languages className="w-4 h-4" />
              <span className="hidden lg:inline">{selectedLang}</span>
            </PopoverTrigger>
            <PopoverContent id="lang-popover" className="w-30" role="menu">
              {languages.map((lang) => (
                <a
                  key={lang.value}
                  href={`/${lang.value}`}
                  role="menuitem"
                  tabIndex={0}
                  className={`w-full flex items-center justify-between px-2 py-1 rounded text-sm select-none cursor-pointer hover:bg-gray-100 focus:bg-gray-200 focus:outline-none ${
                    lang.label === selectedLang ? 'font-semibold' : ''
                  }`}
                  onClick={(e) => changeLanguage(e, lang)}
                >
                  <span className="flex items-center gap-2">{lang.label}</span>
                  {lang.label === selectedLang && <Check />}
                </a>
              ))}
            </PopoverContent>
          </Popover>
          
          <Link to='/my-template'>
            <div
              className="flex items-center gap-2 cursor-pointer select-none hover:text-primary focus:text-primary focus:outline-none"
              tabIndex={0}
              role="link"
              aria-label={t('模板')}
            >
              <LayoutPanelLeft className="w-4 h-4" />
              <span className="hidden lg:inline">{t('模板')}</span>
            </div>
          </Link>


          {!isSignedIn ? (
            <div
              className="flex items-center gap-2 cursor-pointer select-none hover:text-primary focus:text-primary focus:outline-none"
              tabIndex={0}
              role="link"
              aria-label={t('用户评价')}
            >
              <UserStar className="w-4 h-4" />
              <span className="hidden lg:inline">{t('用户评价')}</span>
            </div>
          ) : (
            <>
              <Link to="/dashboard">
                <div
                  className="flex items-center gap-2 cursor-pointer select-none hover:text-primary focus:text-primary focus:outline-none"
                  tabIndex={0}
                  role="link"
                  aria-label={t('我的简历')}
                >
                  <FileUser className="w-4 h-4" />
                  <span className="hidden lg:inline">{t('我的简历')}</span>
                </div>
              </Link>
              <div
                className="flex items-center gap-2 cursor-pointer select-none hover:text-primary focus:text-primary focus:outline-none"
                tabIndex={0}
                role="link"
                aria-label={t('设置')}
              >
                <Settings className="w-4 h-4" />
                <span className="hidden lg:inline">{t('设置')}</span>
              </div>
            </>
          )}
        </nav>

        {/* 小屏幕汉堡菜单按钮 */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={t('打开菜单')}
          aria-expanded={mobileMenuOpen}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* 移动菜单弹窗 */}
        {mobileMenuOpen && (
          <div
            className=" fixed top-14 left-0 right-0 bg-white shadow-md border-t border-gray-200 p-4 flex flex-col gap-4 z-40 md:hidden"
            role="menu"
            aria-label={t('移动菜单')}
          >
            <Popover>
              <PopoverTrigger
                className="flex items-center gap-2 cursor-pointer select-none"
                aria-haspopup="true"
                aria-expanded="false"
                aria-controls="lang-popover-mobile"
              >
                <Languages className="w-4 h-4" /> {selectedLang}
              </PopoverTrigger>
              <PopoverContent id="lang-popover-mobile" className="w-full" role="menu">
                {languages.map((lang) => (
                  <a
                    key={lang.value}
                    href={`/${lang.value}`}
                    role="menuitem"
                    tabIndex={0}
                    className={`w-full flex items-center justify-between px-2 py-1 rounded text-sm select-none cursor-pointer hover:bg-gray-100 focus:bg-gray-200 focus:outline-none ${
                      lang.label === selectedLang ? 'font-semibold' : ''
                    }`}
                    onClick={(e) => changeLanguage(e, lang)}
                  >
                    <span className="flex items-center gap-2">{lang.label}</span>
                    {lang.label === selectedLang && <Check />}
                  </a>
                ))}
              </PopoverContent>
            </Popover>

            <Link to="/templates">
              <div
                className="flex items-center gap-2 cursor-pointer select-none hover:text-primary focus:text-primary focus:outline-none"
                tabIndex={0}
                role="link"
                aria-label={t('模板')}
                onClick={() => setMobileMenuOpen(false)}
              >
                <LayoutPanelLeft className="w-4 h-4" /> {t('模板')}
              </div>
            </Link>

            {!isSignedIn ? (
              <Link to="/reviews">
                <div
                  className="flex items-center gap-2 cursor-pointer select-none hover:text-primary focus:text-primary focus:outline-none"
                  tabIndex={0}
                  role="link"
                  aria-label={t('用户评价')}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <UserStar className="w-4 h-4" /> {t('用户评价')}
                </div>
              </Link>
            ) : (
              <>
                <Link to="/dashboard">
                  <div
                    className="flex items-center gap-2 cursor-pointer select-none hover:text-primary focus:text-primary focus:outline-none"
                    tabIndex={0}
                    role="link"
                    aria-label={t('我的简历')}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FileUser className="w-4 h-4" /> {t('我的简历')}
                  </div>
                </Link>
                <Link to="/settings">
                  <div
                    className="flex items-center gap-2 cursor-pointer select-none hover:text-primary focus:text-primary focus:outline-none"
                    tabIndex={0}
                    role="link"
                    aria-label={t('设置')}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4" /> {t('设置')}
                  </div>
                </Link>
              </>
            )}
          </div>
        )}

        {/* 右侧登录/用户按钮 */}
        <div className='hidden md:flex items-center gap-5'>
          <ThemeToggle />
          {isSignedIn ? (
            <UserButton />
          ) : (
            <Link to="/auth/sign-in" className="select-none">
              <Button size="sm" variant="outline" >{t('登录')}</Button>
            </Link>
          )}
        </div>
      </header>
    </>
  )
}

export default Header
