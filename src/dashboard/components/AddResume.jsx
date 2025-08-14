import { Ghost, Loader2, PlusSquare } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { v4 as uuidv4 } from 'uuid'
import GlobalApi from '../../../service/GlobalApi.js'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function AddResume() {
  const { t } = useTranslation()
  const [openDialog,setOpenDialog] = useState(false)
  const [resumeTitle,setResumeTitle] = useState()
  const [loading,setLoading] = useState(false)
  const { user } = useUser()
  const navigate = useNavigate()

  const onCreat = useCallback(async () => {
    if (!resumeTitle.trim()) return
    
    const uuid = uuidv4()
    const payload = {
      data: {
        resumeId: uuid,
        title: resumeTitle.trim(),
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName
      }
    }

    setLoading(true)
    try {
      const res = await GlobalApi.createNewResume(payload)
      if (res?.data?.data?.documentId) {
        navigate(`/dashboard/resume/${res.data.data.documentId}/edit`)
      }
    } catch (error) {
      console.error(t('createResumeFail'), error)
    } finally {
      setLoading(false)
    }
  }, [resumeTitle, user, navigate, t])

  return (
    <div>
      <div 
        onClick={() => setOpenDialog(true)} 
        className='p-14 py-24 flex justify-center items-center bg-secondary rounded-lg border-4 border-dashed h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer'
      >
        <PlusSquare/>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader className="items-start text-left">
            <DialogTitle>{t('createNewResume')}</DialogTitle>
            <DialogDescription>
              {t('addTitleToResume')}
            </DialogDescription>
          </DialogHeader>
          <Input 
            onChange={(e) => setResumeTitle(e.target.value)} 
            placeholder={t('resumeTitlePlaceholder')} 
          />
          <div className='flex justify-end gap-5'>
            <Button onClick={() => setOpenDialog(false)} variant={Ghost}>
              {t('cancel')}
            </Button>
            <Button disabled={!resumeTitle || loading} onClick={onCreat}>
              {loading ? <Loader2 className='animate-spin'/> : t('create')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddResume
