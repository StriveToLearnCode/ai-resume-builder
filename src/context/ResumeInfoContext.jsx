import { createContext, useEffect, useState } from "react"
import GlobalApi from "../../service/GlobalApi.js"
// eslint-disable-next-line react-refresh/only-export-components
export const  ResumeInfoContext = createContext()

export const ResumeInfoContextProvider = ({children,id}) => {
  const [resumeInfo,setResumeInfo] = useState()
  const fetchResume = async (id) => {
    if(!id) return
    try {
      const res = await GlobalApi.getResumeById(id)
      setResumeInfo(res.data.data)
    } catch (error) {
      console.error('获取简历信息失败:', error)
    }
  }
  useEffect(() => {
    fetchResume(id)
  },[id])
  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
      {children}
    </ResumeInfoContext.Provider>
  )
}