import React, { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {  MoveLeft, RefreshCw } from 'lucide-react'
import { Brain, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AIChatSession } from '../../../../service/AIModal.js' 
function AiSuggest({prompt,setAiSuggest}) {
  const [suggests,setSuggest] = useState([])
  const [loading,setLoading] = useState(false)
  const generateSuggest = async () => {
      setLoading(true)
      try {
        const { text } = await AIChatSession(prompt)
      
        const suggestionsArray = text
          .split('-')
          .map(line => line.trim())
          .filter(line => line.length > 0)

        setSuggest(suggestionsArray)
        
        console.log('AI建议:', suggestionsArray)
      } catch (err) {
        console.error('AI生成失败', err)
      } finally {
        setLoading(false)
      }
    }
  return (
    <div>
    <Popover>
      <PopoverTrigger asChild >
        <Button size="sm" variant='outline' onClick={generateSuggest} ><Brain />借助ai完善</Button>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        className="
          relative
          w-xl
          max-h-72
          overflow-y-auto
          p-6
          flex
          flex-col
          gap-3
          bg-white
          text-gray-900
          shadow-xl
          rounded-lg
        "
      >
      {
        !loading && <Button
          onClick={generateSuggest}
          aria-label="刷新建议"
          variant="ghost"
          className="
            w-6 
            h-6
            absolute
            top-2
            right-2
            p-1
            rounded-full
            cursor-pointer
            z-10
          "
        >
        <RefreshCw className="w-4 h-4 text-gray-600" />
      </Button>
      }

        {loading ? (
          <div className="flex justify-center items-center h-full w-full">
            <Loader2 className="animate-spin w-8 h-8 text-indigo-600" />
          </div>
        ) : (
          suggests.length > 0 ? (
            suggests.map((suggest, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setAiSuggest(suggest)}
              className="
                group                 /* 关键，给button加group */
                text-left
                text-base
                font-medium
                leading-7
                mr-4
                py-3
                rounded-md
                hover:bg-[#edf4ff]
                focus:ring-2
                transition
                duration-200
                cursor-pointer
                select-none
                whitespace-normal
                break-words
              "
            >
              <div className="flex items-center">
                <MoveLeft
                  className="
                    w-6 h-6
                    text-[#1688fe]
                    rounded-full
                    p-1
                    mr-3
                    shrink-0
                    cursor-pointer
                    transition
                    duration-300
                    ease-in-out
                  bg-[#edf4ff]
                  group-hover:text-white
                  group-hover:bg-[#1688fe]   /* 父元素hover时触发背景变化 */
                  "
                />
                {suggest}
              </div>
            </button>
            ))
          ) : (
            <div className="text-gray-400 text-center italic text-base">暂无建议，点击按钮生成</div>
          )
        )}
      </PopoverContent>
    </Popover>
    </div>
  )
}

export default AiSuggest