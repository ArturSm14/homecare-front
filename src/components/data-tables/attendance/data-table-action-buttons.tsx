import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import { AttedanceModal } from "@/components/modals/attendance-modal";
import type { DataTableActionButtonsProps } from "@/types/dataTableActionButtonProps";
import { api } from "@/api";
import { toast } from "sonner";


export function DataTableActionButtons({ row, onSuccess }: DataTableActionButtonsProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const attendance = row.original;

  const handleDelete = async () => {
    try {
      const res = await api.attendance.delete(attendance.id.toString());
      console.log(res);
      if(!res.status) {
        toast.error("Erro ao excluir atendimento. Tente novamente.");
        return;
      }
      toast.success("Atendimento excluído com sucesso!");
      onSuccess?.();
    } catch (error) {
      console.error(error);
    }
  }
  
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
        onClick={handleDelete} 
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
    </div>
  );
}