import React, { useContext, useEffect } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { LayoutGrid } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from '../../../../service/GlobalApi.js'
import { toast } from 'sonner'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function ThemeColor() {
  const { t } = useTranslation()
  const color = [
    "#F7A278", "#FFD8BE", "#A3D2CA", "#5EAAA8", "#F05945",
    "#FFB6B9", "#FAE3D9", "#BBDED6", "#8AC6D1", "#9D84B7",
    "#F6AE2D", "#F26419", "#86BBD8", "#33658A", "#758E4F",
    "#A3BCB6", "#E6B655", "#D17B88", "#8E7DBE", "#4E8D7C"
  ]
  const { resumeId } = useParams()
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

  const [selectedColor, setSelectedColor] = React.useState()

  useEffect(() => {
    if (resumeInfo?.themeColor) {
      setSelectedColor(resumeInfo.themeColor)
    }
  }, [resumeInfo?.themeColor])

  const handleChangeColor = async (selectedColor) => {
    setSelectedColor(selectedColor)
    setResumeInfo({
      ...resumeInfo,
      themeColor: selectedColor,
    })

    try {
      await GlobalApi.updateResumeDetail(resumeId, {
        data: { themeColor: selectedColor }
      })
      toast.success(t('theme_color_update_success'))
    } catch (error) {
      console.error(error)
      toast.error(t('theme_color_update_fail'))
    }
  }

  return (
    <Popover>
      {/* 关键是加上 asChild，让 PopoverTrigger 直接用 Button 渲染的元素作为触发器，而不是自己渲染一个 button */}
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline" className="flex gap-2">
          <LayoutGrid />
          {t('theme')}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid grid-cols-5 gap-2 p-2">
          {color.map((item, index) => (
            <div
              key={index}
              onClick={() => handleChangeColor(item)}
              className={`
                w-8 h-8 rounded-full cursor-pointer hover:scale-110 transition-all ${
                  selectedColor === item ? 'border border-black scale-110' : ''
                }
              `}
              style={{ backgroundColor: item }}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ThemeColor
