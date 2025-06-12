import type { AttendanceStatus } from '@/types/attendanceStatus'

export const callTypes = new Map<AttendanceStatus, string>([
  ['pending', 'bg-neutral-300/40 border-neutral-300'],
  ['in_progress', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['completed', 'bg-neutral-300/40 border-neutral-300'],
  ['cancelled', 'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10'],
])

export const statusLabels = new Map<AttendanceStatus, string>([
  ['pending', 'Pendente'],
  ['in_progress', 'Em andamento'],
  ['completed', 'Concluído'],
  ['cancelled', 'Cancelado'],
])