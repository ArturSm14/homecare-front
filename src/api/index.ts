import { attendanceService } from './attendance';

export const api = {
  attendance: attendanceService,
};

export { attendanceService };

export { get, post, put, del } from './api-client';