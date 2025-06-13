import type { Attendance } from '../types/attendance';
import type { AttendanceFormSchema } from '../components/forms/form-attendance/types';
import type { ApiResponse } from '../types/apiResponse';
import { get, post, put, del } from './api-client';

const ENDPOINT = 'attendances';

export const attendanceService = {
  /**
   * Busca todos os atendimentos
   */
  getAll: async (): Promise<ApiResponse<Attendance>> => {
    const url = ENDPOINT;
    const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`);
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    
    return response.json();
  },

  /**
   * Busca um atendimento pelo ID
   * @param id - ID do atendimento
   */
  getById: async (id: string): Promise<Attendance> => {
    return get<Attendance>(`${ENDPOINT}/${id}`);
  },

  /**
   * Cria um novo atendimento
   * @param attendance - Dados do atendimento
   */
  create: async (attendance: AttendanceFormSchema): Promise<Attendance> => {
    return post<Attendance, AttendanceFormSchema>(ENDPOINT, attendance);
  },

  /**
   * Atualiza um atendimento existente
   * @param id - ID do atendimento
   * @param attendance - Dados atualizados do atendimento
   */
  update: async (id: string, attendance: AttendanceFormSchema): Promise<Attendance> => {
    return put<Attendance, AttendanceFormSchema>(`${ENDPOINT}/${id}`, attendance);
  },

  /**
   * Remove um atendimento
   * @param id - ID do atendimento
   */
  delete: async (id: string): Promise<{ status: boolean; response: null; message: string }> => {
    return del<{ status: boolean; response: null; message: string }>(`${ENDPOINT}/${id}`);
  }
};