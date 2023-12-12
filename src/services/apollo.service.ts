import { HttpClient } from './client';

export const getApollos = (params: any) =>
  HttpClient.get(`apollos`, { params });
