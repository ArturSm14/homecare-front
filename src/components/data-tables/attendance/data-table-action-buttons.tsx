import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import { AttedanceModal } from "@/components/modals/attendance-modal";
import type { Attendance } from "@/types/attendance";

interface DataTableActionButtonsProps {
  row: {
    original: Attendance;
  };
}

export function DataTableActionButtons({ row }: DataTableActionButtonsProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
        />
      )}
    </div>
  );
}