import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "lucide-react";
import type { AttendanceModalProps } from "./type";
import { FormAttendance } from "@/components/forms/form-attendance";

export function AttedanceModal({
  open,
  onOpenChange,
  editMode,
}: AttendanceModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            Novo Atendimento
          </DialogTitle>
          <DialogDescription>Cadastre um novo atendimento</DialogDescription>
        </DialogHeader>

        <FormAttendance onOpenChange={onOpenChange} editMode={editMode}/>
      </DialogContent>
    </Dialog>
  );
}
