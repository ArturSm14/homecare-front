import type { Attendance } from "@/types/attendance";

export interface DataTableActionButtonsProps {
    row: {
      original: Attendance;
    };
    onSuccess?: () => Promise<void>;
  }