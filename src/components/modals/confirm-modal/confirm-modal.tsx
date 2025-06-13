import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ConfirmModalProps } from "./types";
import { Button } from "@/components/ui/button";
import { api } from "@/api";
import { toast } from "sonner";
import { AlertTriangle, LoaderCircle, Trash2 } from "lucide-react";

export function ConfirmModal({
  open,
  onOpenChange,
  id,
  onSuccess,
}: ConfirmModalProps) {
    const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await api.attendance.delete(id);
      if (!res.status) {
        toast.error("Erro ao excluir atendimento. Tente novamente.");
        return;
      }
      toast.success("Atendimento excluído com sucesso!");
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
     }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md sm:max-h-96">
        <DialogHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle size={16} className=" text-red-600" />
          </div>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Excluir Atendimento
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-base leading-relaxed">
            Tem certeza que deseja excluir este atendimento?
            <br />
            <span>Esta ação não poderá ser desfeita</span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-3">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            className=" bg-red-600 hover:bg-red-700 focus:ring-red-500 cursor-pointer"
            onClick={handleDelete}
            disabled={loading}
          >
            { loading ? (
                <>
                    <LoaderCircle className="animate-spin"/>
                    <span className="ml-2">Excluindo...</span>
                </>
            ) : 
                <>
                    <Trash2 className="mr-2"/>
                    <span>Excluir</span>
                </>
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
