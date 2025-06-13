import { Calendar } from "lucide-react";
import { DataTable } from "./components/data-tables/attendance";
import { columns } from "./components/data-tables/attendance/columns";
import { Header } from "./components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import type { Attendance } from "./types/attendance";
import { Button } from "./components/ui/button";
import { AttedanceModal } from "./components/modals/attendance-modal";
import { useState } from "react";

export const attendanceData: Attendance[] = [
  {
    id: 1,
    name: "João Vitor",
    phone: "(11) 98765-4321",
    address: "Rua das Flores, 123 - São Paulo/SP",
    number_protocol: "PROT-20250612-KKCB2b51",
    symptoms: "Febre, Tosse, Dificuldade para respirar",
    status: "pending",
    created_at: "2025-06-12T17:12:58.000000Z",
    updated_at: "2025-06-12T17:12:58.000000Z"
  },
  {
    id: 2,
    name: "Maria Silva",
    phone: "(21) 97654-3210",
    address: "Avenida Central, 456 - Rio de Janeiro/RJ",
    number_protocol: "PROT-20250611-AABB1c23",
    symptoms: "Cansaço, Dificuldade para se mover, Falta de ar",
    status: "in_progress",
    created_at: "2025-06-11T14:30:22.000000Z",
    updated_at: "2025-06-11T14:30:22.000000Z"
  },
  {
    id: 3,
    name: "Pedro Santos",
    phone: "(31) 96543-2109",
    address: "Praça Principal, 789 - Belo Horizonte/MG",
    number_protocol: "PROT-20250610-XXYZ9d87",
    symptoms: "Dor de cabeça, Tontura, Falta de ar",
    status: "cancelled",
    created_at: "2025-06-10T09:45:15.000000Z",
    updated_at: "2025-06-10T09:45:15.000000Z"
  },
];

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
      <div className="m-10 flex flex-col gap-10">
        <Header setIsModalOpen={setIsModalOpen} />

        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="flex justify-between gap-2">
            <div className="flex flex-col gap-2">
              <CardTitle className="flex items-center gap-2">
                <Calendar size={20} className="text-blue-600"/>
                Atentimentos Registrados
              </CardTitle>
              <CardDescription>
                Lista completa dos atendimentos
              </CardDescription>
            </div>
            <Button 
              className="cursor-pointer hover:bg-gray-200" 
              variant="outline"
              
            >
                Atualizar
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={attendanceData} />
          </CardContent>
        </Card>

        <AttedanceModal 
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      </div>
  )
}