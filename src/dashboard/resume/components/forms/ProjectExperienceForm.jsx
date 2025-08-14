import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useState, useEffect } from 'react'
import GlobalApi from '../../../../../service/GlobalApi.js'
import { useParams } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import RichTextEditor from '../RichTextEditor.jsx'

function ProjectExperienceForm() {
  const params = useParams()
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (resumeInfo?.projectExperience && Array.isArray(resumeInfo.projectExperience)) {
      setProjects(JSON.parse(JSON.stringify(resumeInfo.projectExperience)))
    } else {
      setProjects([])
    }
  }, [resumeInfo])

  const handleFieldChange = (index, field, value) => {
    const newProjects = [...projects]
    newProjects[index][field] = value
    setProjects(newProjects)
    setResumeInfo({
      ...resumeInfo,
      projectExperience: newProjects
    })
  }

  const handleRichEditor = (html, index) => {
    const newProjects = [...projects];
    newProjects[index].details = html;  
    setProjects(newProjects);
    setResumeInfo({
      ...resumeInfo,
      projectExperience: newProjects,
    });
  };
  const addProject = () => {
    const newProjects = [
      ...projects,
      {
        title: '',
        link: '',
        details:''
      }
    ]
    setProjects(newProjects)
    setResumeInfo({
      ...resumeInfo,
      projectExperience: newProjects
    })
  }

  const removeProject = (index) => {
    const newProjects = [...projects]
    newProjects.splice(index, 1)
    setProjects(newProjects)
    setResumeInfo({
      ...resumeInfo,
      projectExperience: newProjects
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // eslint-disable-next-line no-unused-vars
    const cleanFormData = projects.map(({ id, ...rest }) => rest);
    setLoading(true)
    try {
      const payload = {
      data: {
          projectExperience:cleanFormData,
        }
      }
      await GlobalApi.updateResumeDetail(params?.resumeId, payload)
      toast('项目经验更新成功')
    } catch (error) {
      console.error(error)
      toast.error('更新失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-5 shadow-lg border-t-black border-t-5">
      <h2 className="font-bold text-lg">项目经验</h2>
      <p>填写你的项目经验</p>

      <form onSubmit={handleSubmit}>
        {projects.map((proj, index) => (
          <div key={index} className="mb-6 border p-4 rounded">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">项目 #{index + 1}</h3>
              <Button variant="destructive" size="sm" onClick={() => removeProject(index)}>删除</Button>
            </div>

            <div className="mb-3">
              <label className="text-sm">项目名称</label>
              <Input
                value={proj.title}
                onChange={(e) => handleFieldChange(index, 'title', e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="text-sm">项目链接 (可选)</label>
              <Input
                value={proj.link || ''}
                onChange={(e) => handleFieldChange(index, 'link', e.target.value)}
                placeholder="https://example.com"
              />
            </div>

            <RichTextEditor  expValue={proj?.details}
                onRichEditorChange={(text) => handleRichEditor(text, index)} />
          </div>
        ))}

        <Button variant="outline" type="button" onClick={addProject} className="my-4">
          添加项目
        </Button>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : '保存'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProjectExperienceForm
