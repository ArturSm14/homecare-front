import type { Attendance } from "@/types/attendance";

export type AttendanceModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editMode?: boolean;
  attendance?: Attendance;
  onSuccess?: () => Promise<void>;
  onSuccessModalOpen?: (isOpen: boolean, protocol?: string) => void;
}