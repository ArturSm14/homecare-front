import { FileSpreadsheet, Plus } from "lucide-react";
import { Button } from "../ui/button";

interface HeaderProps {
  setIsModalOpen: (isModalOpen: boolean) => void
}

export function Header({ setIsModalOpen } : HeaderProps ) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileSpreadsheet size={20} className="text-white"/>
          </div>
          <h1 className="text-3xl font-bold">HomeCare</h1>
        </div>
        <span className="text-gray-500">Gerencie seus atendimentos domiciliares</span>
      </div>
      
      <Button 
        className="bg-blue-600 hover:bg-blue-400 flex items-center gap-4 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus />
        <span>Novo Atendimento</span>
      </Button>
    </div>
  )
}