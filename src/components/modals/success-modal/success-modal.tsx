import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, FileText } from "lucide-react";
import type { SuccesModalProps } from "./types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function SuccessModal({ open, onOpenChange, protocol } : SuccesModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto w-12 h-8 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle size={18} className=" text-green-600"/>
          </div>  
          <DialogTitle className="text-center">
            Atendimento Criado com Sucesso!
          </DialogTitle>
          <DialogDescription className="text-center">
            O Atendimento foi cadastrado com sucesso!
          </DialogDescription>
        </DialogHeader>

        <div className="space-x-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <FileText size={15} className="text-gray-600"/>
                    <span className="text-sm font-medium text-gray-600">Número do Protocolo</span>
                </div>
                <Badge variant="outline" className="font-mono text-sm px-3 py-1">
                    {protocol}
                </Badge>
            </div>

            <p className="text-sm text-gray-600 text-center">Guarde este número para futuras consultas e acompanhamento do atendimento.</p>
        </div>
        <DialogFooter>
            <Button 
                className="bg-green-600 hover:bg-green-700 cursor-pointer"
                onClick={() => onOpenChange(false)}
            >
                Fechar
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}