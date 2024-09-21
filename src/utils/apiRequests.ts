import axios from 'axios';

const API_BASE_URL = "https://inqool-interview-api.vercel.app/api"
// endpoint string examples: "users", "users/:id" (does NOT start with a slash)

export const fetchObjects = async <T>(endpoint: string): Promise<T[]> => {
  const { data } = await axios.get<T[]>(`${API_BASE_URL}/${endpoint}`);
  return data;
};

export const deleteObjectWithId = async <T>(endpoint: string, id: string): Promise<T[]> => {
  const response = await axios.delete<T[]>(`${API_BASE_URL}/${endpoint}/${id}`);
  return response.data;
};

export const addObject = async <T>(endpoint: string, newObject: T): Promise<T> => {
  const { data } = await axios.post<T>(`${API_BASE_URL}/${endpoint}`, newObject);
  return data;
};

export const patchObject = async <T>(
  endpoint: string, 
  id: string, 
  updatedAttributes: Partial<T>
): Promise<T> => {
  const { data } = await axios.patch<T>(`${API_BASE_URL}/${endpoint}/${id}`, updatedAttributes);
  return data;
};