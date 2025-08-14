import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_KEY;

export const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${API_KEY}`,
  },
});

// 创建新简历
const createNewResume = (data) => axiosClient.post('/user-resumes', data);

// 获取用户简历列表
const getUserResumes = (userEmail) =>
  axiosClient.get(`/user-resumes?filters[userEmail][$eq]=${userEmail}`);

// 更新简历
const updateResumeDetail = (id, data) =>
  axiosClient.put(`/user-resumes/${id}`, data);

// 删除简历
const deleteResumeById = (id) => axiosClient.delete(`/user-resumes/${id}`);

const getResumeById = (id) =>
  axiosClient.get(`/user-resumes/${id}`, {
    params: {
      populate: ['experience', 'education', 'projectExperience', 'skills', 'modules', 'options'],
    },
  });



export default {
  createNewResume,
  getUserResumes,
  updateResumeDetail,
  getResumeById,
  deleteResumeById,
};
