import axios from 'axios'

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || ''
const baseURL = rawBaseUrl.replace(/\/+$/, '')

const api = axios.create({
  baseURL,
})

export default api
