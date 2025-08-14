import axios from "axios"

const API_KEY = import.meta.env.VITE_STRAPI_KEY

export const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
  headers: {
    "Content-Type": 'application/json',
    "Authorization": `Bearer ${API_KEY}`
  }
})

const createNewResume = (data) => axiosClient.post('/user-resumes', data)

const getUserResumes = (userEmail) =>
  axiosClient.get(`/user-resumes?filters[userEmail][$eq]=${userEmail}`)


const updateResumeDetail = (id, data, populate) => {
  if (populate) {
    return axiosClient.put(`/user-resumes/${id}?populate=${populate}`, data)
  } else {
    return axiosClient.put(`/user-resumes/${id}`, data)
  }
}

const getResumeById = (id) => axiosClient.get('/user-resumes/' + id, {
  params: {
    populate: {
      experience: true,
      education: {
        populate: 'awards'
      },
      projectExperience: true,
      skills: true,
      modules: true,
      options: true
    },
  }
})

const deleteResumeById = (id) => axiosClient.delete(`/user-resumes/${id}`)

export default {
  createNewResume,
  getUserResumes,
  updateResumeDetail,
  getResumeById,
  deleteResumeById
}