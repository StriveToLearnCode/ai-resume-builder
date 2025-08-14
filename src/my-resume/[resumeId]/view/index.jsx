import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import ResumePreview from '@/dashboard/resume/components/ResumePreview';
import { snapdom } from '@zumer/snapdom';
import jsPDF from 'jspdf';
import { useContext, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

function ViewResume() {
  const { t } = useTranslation()
  const resumeId = useParams().resumeId;
  const { resumeInfo } = useContext(ResumeInfoContext)
  const resumeRef = useRef(null)


  // 智能一页
  const pxToPt = (px) => (px * 72) / 96;

  const handleDownload = async () => {
    if (!resumeRef.current) return;
    const element = resumeRef.current;

    const result = await snapdom(element, {
      margin: 0,
      printBackground: true,
    });

    const img = await result.toPng();
    await snapdom.download(img)
    const imgWidthPx = img.width;
    const imgHeightPx = img.height;

    const imgWidthPt = pxToPt(imgWidthPx);
    const imgHeightPt = pxToPt(imgHeightPx);

    const pdf = new jsPDF({
      unit: 'pt',
      format: [imgWidthPt, imgHeightPt],
    });

    pdf.addImage(img, 'PNG', 0, 0, imgWidthPt, imgHeightPt);

    pdf.save(`${resumeInfo.title}.pdf`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: t('my_resume'),
        text: t('check_out_my_resume'),
        url: `${import.meta.env.VITE_BASE_URL}/my-resume/${resumeId}/view`,
      })
        .then(() => console.log(t('share_success')))
        .catch((error) => console.error(t('share_fail'), error));
    } else {
      alert(t('share_not_supported'));
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto mt-10 px-4">
        <h2 className="text-center text-3xl font-semibold mb-4 text-gray-900">
          {t('congratulations_ai_resume')}
        </h2>
        <p className="text-center text-gray-500 mb-8">
          {t('ready_to_download_and_share')}
        </p>
        <div className="flex justify-center gap-8 mb-10">
          <Button onClick={handleDownload}>{t('download')}</Button>
          <Button onClick={handleShare}>{t('share')}</Button>
        </div>
      </div>

      <div
        className="max-w-4xl mx-auto p-6 shadow-lg rounded-md border border-gray-200"
        style={{ minHeight: '80vh' }}
      >
        <div ref={resumeRef}><ResumePreview /></div>
      </div>
    </>
  )
}

export default ViewResume
