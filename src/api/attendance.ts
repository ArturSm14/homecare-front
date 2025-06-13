import type { Attendance } from '../types/attendance';
import type { AttendanceFormSchema } from '../components/forms/form-attendance/types';
import type { ApiResponse } from '../types/apiResponse';
import type { SingleApiResponse } from '../types/singleApiResponse';
import { get, post, put, del } from './api-client';
import type { StatusApiResponse } from '@/components/cards/status-card-grid/types';

const ENDPOINT = 'attendances';

export const attendanceService = {
  getAll: async (): Promise<ApiResponse<Attendance>> => {
    const url = ENDPOINT;
    const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`);
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    
    return response.json();
  },

  /**
   * @param id
   */
  getById: async (id: string): Promise<Attendance> => {
    return get<Attendance>(`${ENDPOINT}/${id}`);
  },

  /**
   * @param attendance
   */
  create: async (attendance: AttendanceFormSchema): Promise<SingleApiResponse<Attendance>> => {
    return post<SingleApiResponse<Attendance>, AttendanceFormSchema>(ENDPOINT, attendance);
  },

  /**
   * @param id 
   * @param attendance
   */
  update: async (id: string, attendance: AttendanceFormSchema): Promise<Attendance> => {
    return put<Attendance, AttendanceFormSchema>(`${ENDPOINT}/${id}`, attendance);
  },

  /**
   * @param id 
   */
  delete: async (id: string): Promise<{ status: boolean; response: null; message: string }> => {
    return del<{ status: boolean; response: null; message: string }>(`${ENDPOINT}/${id}`);
  },

  getStatus: async () : Promise<StatusApiResponse> => {
    const url = ENDPOINT;

    const response = await fetch(`${import.meta.env.VITE_API_URL}${url}/count-by-status`);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    return response.json();
  }
};