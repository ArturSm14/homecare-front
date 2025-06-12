import { Badge } from "@/components/ui/badge"
import type { Attendance } from "@/types/attendance"
import type { ColumnDef } from "@tanstack/react-table"
import { Calendar, MapPin, SquarePen, Trash2 } from "lucide-react"
import { callTypes, statusLabels } from "./data/data"
import type { AttendanceStatus } from "@/types/attendanceStatus"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

export const columns: ColumnDef<Attendance>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
  },
  {
    accessorKey: "address",
    header: "Endereço",
    cell: ({ row }) => {
        return (
            <div className="flex items-start gap-2 max-w-xs">
                <MapPin size={15} className="text-gray-500 mt-0.5"/>
                <span className="truncate">{row.getValue("address")}</span>
            </div>
        )
    }
  },
  {
    accessorKey: "number_protocol",
    header: "Protocolo",
    cell : ({ row }) => {
        return (
            <Badge variant="outline" className="font-mono text-xs hover:bg-blue-300">
                {row.getValue("number_protocol")}
            </Badge>
        )
    }
  },
  {
    accessorKey: "symptoms",
    header: "Sintomas",
    cell: ({ row }) => {
        return (
            <div className="flex items-start gap-2 max-w-xs">
                <span className="truncate">{row.getValue("symptoms")}</span>
            </div>
        )
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;
      const badgeColor = callTypes.get(status as AttendanceStatus);
      const statusLabel = statusLabels.get(status as AttendanceStatus);
        return (
          <div className="flex space-x-2">
            <Badge variant="outline" className={cn("capitalize", badgeColor)}>
                {statusLabel}
            </Badge>
          </div>
        )
    }
  },
  {
    accessorKey: "created_at",
    header: "Data/Hora",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"))
      const formatted = new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date)


      return (
        <div className="flex items-center gap-2">
            <Calendar size={15} className="text-gray-500"/>
            <span>{formatted}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="h-8 flex items-center gap-2 cursor-pointer">
            <SquarePen />
            Editar
          </Button>
          <Button variant="destructive" className="h-8 flex items-center gap-2 cursor-pointer">
            <Trash2 />
            Excluir
          </Button>
        </div>
      )
    }
  }
]