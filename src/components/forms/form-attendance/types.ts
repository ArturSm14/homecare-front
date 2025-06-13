import type { z } from "zod";
import type { attendanceFormSchema } from "./schema";

export type AttendanceFormSchema = z.infer<typeof attendanceFormSchema>;

export interface FormAttendanceProps {
    onOpenChange: (isModalOpen: boolean) => void
    editMode?: boolean
}