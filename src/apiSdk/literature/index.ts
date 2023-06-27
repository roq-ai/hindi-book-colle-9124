import axios from 'axios';
import queryString from 'query-string';
import { LiteratureInterface, LiteratureGetQueryInterface } from 'interfaces/literature';
import { GetQueryInterface } from '../../interfaces';

export const getLiterature = async (query?: LiteratureGetQueryInterface) => {
  const response = await axios.get(`/api/literature${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createLiterature = async (literature: LiteratureInterface) => {
  const response = await axios.post('/api/literature', literature);
  return response.data;
};

export const updateLiteratureById = async (id: string, literature: LiteratureInterface) => {
  const response = await axios.put(`/api/literature/${id}`, literature);
  return response.data;
};

export const getLiteratureById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/literature/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteLiteratureById = async (id: string) => {
  const response = await axios.delete(`/api/literature/${id}`);
  return response.data;
};
