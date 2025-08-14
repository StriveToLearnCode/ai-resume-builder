import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import ResumePreview from '@/dashboard/resume/components/ResumePreview';
import { snapdom } from '@zumer/snapdom';
import jsPDF from 'jspdf';
import { useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontProvider } from '@/context/FontContext';

function ViewResume() {
  const { t } = useTranslation()
  const resumeId = useParams().resumeId;
  const { resumeInfo } = useContext(ResumeInfoContext)
  const resumeRef = useRef(null)

  // 等待所有图片加载完成
  const waitImagesLoaded = async (element) => {
    const imgs = Array.from(element.querySelectorAll('img'));
    await Promise.all(imgs.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = img.onerror = () => resolve();
      });
    }));
  };

  const handleDownload = async () => {
    if (!resumeRef.current) return;
    const element = resumeRef.current;

    // 等待图片加载完成
    await waitImagesLoaded(element);

    try {
      // 临时恢复缩放，避免浏览器放大导致 Canvas 过大
      const originalTransform = document.body.style.transform;
      const originalTransformOrigin = document.body.style.transformOrigin;
      document.body.style.transform = 'scale(1)';
      document.body.style.transformOrigin = 'top left';

      const { width, height } = element.getBoundingClientRect();

      // snapdom 截图，scale:1 避免过大 Canvas
      const result = await snapdom(element, {
        margin: 0,
        printBackground: true,
        scale: 1, // 固定比例，避免 EncodingError
      });

      const imgDataUrl = await result.toPng();

      // 恢复页面缩放
      document.body.style.transform = originalTransform;
      document.body.style.transformOrigin = originalTransformOrigin;

      // PDF 页面按 CSS 尺寸创建
      const pdf = new jsPDF({
        unit: 'px',
        format: [width, height],
      });

      pdf.addImage(
        imgDataUrl,
        'PNG',
        0,
        0,
        width,
        height
      );

      pdf.save(`${resumeInfo.title || 'resume'}.pdf`);
    } catch (err) {
      console.error('PDF generation error:', err);
    }
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
      <FontProvider resumeId={resumeId} resumeInfo={resumeInfo}>
        <div className="w-[896px] mx-auto shadow-lg rounded-md border border-gray-200">
          <div ref={resumeRef}><ResumePreview /></div>
        </div>
      </FontProvider>
    </>
  )
}

export default ViewResume; 