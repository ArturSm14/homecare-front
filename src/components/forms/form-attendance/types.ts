import type { z } from "zod";
import type { attendanceFormSchema } from "./schema";
import type { Attendance } from "@/types/attendance";

export type AttendanceFormSchema = z.infer<typeof attendanceFormSchema>;

export interface FormAttendanceProps {
    onOpenChange: (isModalOpen: boolean) => void
    editMode?: boolean
    attendance?: Attendance
    onSuccess?: () => Promise<void>
}