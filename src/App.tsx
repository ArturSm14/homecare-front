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
import { SuccessModal } from "./components/modals/success-modal";
import { StatusCardGrid } from "./components/cards/status-card-grid";
import type { StatusApiResponse } from "./components/cards/status-card-grid/types";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
  const [statusData, setStatusData] = useState<StatusApiResponse | undefined>()
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [protocol, setProtocol] = useState<string | null>(null);
  const [isStatusLoading, setIsStatusLoading] = useState(true)
  
  const fetchAttendanceData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.attendance.getAll();
      setAttendanceData(response.data);
    } catch (err) {
      console.error("Erro ao buscar dados de atendimento:", err);
      setError("Não foi possível carregar os dados.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStatusData = async () => {
    try {
      setIsStatusLoading(true)
      const response = await api.attendance.getStatus();
      setStatusData(response)
    } catch (error) {
      console.error("Erro ao carregar dados de status:", error)
    } finally {
      setIsStatusLoading(false)
    }
  }
  
  useEffect(() => {
    fetchAttendanceData();
    fetchStatusData();
  }, []);

  const handleSuccess = async () => {
    await fetchAttendanceData();
    await fetchStatusData();
  };
    
  return (
      <div className="m-10 flex flex-col gap-10">
        <Header setIsModalOpen={setIsModalOpen} />

        <div className="mb-8">
          <StatusCardGrid 
            data={statusData}
            isLoading={isStatusLoading}
          />
        </div>

        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-2 mt-6">
            <div className="flex flex-col gap-2">
              <CardTitle className="flex items-center gap-2">
                <Calendar size={20} className="text-blue-600"/>
                Atendimentos Registrados
              </CardTitle>
              <CardDescription>
                Lista completa dos atendimentos
                {error && <p className="text-red-500 mt-1">{error}</p>}
              </CardDescription>
            </div>
            <Button 
              className="cursor-pointer hover:bg-gray-200" 
              variant="outline"
              onClick={handleSuccess}
              disabled={isLoading}
            >
                {isLoading ? "Carregando..." : "Atualizar"}
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={attendanceData} onSuccess={handleSuccess} isLoading={isLoading} />
          </CardContent>
        </Card>

        <AttedanceModal 
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onSuccess={handleSuccess}
          onSuccessModalOpen={(isOpen, protocol) => {
            if (protocol) {
              setProtocol(protocol);
            }
            setIsSuccessModalOpen(isOpen);
          }}
        />

        <SuccessModal 
          open={isSuccessModalOpen}
          onOpenChange={setIsSuccessModalOpen}
          protocol={protocol}
        />
      </div>
  )
}