import React from "react";
import { Bot, Columns3Cog, StickyNoteIcon } from "lucide-react";
import Arrow1 from '../homeAssets/Arrow 1.svg'
import Arrow2 from '../homeAssets/Arrow 2.svg'
import polish from '../homeAssets/polish.svg'
import { useTranslation } from 'react-i18next'

const FeatureList = () => {
  const { t } = useTranslation()

  return (
    <section className="relative py-16 px-6 max-w-6xl mx-auto ">
      <h2 className="text-3xl font-bold text-center  mb-16">
        {t('why_choose_us')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex">
          <div className="relative">
            <Bot className="absolute top-[-20px] w-5 h-5" />
            <h3 className="text-lg font-bold">{t('smart_identify')}</h3>
            <p className="text-gray-600 mt-2">
              {t('smart_identify_desc')}
            </p>
          </div>
        </div>
        <div>
          <img className="w-66 hidden md:block absolute" src={Arrow1} />
        </div>
        <div className="ml-[-30px]">
          <img className="w-full" src={polish} alt="" />
        </div>
        <div className="relative">
          <StickyNoteIcon className="absolute top-[-20px] w-5 h-5" />
          <h3 className="text-lg font-bold">{t('one_page')}</h3>
          <p className="text-gray-600 mt-2">
            {t('one_page_desc')}
          </p>
        </div>

        <div className="relative">
          <Columns3Cog className="absolute top-[-20px] w-5 h-5" />
          <h3 className="text-lg font-bold">{t('easy_customize')}</h3>
          <p className="text-gray-600 mt-2">
            {t('easy_customize_desc')}
          </p>
        </div>
        <div>
          <img src={Arrow2} className="w-66 hidden md:block absolute top-140" />
        </div>
      </div>
    </section>
  );
};

export default FeatureList;
