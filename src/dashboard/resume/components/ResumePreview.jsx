import React, { useContext, forwardRef, useRef } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreviewTemplate1 from './preview/ResumePreviewTemplate1/ResumePreviewTemplate1'
// 拖拽功能
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import GlobalApi from '../../../../service/GlobalApi.js';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const ResumePreview = forwardRef(({ fixedWidth = false }, ref) => {
  const { resumeInfo,setResumeInfo } = useContext(ResumeInfoContext)
  // Sensors：是拖拽触发的“感应器”，这里用 PointerSensor，表示用鼠标或触摸来拖拽。
  const sensors = useSensors(useSensor(PointerSensor));
  const modules = Array.isArray(resumeInfo?.modules) && resumeInfo.modules.length > 0 
  ? resumeInfo.modules 
  : [
      { order: '1', value: 'personalInfo' },
      { order: '2', value: 'basicInfo' },
      { order: '3', value: 'skills' },
      { order: '4', value: 'experience' },
      { order: '5', value: 'projectExperience' },
      { order: '6', value: 'selfEvaluation' },
    ];
  const template = resumeInfo?.template || 'template1'
  const resumeId = useParams().resumeId
  const debounceTimerRef = useRef(null)
  async function sendUpdateRequest(newModules) {
    // 只发送需要的字段，剔除 id
    const cleanedModules = newModules.map(({ order, value }) => ({ order, value }))
    try {
      await GlobalApi.updateResumeDetail(resumeId, {
      data: { modules: cleanedModules }
      })
      toast('布局更新成功')
    } catch (error) {
      console.error(error)
      toast.error('布局更新失败')
    }
  }

  async function handleDragEnd(event) {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = modules.findIndex(m => m.order === active.id)
      const newIndex = modules.findIndex(m => m.order === over.id)
      let newModules = arrayMove(modules, oldIndex, newIndex)

      // 重新给 order 赋值，从1开始递增
      newModules = newModules.map((mod, index) => ({
        ...mod,
        order: (index + 1).toString(),  
      }))

      setResumeInfo(prev => ({ ...prev, modules: newModules }))
      if(debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
      debounceTimerRef.current = setTimeout(() => {
        sendUpdateRequest(newModules)
      },300)
      
    }
  }
  return (
    // 拖拽上下文
    <DndContext  
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      >
        {/* 拖拽排序上下文 */}
        <SortableContext
          items={modules.map(m => m.order)}
          strategy={verticalListSortingStrategy}
        >
          <div ref={ref} className={`shadow-lg py-10 px-14 min-h-[1123px] whitespace-pre-wrap break-words`}>
            {template === 'template1' && <ResumePreviewTemplate1 modules={modules} resumeInfo={resumeInfo} />}
            {template === 'template2' && <ResumePreviewTemplate2 resumeInfo={resumeInfo} modules={modules}/>}
          </div>
        </SortableContext>
    </DndContext>
  )
})

export default ResumePreview
