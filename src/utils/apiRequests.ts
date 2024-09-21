import axios from 'axios';

const API_BASE_URL = "https://inqool-interview-api.vercel.app/api"
// endpoint string examples: "users", "users/:id" (does NOT start with a slash)

export const fetchObjects = async <T>(endpoint: string): Promise<T[]> => {
  const { data } = await axios.get<T[]>(`${API_BASE_URL}/${endpoint}`);
  return data;
};