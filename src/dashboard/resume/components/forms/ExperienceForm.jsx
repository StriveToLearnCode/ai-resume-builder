import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState, useEffect } from "react";
import GlobalApi from "../../../../../service/GlobalApi.js";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import RichTextEditor from "../RichTextEditor.jsx";
import { AIChatSession } from "../../../../../service/AIModal.js";



function ExperienceForm() {
  const { t } = useTranslation();
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(false);
  const Prompt =`你是一名专业简历写作助手。请根据以下简历信息 resumeInfo，生成大约5-6条工作经历描述（Experience）。

  要求：
  - 每条经历控制在40到60字，句子完整、简洁且有力；
  - 突出岗位职责、实际成果、量化指标，符合职业简历风格；
  - 使用动词开头，如“负责、主导、优化、提升”等；
  - 多次调用时请尽量避免重复，确保内容多样化；
  - 以中文形式输出
  - 最重要是要根据职位和公司名称去生成
  - 以“1.2.3. ”开头列出，每条一行，直接输出列表内容，不要额外内容，不要写公司和职位。
  resumeInfo:
  ${JSON.stringify(resumeInfo)}

  请开始输出：
  -`
  useEffect(() => {
    if (resumeInfo?.experience && Array.isArray(resumeInfo.experience)) {
      setExperience(JSON.parse(JSON.stringify(resumeInfo.experience)));
    } else {
      setExperience([]);
    }
  }, [resumeInfo]);

  const handleFieldChange = (index, field, value) => {
    const newExperience = [...experience];
    newExperience[index][field] = value;

    if (field === "currentlyWorking" && value === true) {
      newExperience[index].endDate = "";
    }
    setExperience(newExperience);
    setResumeInfo({
      ...resumeInfo,
      experience: newExperience,
    });
  };

  const addExperience = () => {
    const newExperience = [
      ...experience,
      {
        title: "",
        companyName: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        details: '',
      },
    ];
    setExperience(newExperience);
    setResumeInfo({
      ...resumeInfo,
      experience: newExperience,
    });
  };

  const removeExperience = (index) => {
    const newExperience = [...experience];
    newExperience.splice(index, 1);
    setExperience(newExperience);
    setResumeInfo({
      ...resumeInfo,
      experience: newExperience,
    });
  };

  const handleRichEditor = (text, index) => {
    const newExperience = experience.map((exp, i) => 
      i === index ? { ...exp, details: text } : exp
    );
    setExperience(newExperience);
    setResumeInfo({
      ...resumeInfo,
      experience: newExperience,
    });
  };

  const generateFromAI = async (index) => {
    if (!resumeInfo?.skills || resumeInfo.skills.length === 0) {
      toast.error(t('experienceForm.pleaseFillSkillsFirst'));
      return;
    }
    if (!experience[index].title || !experience[index].companyName || !experience[index].startDate) {
      toast.error(t('experienceForm.pleaseFillBasicInfo'));
      return;
    }
    const exp = experience[index];
    const prompt = Prompt
      .replace("{{title}}", exp.title)
      .replace("{{companyName}}", exp.companyName)
      .replace("{{startDate}}", exp.startDate)
      .replace("{{endDate}}", exp.endDate || t('experienceForm.toPresent'))
      .replace("{{skills}}", resumeInfo?.skills?.map(skill => skill.text).join(", "));
    setLoading(true);
    try {
      const res = await AIChatSession(prompt);
      handleRichEditor(res.text, index);
    } catch (error) {
      console.error('AI生成工作详情失败:', error);
      toast.error(t('experienceForm.updateFail'));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-unused-vars
    const cleanFormData = experience.map(({ id, ...rest }) => rest);
    setLoading(true);
    try {
      const payload = {
        data: {
          experience: cleanFormData,
        },
      };
      await GlobalApi.updateResumeDetail(params?.resumeId, payload, 'experience');
      toast(t('experienceForm.updateSuccess'));
    } catch (error) {
      console.error(error);
      toast.error(t('experienceForm.updateFail'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg border-t-black border-t-5">
      <h2 className="font-bold text-lg">{t('experienceForm.workExperience')}</h2>
      <p>{t('experienceForm.fillYourWorkExperience')}</p>

      <form onSubmit={handleSubmit}>
        {experience.map((exp, index) => (
          <div key={index} className="mt-3 mb-6 border p-4 rounded">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">
                {t('experienceForm.workExperienceNumber', { index: index + 1 })}
              </h3>
              <Button variant="destructive" size="sm" onClick={() => removeExperience(index)}>
                {t('common.delete')}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm">{t('experienceForm.position')}</label>
                <Input
                  value={exp.title}
                  onChange={(e) => handleFieldChange(index, "title", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm">{t('experienceForm.companyName')}</label>
                <Input
                  value={exp.companyName}
                  onChange={(e) => handleFieldChange(index, "companyName", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm">{t('experienceForm.startDate')}</label>
                <Input
                  type="date"
                  value={exp.startDate}
                  onChange={(e) => handleFieldChange(index, "startDate", e.target.value)}
                  placeholder={t('experienceForm.startDatePlaceholder')}
                  required
                />
              </div>
              <div>
                <label className="text-sm flex items-center gap-2">
                  {t('experienceForm.endDate')}
                  <Checkbox
                    checked={exp.currentlyWorking}
                    onCheckedChange={(checked) =>
                      handleFieldChange(index, "currentlyWorking", checked === true)
                    }
                  />
                  <span>{t('experienceForm.currentlyWorking')}</span>
                </label>
                <Input
                  type="date"
                  value={exp.endDate}
                  onChange={(e) => handleFieldChange(index, "endDate", e.target.value)}
                  placeholder={t('experienceForm.endDatePlaceholder')}
                  disabled={exp.currentlyWorking}
                  required={!exp.currentlyWorking}
                />
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{t('experienceForm.workDetails')}</h4>
                <Button
                  disabled={loading}
                  onClick={() => generateFromAI(index)}
                  className="flex gap-2"
                  variant="outline"
                  type="button"
                >
                  <Brain /> {t('experienceForm.aiGenerate')}
                </Button>
              </div>
              <RichTextEditor
                expValue={exp?.details}
                onRichEditorChange={(text) => handleRichEditor(text, index)}
              />
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          type="button"
          onClick={addExperience}
          className="my-4"
        >
          {t('experienceForm.addWorkExperience')}
        </Button>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : t('common.save')}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ExperienceForm;
