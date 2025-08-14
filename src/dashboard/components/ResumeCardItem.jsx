import { Loader2, MoreVertical } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogFooter
} from '@/components/ui/alert-dialog'
import GlobalApi from '../../../service/GlobalApi.js'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import imageUrl from '@/assets/example.png'
function ResumeCardItem({ resume, refreshPage }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [openAlert, setOpenAlert] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const onDelete = async () => {
    setLoading(true)
    try {
      await GlobalApi.deleteResumeById(resume.documentId)
      setOpenAlert(false)
      toast(t('deleteResumeSuccess'))
      refreshPage()
    } catch (error) {
      console.error(t('deleteResumeFail'), error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* 点击卡片跳转 */}
      <div
        onClick={() => navigate(`/dashboard/resume/${resume.documentId}/edit`)}
        className="p-0 h-[280px]  rounded-lg items-center justify-center flex border hover:scale-105 hover:shadow-md transition-all overflow-hidden"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Resume"
            className="w-full h-full object-contain"
          />
        ) : null}
      </div>
      <div className='flex items-center justify-center'>
        <h2 className="text-center mt-2">{resume.title}</h2>
        <div className='mt-2 flex'>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical className="h-4 w-4 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}>
                {t('view')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/dashboard/resume/${resume.documentId}/edit`)}>
                {t('edit')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}>
                {t('download')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenAlert(true)}>
                {t('delete')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('deleteConfirmTitle')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('deleteConfirmDesc')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAlert(false)}>
              {t('cancel')}
            </AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : t('delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default ResumeCardItem
