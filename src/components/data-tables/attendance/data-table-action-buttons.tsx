import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import { AttedanceModal } from "@/components/modals/attendance-modal";
import type { DataTableActionButtonsProps } from "@/types/dataTableActionButtonProps";
import { ConfirmModal } from "@/components/modals/confirm-modal";


export function DataTableActionButtons({ row, onSuccess }: DataTableActionButtonsProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const attendance = row.original;

  
  
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="secondary" 
        className="h-8 flex items-center gap-2 cursor-pointer"
        onClick={() => setIsEditModalOpen(true)}
      >
        <SquarePen />
        Editar
      </Button>
      <Button 
        variant="destructive"
        onClick={() => setOpenConfirmModal(true)} 
        className="h-8 flex items-center gap-2 cursor-pointer"
      >
        <Trash2 />
        Excluir
      </Button>
      
      {isEditModalOpen && (
        <AttedanceModal 
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          editMode={true}
          attendance={attendance}
          onSuccess={onSuccess}
        />
      )}

      <ConfirmModal 
        open={openConfirmModal}
        onOpenChange={setOpenConfirmModal}
        id={attendance.id.toString()}
        onSuccess={onSuccess}
      />
    </div>
  );
}