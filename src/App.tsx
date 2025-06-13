import { Calendar } from "lucide-react";
import { DataTable } from "./components/data-tables/attendance";
import { columns } from "./components/data-tables/attendance/columns";
import { Header } from "./components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import type { Attendance } from "./types/attendance";
import { Button } from "./components/ui/button";
import { AttedanceModal } from "./components/modals/attendance-modal";
import { useState, useEffect } from "react";
import { api } from "./api";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchAttendanceData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.attendance.getAll();
      console.log("Attendances", response);
      setAttendanceData(response.data);
    } catch (err) {
      console.error("Erro ao buscar dados de atendimento:", err);
      setError("Não foi possível carregar os dados.");
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAttendanceData();
  }, []);
    
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
                {error && <p className="text-red-500 mt-1">{error}</p>}
              </CardDescription>
            </div>
            <Button 
              className="cursor-pointer hover:bg-gray-200" 
              variant="outline"
              onClick={fetchAttendanceData}
              disabled={isLoading}
            >
                {isLoading ? "Carregando..." : "Atualizar"}
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={attendanceData} onSuccess={fetchAttendanceData} />
          </CardContent>
        </Card>

        <AttedanceModal 
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onSuccess={fetchAttendanceData}
        />
      </div>
  )
}